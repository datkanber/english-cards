export type HttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export type QueryParameter = string | number | boolean | null | undefined;

export type QueryParameters = Record<string, QueryParameter | readonly QueryParameter[]>;

export interface ApiRequestOptions<TBody = never> extends Omit<RequestInit, 'body' | 'method'> {
  body?: TBody;
  query?: QueryParameters;
}

export interface ApiClientOptions {
  baseUrl?: string;
  defaultHeaders?: HeadersInit;
  fetchImplementation?: typeof fetch;
  timeoutMs?: number;
}
