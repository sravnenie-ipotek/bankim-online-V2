import type { ApiSuccessResponse } from './api-success-response.interface.js';
import type { ApiErrorResponse } from './api-error-response.interface.js';

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export type { ApiSuccessResponse, ApiErrorResponse };
