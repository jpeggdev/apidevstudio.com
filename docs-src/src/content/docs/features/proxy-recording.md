---
title: Proxy & Recording
description: Proxy requests to real APIs and record responses for mock generation
context:
  - endpoint-editor
  - proxy-config
  - recordings-list
---

# Proxy & Recording

API Dev Studio can proxy requests to real APIs and record the responses. This lets you:

- Capture real API behavior automatically
- Generate mocks from recorded responses
- Switch between live and mock modes

## Creating a Proxy Endpoint

1. Click **New Endpoint** and select **Proxy**
2. Configure:
   - **Path**: The path to proxy (e.g., `/api/users`)
   - **Target URL**: The real API URL (e.g., `https://api.example.com/users`)
3. Save the endpoint

## How Proxying Works

When a request hits your proxy endpoint:

1. API Dev Studio forwards the request to the target URL
2. The real API responds
3. API Dev Studio returns that response to the caller
4. The request/response is logged (and optionally recorded)

## Recording Mode

Enable recording to capture responses for mock generation:

1. Open your proxy endpoint
2. Toggle **Recording** on
3. Make requests through the proxy
4. Responses are saved to the Recordings tab

## Viewing Recordings

1. Select your proxy endpoint
2. Click the **Recordings** tab
3. See all captured responses with timestamps

Each recording shows:
- Request method and path
- Response status code
- Response body
- Timestamp

## Generate Mocks from Recordings

Convert recordings into mock endpoints:

1. In the Recordings tab, select one or more recordings
2. Click **Generate Mock**
3. Choose how to handle duplicates:
   - **Merge**: Combine as response variations
   - **Update**: Replace existing mock
   - **Skip**: Keep existing, ignore new

The generated mock uses the recorded response as its body.

## Live vs Mock Mode

Toggle between live (proxy) and mock modes:

- **Live Mode**: Requests go to the real API
- **Mock Mode**: Requests return your mock responses

This lets you develop against real data, then switch to mocks for offline work or testing edge cases.

## Best Practices

1. **Start with proxy**: Begin by proxying the real API
2. **Record key scenarios**: Capture success, error, and edge cases
3. **Generate mocks**: Convert recordings to mocks
4. **Enhance mocks**: Add template variables for dynamic data
5. **Switch to mock mode**: Develop offline with realistic data
