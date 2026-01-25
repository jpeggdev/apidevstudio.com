---
title: Mock Endpoints
description: Create API endpoints that return static or dynamic responses
context:
  - endpoint-editor
  - endpoint-list
---


Mock endpoints return predefined responses when called. Use them to simulate APIs during development.

## Creating a Mock Endpoint

1. Click **New Endpoint** and select **Mock**
2. Configure the endpoint:
   - **Name**: A descriptive label (e.g., "Get User by ID")
   - **Path**: The URL path (e.g., `/api/users/{id}`)
   - **Method**: GET, POST, PUT, DELETE, etc.

## Path Parameters

Use curly braces for dynamic path segments:

- `/api/users/{id}` - matches `/api/users/123`
- `/api/projects/{projectId}/tasks/{taskId}` - multiple parameters

Access path parameters in your response with `{{params.id}}`.

## Response Configuration

### Status Code

Set any HTTP status code (200, 201, 404, 500, etc.).

### Headers

Add custom response headers:

```
Content-Type: application/json
X-Custom-Header: value
```

### Body

Enter your response body. For JSON responses, you can use [template variables](./template-variables) for dynamic data:

```json
{
  "id": "{{params.id}}",
  "name": "{{name}}",
  "email": "{{email}}",
  "createdAt": "{{timestamp}}"
}
```

## Response Variations

Create multiple response variations for the same endpoint:

- **Static**: Always returns the same response (default)
- **Sequential**: Cycles through variations in order
- **Random**: Randomly selects a variation
- **Conditional**: Returns different responses based on request data

### Conditional Example

Match requests based on query parameters, headers, or body:

```
Condition: query.status equals "active"
Response: { "users": [...active users...] }

Condition: query.status equals "inactive"
Response: { "users": [...inactive users...] }
```

## Response Delay

Add artificial latency to simulate real network conditions. Set delay in milliseconds (e.g., 500ms).

## Enable/Disable

Toggle endpoints on/off without deleting them. Disabled endpoints return 404.
