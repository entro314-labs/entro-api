// ============================================================================
// Common Types
// ============================================================================

export interface ApiResponse<T> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  orderBy?: string;
}

export interface DateRangeParams {
  startAt: number;
  endAt: number;
  [key: string]: string | number | boolean | undefined;
}

// ============================================================================
// User Types
// ============================================================================

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user' | 'view-only';
  createdAt: string;
  isAdmin?: boolean;
}

export interface CreateUserData {
  username: string;
  password: string;
  role?: 'admin' | 'user' | 'view-only';
}

export interface UpdateUserData {
  username?: string;
  password?: string;
  role?: 'admin' | 'user' | 'view-only';
}

// ============================================================================
// Organization Types
// ============================================================================

export interface Organization {
  id: string;
  name: string;
  createdAt: string;
}

export interface CreateOrgData {
  name: string;
}

export interface UpdateOrgData {
  name?: string;
}

export interface OrgUser {
  id: string;
  userId: string;
  orgId: string;
  role: 'owner' | 'admin' | 'member' | 'view-only';
  user: User;
  createdAt: string;
}

export interface JoinOrgData {
  accessCode: string;
}

// ============================================================================
// Website Types
// ============================================================================

export interface Website {
  id: string;
  name: string;
  domain: string;
  shareId?: string;
  resetAt?: string;
  userId?: string;
  orgId?: string;
  createdAt: string;
  deletedAt?: string;
}

export interface CreateWebsiteData {
  name: string;
  domain: string;
  shareId?: string;
  orgId?: string;
}

export interface UpdateWebsiteData {
  name?: string;
  domain?: string;
  shareId?: string;
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface WebsiteStats {
  pageviews: { value: number; change: number };
  visitors: { value: number; change: number };
  visits: { value: number; change: number };
  bounces: { value: number; change: number };
  totalTime: { value: number; change: number };
}

export interface PageviewData {
  x: string;
  y: number;
}

export interface WebsitePageviews {
  pageviews: PageviewData[];
  sessions: PageviewData[];
}

export interface MetricData {
  x: string;
  y: number;
}

export type MetricType =
  | 'url'
  | 'title'
  | 'referrer'
  | 'browser'
  | 'os'
  | 'device'
  | 'country'
  | 'region'
  | 'city'
  | 'language'
  | 'event';

export interface WebsiteMetricsParams extends DateRangeParams {
  type: MetricType;
  url?: string;
  referrer?: string;
  title?: string;
  query?: string;
  event?: string;
  limit?: number;
  offset?: number;
  [key: string]: string | number | boolean | undefined;
}

export interface WebsiteEvent {
  id: string;
  websiteId: string;
  sessionId: string;
  createdAt: string;
  urlPath: string;
  urlQuery?: string;
  referrerPath?: string;
  referrerQuery?: string;
  referrerDomain?: string;
  pageTitle?: string;
  eventType: number;
  eventName?: string;
}

export interface EventStats {
  events: number;
  fields: number;
}

export interface EventData {
  eventName: string;
  propertyName: string;
  dataType: number;
  total: number;
}

export interface EventDataField {
  fieldName: string;
  dataType: number;
  fieldValue?: string;
}

// ============================================================================
// Session Types
// ============================================================================

export interface Session {
  id: string;
  websiteId: string;
  hostname: string;
  browser: string;
  os: string;
  device: string;
  screen: string;
  language: string;
  country?: string;
  subdivision1?: string;
  subdivision2?: string;
  city?: string;
  createdAt: string;
  distinctId?: string;
}

export interface SessionStats {
  pageviews: number;
  visitors: number;
  visits: number;
  countries: number;
}

export interface SessionActivity {
  createdAt: string;
  urlPath: string;
  urlQuery?: string;
  referrerDomain?: string;
  referrerPath?: string;
  eventName?: string;
  eventType: number;
}

// ============================================================================
// Report Types
// ============================================================================

export interface Report {
  id: string;
  userId: string;
  websiteId: string;
  type: string;
  name: string;
  description?: string;
  parameters: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportData {
  websiteId: string;
  type: string;
  name: string;
  description?: string;
  parameters: Record<string, unknown>;
}

export interface UpdateReportData {
  name?: string;
  description?: string;
  parameters?: Record<string, unknown>;
}

// ============================================================================
// Segment Types
// ============================================================================

export interface Segment {
  id: string;
  websiteId: string;
  name: string;
  data: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSegmentData {
  name: string;
  data: Record<string, unknown>;
}

export interface UpdateSegmentData {
  name?: string;
  data?: Record<string, unknown>;
}

// ============================================================================
// Link Types
// ============================================================================

export interface Link {
  id: string;
  orgId: string;
  name: string;
  url: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

export interface CreateLinkData {
  name: string;
  url: string;
  shortUrl?: string;
}

export interface UpdateLinkData {
  name?: string;
  url?: string;
}

// ============================================================================
// Pixel Types
// ============================================================================

export interface Pixel {
  id: string;
  orgId: string;
  name: string;
  trackingId: string;
  impressions: number;
  createdAt: string;
}

export interface CreatePixelData {
  name: string;
}

export interface UpdatePixelData {
  name?: string;
}

// ============================================================================
// Realtime Types
// ============================================================================

export interface RealtimeData {
  pageviews: PageviewData[];
  sessions: PageviewData[];
  events: EventData[];
  timestamp: number;
}

export interface ActiveVisitor {
  x: string;
  y: number;
}
