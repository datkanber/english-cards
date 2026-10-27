import { env } from '@/config/env';

import { ApiError } from './api-error';
import type { ApiClientOptions, ApiRequestOptions, HttpMethod, QueryParameters } from './types';

const DEFAULT_TIMEOUT_MS = 15_000;

const appendQueryParameters = (url: URL, query?: QueryParameters): void => {
  if (!query) {
    return;
  }

  Object.entries(query).forEach(([key, rawValue]) => {
    const values = Array.isArray(rawValue) ? rawValue : [rawValue];

    values.forEach((value) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  });
};

const normalizeBaseUrl = (baseUrl?: string): string | undefined => {
  if (!baseUrl) {
    return undefined;
  }

  let url: URL;

  try {
    url = new URL(baseUrl);
  } catch {
    throw ApiError.notConfigured();
  }

  if ((url.protocol !== 'http:' && url.protocol !== 'https:') || url.username || url.password) {
    throw ApiError.notConfigured();
  }

  if (!__DEV__ && url.protocol !== 'https:') {
    throw ApiError.insecureBaseUrl();
  }

  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get('content-type') ?? '';

  try {
    if (contentType.includes('application/json')) {
      return await response.json();
    }

    return await response.text();
  } catch {
    throw ApiError.invalidResponse();
  }
};

export class ApiClient {
  private readonly baseUrl?: string;
  private readonly defaultHeaders?: HeadersInit;
  private readonly fetchImplementation: typeof fetch;
  private readonly timeoutMs: number;

  constructor({
    baseUrl,
    defaultHeaders,
    fetchImplementation = fetch,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  }: ApiClientOptions = {}) {
    this.baseUrl = normalizeBaseUrl(baseUrl);
    this.defaultHeaders = defaultHeaders;
    this.fetchImplementation = fetchImplementation;
    this.timeoutMs = timeoutMs;
  }

  get<TResponse>(path: string, options?: ApiRequestOptions): Promise<TResponse> {
    return this.request<TResponse>('GET', path, options);
  }

  post<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
    options?: ApiRequestOptions<TBody>,
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>('POST', path, { ...options, body });
  }

  put<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
    options?: ApiRequestOptions<TBody>,
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>('PUT', path, { ...options, body });
  }

  patch<TResponse, TBody = unknown>(
    path: string,
    body: TBody,
    options?: ApiRequestOptions<TBody>,
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>('PATCH', path, { ...options, body });
  }

  delete<TResponse>(path: string, options?: ApiRequestOptions): Promise<TResponse> {
    return this.request<TResponse>('DELETE', path, options);
  }

  async request<TResponse, TBody = never>(
    method: HttpMethod,
    path: string,
    options?: ApiRequestOptions<TBody>,
  ): Promise<TResponse> {
    if (!this.baseUrl) {
      throw ApiError.notConfigured();
    }

    if (/^[a-z][a-z\d+.-]*:/iu.test(path) || path.startsWith('//')) {
      throw ApiError.invalidRequestPath();
    }

    const url = new URL(path.replace(/^\//u, ''), this.baseUrl);
    if (url.origin !== new URL(this.baseUrl).origin) {
      throw ApiError.invalidRequestPath();
    }
    appendQueryParameters(url, options?.query);

    const headers = new Headers(this.defaultHeaders);
    new Headers(options?.headers).forEach((value, key) => headers.set(key, value));
    if (!headers.has('Accept')) {
      headers.set('Accept', 'application/json');
    }

    const hasBody = options?.body !== undefined;
    if (hasBody && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const controller = new AbortController();
    let timedOut = false;
    const abortFromCaller = (): void => controller.abort();
    options?.signal?.addEventListener('abort', abortFromCaller);
    if (options?.signal?.aborted) {
      controller.abort();
    }
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, this.timeoutMs);

    try {
      const { body: _body, query: _query, ...requestOptions } = options ?? {};
      const response = await this.fetchImplementation(url.toString(), {
        ...requestOptions,
        body: hasBody ? JSON.stringify(options.body) : undefined,
        headers,
        method,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw ApiError.fromResponse(response);
      }

      return (await parseResponseBody(response)) as TResponse;
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.fromRequestFailure(timedOut, options?.signal?.aborted ?? false);
    } finally {
      clearTimeout(timeout);
      options?.signal?.removeEventListener('abort', abortFromCaller);
    }
  }
}

export const createApiClient = (options?: ApiClientOptions): ApiClient => new ApiClient(options);

export const apiClient = createApiClient({ baseUrl: env.apiBaseUrl });
