# @entro314labs/entro-api

TypeScript API client for Entrolytics analytics platform. Provides programmatic access to all Entrolytics API endpoints.

## Requirements

- Node.js 18.18 or newer

## Installation

```bash
pnpm add @entro314labs/entro-api
```

## Quick Start

```typescript
import { getClient } from '@entro314labs/entro-api';

const client = getClient({
  endpoint: 'https://analytics.example.com/api',
  apiKey: 'your-api-key',
});

// Get all websites
const { ok, data, error } = await client.getWebsites();

if (ok) {
  console.log('Websites:', data);
} else {
  console.error('Error:', error);
}
```

## Configuration

### Environment Variables

#### Cloud (Entrolytics Cloud)

```bash
ENTROLYTICS_API_KEY=your-api-key
ENTROLYTICS_API_ENDPOINT=https://cloud.entrolytics.click/api
```

#### Self-Hosted

```bash
ENTROLYTICS_USER_ID=your-user-id
ENTROLYTICS_SECRET=your-app-secret
ENTROLYTICS_API_ENDPOINT=https://analytics.example.com/api
```

### Programmatic Configuration

```typescript
import { getClient } from '@entro314labs/entro-api';

// Cloud authentication
const cloudClient = getClient({
  endpoint: 'https://cloud.entrolytics.click/api',
  apiKey: 'your-api-key',
});

// Self-hosted authentication
const selfHostedClient = getClient({
  endpoint: 'https://analytics.example.com/api',
  userId: 'your-user-id',
  secret: 'your-app-secret',
});
```

## API Response Format

All API methods return a consistent response format:

```typescript
interface ApiResponse<T> {
  ok: boolean;      // Request succeeded
  status: number;   // HTTP status code
  data?: T;         // Response data (on success)
  error?: string;   // Error message (on failure)
}
```

## Available Endpoints

### Me (Current User)

```typescript
client.getMe()
client.updateMyPassword({ currentPassword, newPassword })
client.getMyWebsites()
client.getMyOrgs()
```

### Users (Admin)

```typescript
client.getUsers()
client.createUser({ username, password, role })
client.getUser(userId)
client.updateUser(userId, { username, password, role })
client.deleteUser(userId)
client.getUserWebsites(userId)
client.getUserUsage(userId, { startAt, endAt })
```

### Organizations

```typescript
client.getOrgs()
client.createOrg({ name })
client.joinOrg({ accessCode })
client.getOrg(orgId)
client.updateOrg(orgId, { name })
client.deleteOrg(orgId)
client.getOrgUsers(orgId)
client.addOrgUser(orgId, { userId, role })
client.updateOrgUser(orgId, userId, { role })
client.removeOrgUser(orgId, userId)
client.getOrgWebsites(orgId)
client.addOrgWebsite(orgId, { websiteId })
client.removeOrgWebsite(orgId, websiteId)
```

### Websites

```typescript
client.getWebsites()
client.createWebsite({ name, domain, shareId, orgId })
client.getWebsite(websiteId)
client.updateWebsite(websiteId, { name, domain, shareId })
client.deleteWebsite(websiteId)
client.resetWebsite(websiteId)
client.transferWebsite(websiteId, { userId, orgId })
```

### Analytics

```typescript
// Statistics
client.getWebsiteStats(websiteId, { startAt, endAt })
client.getWebsitePageviews(websiteId, { startAt, endAt, unit, timezone })
client.getWebsiteMetrics(websiteId, { startAt, endAt, type, limit })
client.getWebsiteExpandedMetrics(websiteId, { startAt, endAt, type })

// Events
client.getWebsiteEvents(websiteId, { startAt, endAt, query, limit })
client.getWebsiteEventsSeries(websiteId, { startAt, endAt, unit, event })

// Sessions
client.getWebsiteSessions(websiteId, { startAt, endAt, query, limit })
client.getWebsiteSessionStats(websiteId, { startAt, endAt })
client.getSession(websiteId, sessionId)
client.getSessionActivity(websiteId, sessionId, { startAt, endAt })

// Realtime
client.getWebsiteActive(websiteId)
client.getRealtimeData(websiteId)
```

### Event Data

```typescript
client.getEventDataStats(websiteId, { startAt, endAt })
client.getEventDataEvents(websiteId, { startAt, endAt })
client.getEventDataFields(websiteId, { startAt, endAt, eventName })
client.getEventDataValues(websiteId, { startAt, endAt, eventName, fieldName })
client.getEventDataProperties(websiteId, { startAt, endAt, eventName })
```

### Reports

```typescript
// CRUD
client.getReports(websiteId)
client.createReport({ websiteId, type, name, description, parameters })
client.getReport(reportId)
client.updateReport(reportId, { name, description, parameters })
client.deleteReport(reportId)

// Run reports
client.runFunnelReport({ websiteId, startAt, endAt, urls, window })
client.runRetentionReport({ websiteId, startAt, endAt, cohortSize })
client.runJourneyReport({ websiteId, startAt, endAt, steps })
client.runGoalReport({ websiteId, startAt, endAt, goals })
client.runAttributionReport({ websiteId, startAt, endAt, model })
client.runRevenueReport({ websiteId, startAt, endAt, currency })
client.runUTMReport({ websiteId, startAt, endAt })
client.runBreakdownReport({ websiteId, startAt, endAt, fields })
```

### Segments

```typescript
client.getSegments(websiteId)
client.createSegment(websiteId, { name, data })
client.getSegment(websiteId, segmentId)
client.updateSegment(websiteId, segmentId, { name, data })
client.deleteSegment(websiteId, segmentId)
```

### Links (URL Shortener)

```typescript
client.getLinks()
client.getOrgLinks(orgId)
client.createLink(orgId, { name, url, shortUrl })
client.getLink(linkId)
client.updateLink(linkId, { name, url })
client.deleteLink(linkId)
```

### Pixels (Tracking Pixels)

```typescript
client.getPixels()
client.getOrgPixels(orgId)
client.createPixel(orgId, { name })
client.getPixel(pixelId)
client.updatePixel(pixelId, { name })
client.deletePixel(pixelId)
```

## Examples

### Get Website Statistics

```typescript
const { ok, data } = await client.getWebsiteStats('website-id', {
  startAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
  endAt: Date.now(),
});

if (ok) {
  console.log('Pageviews:', data.pageviews.value);
  console.log('Visitors:', data.visitors.value);
  console.log('Bounce Rate:', data.bounces.value);
}
```

### Run a Funnel Report

```typescript
const { ok, data } = await client.runFunnelReport({
  websiteId: 'website-id',
  startAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
  endAt: Date.now(),
  urls: ['/landing', '/signup', '/onboarding', '/dashboard'],
  window: 7, // 7-day conversion window
});

if (ok) {
  data.forEach((step) => {
    console.log(`${step.name}: ${step.visitors} visitors, ${step.dropoff}% dropoff`);
  });
}
```

### Track Custom Events Analysis

```typescript
// Get all tracked events
const events = await client.getEventDataEvents('website-id', {
  startAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
  endAt: Date.now(),
});

// Get properties for a specific event
const properties = await client.getEventDataFields('website-id', {
  startAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
  endAt: Date.now(),
  eventName: 'button-click',
});
```

## TypeScript Support

The package includes full TypeScript support with type definitions for all API responses.

```typescript
import type {
  Website,
  WebsiteStats,
  Session,
  EventData,
  Report,
  ApiResponse,
} from '@entro314labs/entro-api';
```

## License

MIT © [Entrolytics](https://entrolytics.click)
