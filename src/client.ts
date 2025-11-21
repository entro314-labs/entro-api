import type { ApiResponse } from './types';

export interface ClientConfig {
  /** API endpoint URL (e.g., 'https://analytics.example.com/api') */
  endpoint?: string;
  /** API key for cloud authentication */
  apiKey?: string;
  /** User ID for self-hosted authentication */
  userId?: string;
  /** Secret for self-hosted authentication (matches APP_SECRET) */
  secret?: string;
  /** Custom fetch implementation */
  fetch?: typeof fetch;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
}

/**
 * Core API client for making authenticated requests.
 */
export class ApiClient {
  private endpoint: string;
  private apiKey?: string;
  private userId?: string;
  private secret?: string;
  private fetchFn: typeof fetch;

  constructor(config: ClientConfig = {}) {
    this.endpoint = config.endpoint || process.env.ENTROLYTICS_API_ENDPOINT || '';
    this.apiKey = config.apiKey || process.env.ENTROLYTICS_API_KEY;
    this.userId = config.userId || process.env.ENTROLYTICS_USER_ID;
    this.secret = config.secret || process.env.ENTROLYTICS_SECRET;
    this.fetchFn = config.fetch || globalThis.fetch;

    if (!this.endpoint) {
      throw new Error(
        'Entrolytics API endpoint is required. Set ENTROLYTICS_API_ENDPOINT or pass endpoint in config.'
      );
    }
  }

  /**
   * Generate authentication headers.
   */
  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};

    if (this.apiKey) {
      // Cloud authentication
      headers['x-entrolytics-api-key'] = this.apiKey;
    } else if (this.userId && this.secret) {
      // Self-hosted authentication using share token format
      headers['x-entrolytics-share-token'] = this.createShareToken();
    }

    return headers;
  }

  /**
   * Create a share token for self-hosted authentication.
   */
  private createShareToken(): string {
    if (!this.userId || !this.secret) {
      throw new Error('userId and secret are required for self-hosted authentication');
    }

    // Create a simple token (in production, this would be a proper JWT)
    const payload = {
      userId: this.userId,
      timestamp: Date.now(),
    };

    return Buffer.from(JSON.stringify(payload)).toString('base64');
  }

  /**
   * Build URL with query parameters.
   */
  private buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(path, this.endpoint);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Make an authenticated API request.
   */
  async request<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', body, params, headers = {} } = options;

    const url = this.buildUrl(path, params);

    try {
      const fetchOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
          ...headers,
        },
      };

      if (body) {
        fetchOptions.body = JSON.stringify(body);
      }

      const response = await this.fetchFn(url, fetchOptions);

      const data = await response.json().catch(() => ({})) as Record<string, unknown>;

      if (!response.ok) {
        const errorMessage = typeof data.error === 'string' ? data.error
          : typeof data.message === 'string' ? data.message
          : `HTTP ${response.status}`;
        return {
          ok: false,
          status: response.status,
          error: errorMessage,
        };
      }

      return {
        ok: true,
        status: response.status,
        data: data as T,
      };
    } catch (error) {
      return {
        ok: false,
        status: 0,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  /**
   * GET request helper.
   */
  get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'GET', params });
  }

  /**
   * POST request helper.
   */
  post<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'POST', body });
  }

  /**
   * PUT request helper.
   */
  put<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'PUT', body });
  }

  /**
   * DELETE request helper.
   */
  delete<T>(path: string): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'DELETE' });
  }

  /**
   * PATCH request helper.
   */
  patch<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'PATCH', body });
  }
}
