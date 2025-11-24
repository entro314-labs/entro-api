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

export type PlatformRole = 'admin' | 'user' | 'view-only';
export type OrganizationRole = 'admin' | 'manager' | 'member' | 'view-only';

export interface User {
  id: string;
  /** Clerk user ID (user_xxx format) */
  clerkId: string;
  /** Primary email address */
  email: string;
  /** Display name (computed from firstName + lastName or email) */
  displayName: string;
  /** First name from Clerk */
  firstName?: string | null;
  /** Last name from Clerk */
  lastName?: string | null;
  /** Profile image URL */
  imageUrl?: string | null;
  /** Platform-level role */
  role: PlatformRole;
  /** Whether user has admin privileges */
  isAdmin: boolean;
  /** Current organization ID (if in org context) */
  orgId?: string | null;
  /** Role within current organization */
  orgRole?: OrganizationRole | null;
  createdAt: string;
  updatedAt?: string | null;
  /** @deprecated Use clerkId instead */
  username?: string;
}

export interface CreateUserData {
  email: string;
  firstName?: string;
  lastName?: string;
  role?: PlatformRole;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  role?: PlatformRole;
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
  role: OrganizationRole;
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

// ============================================================================
// Board Types (Custom Dashboards)
// ============================================================================

export interface Board {
  id: string;
  userId: string;
  orgId?: string;
  websiteId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BoardWidget {
  id: string;
  boardId: string;
  title: string;
  type: string;
  parameters: Record<string, unknown>;
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateBoardData {
  websiteId: string;
  name: string;
  description?: string;
}

export interface UpdateBoardData {
  name?: string;
  description?: string;
}

export interface CreateBoardWidgetData {
  title: string;
  type: string;
  parameters?: Record<string, unknown>;
  position?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export interface UpdateBoardWidgetData {
  title?: string;
  type?: string;
  parameters?: Record<string, unknown>;
  position?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}
