import type { ApiClient } from '../client';
import type {
  ActiveVisitor,
  ApiResponse,
  CreateWebsiteData,
  DateRangeParams,
  MetricData,
  RealtimeData,
  UpdateWebsiteData,
  Website,
  WebsiteEvent,
  WebsiteMetricsParams,
  WebsitePageviews,
  WebsiteStats,
} from '../types';

export function createWebsitesEndpoints(client: ApiClient) {
  return {
    /**
     * Get all websites.
     */
    getWebsites(): Promise<ApiResponse<Website[]>> {
      return client.get<Website[]>('/websites');
    },

    /**
     * Create a new website.
     */
    createWebsite(data: CreateWebsiteData): Promise<ApiResponse<Website>> {
      return client.post<Website>('/websites', data);
    },

    /**
     * Get a website by ID.
     */
    getWebsite(websiteId: string): Promise<ApiResponse<Website>> {
      return client.get<Website>(`/websites/${websiteId}`);
    },

    /**
     * Update a website.
     */
    updateWebsite(websiteId: string, data: UpdateWebsiteData): Promise<ApiResponse<Website>> {
      return client.post<Website>(`/websites/${websiteId}`, data);
    },

    /**
     * Delete a website.
     */
    deleteWebsite(websiteId: string): Promise<ApiResponse<void>> {
      return client.delete<void>(`/websites/${websiteId}`);
    },

    /**
     * Reset a website's data.
     */
    resetWebsite(websiteId: string): Promise<ApiResponse<void>> {
      return client.post<void>(`/websites/${websiteId}/reset`);
    },

    /**
     * Transfer website ownership.
     */
    transferWebsite(
      websiteId: string,
      data: { userId?: string; orgId?: string },
    ): Promise<ApiResponse<Website>> {
      return client.post<Website>(`/websites/${websiteId}/transfer`, data);
    },

    /**
     * Get website statistics.
     */
    getWebsiteStats(
      websiteId: string,
      params: DateRangeParams,
    ): Promise<ApiResponse<WebsiteStats>> {
      return client.get<WebsiteStats>(`/websites/${websiteId}/stats`, params);
    },

    /**
     * Get website pageviews data.
     */
    getWebsitePageviews(
      websiteId: string,
      params: DateRangeParams & { unit?: string; timezone?: string },
    ): Promise<ApiResponse<WebsitePageviews>> {
      return client.get<WebsitePageviews>(`/websites/${websiteId}/pageviews`, params);
    },

    /**
     * Get website metrics (URLs, referrers, browsers, etc.).
     */
    getWebsiteMetrics(
      websiteId: string,
      params: WebsiteMetricsParams,
    ): Promise<ApiResponse<MetricData[]>> {
      return client.get<MetricData[]>(`/websites/${websiteId}/metrics`, params);
    },

    /**
     * Get expanded metrics (with additional details).
     */
    getWebsiteExpandedMetrics(
      websiteId: string,
      params: WebsiteMetricsParams,
    ): Promise<ApiResponse<MetricData[]>> {
      return client.get<MetricData[]>(`/websites/${websiteId}/metrics/expanded`, params);
    },

    /**
     * Get website events.
     */
    getWebsiteEvents(
      websiteId: string,
      params: DateRangeParams & { query?: string; limit?: number; offset?: number },
    ): Promise<ApiResponse<WebsiteEvent[]>> {
      return client.get<WebsiteEvent[]>(`/websites/${websiteId}/events`, params);
    },

    /**
     * Get events time series.
     */
    getWebsiteEventsSeries(
      websiteId: string,
      params: DateRangeParams & { unit?: string; timezone?: string; event?: string },
    ): Promise<ApiResponse<{ x: string; y: number }[]>> {
      return client.get(`/websites/${websiteId}/events/series`, params);
    },

    /**
     * Get active visitors count.
     */
    getWebsiteActive(websiteId: string): Promise<ApiResponse<ActiveVisitor[]>> {
      return client.get<ActiveVisitor[]>(`/websites/${websiteId}/active`);
    },

    /**
     * Get website date range (first and last event dates).
     */
    getWebsiteDateRange(
      websiteId: string,
    ): Promise<ApiResponse<{ minDate: string; maxDate: string }>> {
      return client.get(`/websites/${websiteId}/daterange`);
    },

    /**
     * Get website values for a specific field.
     */
    getWebsiteValues(
      websiteId: string,
      params: DateRangeParams & { type: string },
    ): Promise<ApiResponse<string[]>> {
      return client.get<string[]>(`/websites/${websiteId}/values`, params);
    },

    /**
     * Get realtime data.
     */
    getRealtimeData(websiteId: string): Promise<ApiResponse<RealtimeData>> {
      return client.get<RealtimeData>(`/realtime/${websiteId}`);
    },

    /**
     * Export website data.
     */
    exportWebsiteData(
      websiteId: string,
      params: DateRangeParams & { type: 'csv' | 'json' },
    ): Promise<ApiResponse<string>> {
      return client.get<string>(`/websites/${websiteId}/export`, params);
    },
  };
}
