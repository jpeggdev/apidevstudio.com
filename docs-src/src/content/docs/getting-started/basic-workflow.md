---
title: Basic Workflow
description: The typical workflow for creating and testing mock APIs
context:
  - endpoint-list
  - endpoint-editor
---

# Basic Workflow

The typical workflow in API Dev Studio:

1. **Create an endpoint** - Define the path, method, and response
2. **Test it** - Make requests to your mock server
3. **Inspect requests** - View logged requests in the Request Inspector
4. **Iterate** - Refine your mocks based on what you learn

## Create Your First Endpoint

1. With your project selected, click **New Endpoint**
2. Choose **Mock** as the endpoint type
3. Set the path: `/api/users`
4. Set the method: `GET`
5. In the response body, enter:

```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]
```

6. Click **Save** (or changes auto-save after a moment)

## Test Your Endpoint

```bash
curl http://localhost:3001/api/users
```

You'll see your mock response!

## View in Request Inspector

1. Click **Requests** in the sidebar
2. See your curl request logged with full details
3. Click a request to view headers, body, and response

## Next Steps

- Add [dynamic data with template variables](../features/template-variables)
- Set up [proxy recording](../features/proxy-recording) to capture real API responses
- Create [multiple response variations](../features/mock-endpoints#response-variations)
