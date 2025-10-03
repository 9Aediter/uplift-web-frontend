// Error types for API error handling

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
