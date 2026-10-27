export type ApiErrorCode =
  | 'API_NOT_CONFIGURED'
  | 'HTTP_ERROR'
  | 'INSECURE_BASE_URL'
  | 'INVALID_REQUEST_PATH'
  | 'INVALID_RESPONSE'
  | 'NETWORK_ERROR'
  | 'REQUEST_ABORTED'
  | 'REQUEST_TIMEOUT';

interface ApiErrorOptions {
  code: ApiErrorCode;
  message: string;
  status?: number;
}

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status?: number;

  constructor({ code, message, status }: ApiErrorOptions) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  get isRetryable(): boolean {
    return (
      this.code === 'NETWORK_ERROR' ||
      this.code === 'REQUEST_TIMEOUT' ||
      (this.status !== undefined && this.status >= 500)
    );
  }

  static fromResponse(response: Response): ApiError {
    return new ApiError({
      code: 'HTTP_ERROR',
      message: 'The server could not complete the request.',
      status: response.status,
    });
  }

  static invalidResponse(): ApiError {
    return new ApiError({
      code: 'INVALID_RESPONSE',
      message: 'The server returned an unexpected response.',
    });
  }

  static notConfigured(): ApiError {
    return new ApiError({
      code: 'API_NOT_CONFIGURED',
      message: 'The API base URL has not been configured.',
    });
  }

  static insecureBaseUrl(): ApiError {
    return new ApiError({
      code: 'INSECURE_BASE_URL',
      message: 'Production API requests must use HTTPS.',
    });
  }

  static invalidRequestPath(): ApiError {
    return new ApiError({
      code: 'INVALID_REQUEST_PATH',
      message: 'API request paths must be relative to the configured base URL.',
    });
  }

  static fromRequestFailure(timedOut: boolean, aborted: boolean): ApiError {
    if (timedOut) {
      return new ApiError({
        code: 'REQUEST_TIMEOUT',
        message: 'The request took too long to complete.',
      });
    }

    if (aborted) {
      return new ApiError({
        code: 'REQUEST_ABORTED',
        message: 'The request was cancelled.',
      });
    }

    return new ApiError({
      code: 'NETWORK_ERROR',
      message: 'The request could not reach the server.',
    });
  }
}
