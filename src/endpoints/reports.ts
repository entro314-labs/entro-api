import type { ApiClient } from '../client';
import type {
  ApiResponse,
  CreateReportData,
  DateRangeParams,
  Report,
  UpdateReportData,
} from '../types';

// Report-specific result types
interface FunnelResult {
  step: number;
  name: string;
  visitors: number;
  dropoff: number;
  rate: number;
}

interface RetentionResult {
  date: string;
  visitors: number;
  returning: number[];
}

interface JourneyNode {
  id: string;
  name: string;
}

interface JourneyEdge {
  source: string;
  target: string;
  value: number;
}

interface JourneyResult {
  nodes: JourneyNode[];
  edges: JourneyEdge[];
}

interface GoalResult {
  goal: string;
  visitors: number;
  conversions: number;
  rate: number;
}

interface AttributionResult {
  channel: string;
  visitors: number;
  conversions: number;
  revenue: number;
}

interface RevenueResult {
  date: string;
  revenue: number;
  transactions: number;
  averageOrder: number;
}

interface UTMResult {
  source: string;
  medium: string;
  campaign: string;
  visitors: number;
  conversions: number;
}

interface BreakdownResult {
  field: string;
  value: string;
  visitors: number;
  pageviews: number;
}

export function createReportsEndpoints(client: ApiClient) {
  return {
    /**
     * Get all reports for a website.
     */
    getReports(websiteId: string): Promise<ApiResponse<Report[]>> {
      return client.get<Report[]>(`/websites/${websiteId}/reports`);
    },

    /**
     * Create a new report.
     */
    createReport(data: CreateReportData): Promise<ApiResponse<Report>> {
      return client.post<Report>('/reports', data);
    },

    /**
     * Get a report by ID.
     */
    getReport(reportId: string): Promise<ApiResponse<Report>> {
      return client.get<Report>(`/reports/${reportId}`);
    },

    /**
     * Update a report.
     */
    updateReport(reportId: string, data: UpdateReportData): Promise<ApiResponse<Report>> {
      return client.post<Report>(`/reports/${reportId}`, data);
    },

    /**
     * Delete a report.
     */
    deleteReport(reportId: string): Promise<ApiResponse<void>> {
      return client.delete<void>(`/reports/${reportId}`);
    },

    /**
     * Run a funnel report.
     */
    runFunnelReport(
      params: DateRangeParams & {
        websiteId: string;
        urls: string[];
        window?: number;
      },
    ): Promise<ApiResponse<FunnelResult[]>> {
      return client.post<FunnelResult[]>('/reports/funnel', params);
    },

    /**
     * Run a retention report.
     */
    runRetentionReport(
      params: DateRangeParams & {
        websiteId: string;
        cohortSize?: 'day' | 'week' | 'month';
      },
    ): Promise<ApiResponse<RetentionResult[]>> {
      return client.post<RetentionResult[]>('/reports/retention', params);
    },

    /**
     * Run a journey/flow report.
     */
    runJourneyReport(
      params: DateRangeParams & {
        websiteId: string;
        steps?: number;
      },
    ): Promise<ApiResponse<JourneyResult>> {
      return client.post<JourneyResult>('/reports/journey', params);
    },

    /**
     * Run a goals report.
     */
    runGoalReport(
      params: DateRangeParams & {
        websiteId: string;
        goals: { name: string; type: string; value: string }[];
      },
    ): Promise<ApiResponse<GoalResult[]>> {
      return client.post<GoalResult[]>('/reports/goal', params);
    },

    /**
     * Run an attribution report.
     */
    runAttributionReport(
      params: DateRangeParams & {
        websiteId: string;
        model?: 'first-touch' | 'last-touch' | 'linear';
      },
    ): Promise<ApiResponse<AttributionResult[]>> {
      return client.post<AttributionResult[]>('/reports/attribution', params);
    },

    /**
     * Run a revenue report.
     */
    runRevenueReport(
      params: DateRangeParams & {
        websiteId: string;
        currency?: string;
      },
    ): Promise<ApiResponse<RevenueResult[]>> {
      return client.post<RevenueResult[]>('/reports/revenue', params);
    },

    /**
     * Run a UTM report.
     */
    runUTMReport(
      params: DateRangeParams & {
        websiteId: string;
      },
    ): Promise<ApiResponse<UTMResult[]>> {
      return client.post<UTMResult[]>('/reports/utm', params);
    },

    /**
     * Run a breakdown report.
     */
    runBreakdownReport(
      params: DateRangeParams & {
        websiteId: string;
        fields: string[];
      },
    ): Promise<ApiResponse<BreakdownResult[]>> {
      return client.post<BreakdownResult[]>('/reports/breakdown', params);
    },
  };
}
