---
title: Webhook Endpoints
description: Receive and inspect webhooks locally with optional forwarding
---

# Webhook Endpoints

Webhook endpoints let you receive HTTP requests from external services and inspect them in real-time. Perfect for testing webhooks from payment providers, CI/CD systems, or any service that sends HTTP callbacks.

## Creating a Webhook Endpoint

1. Click **New Endpoint** and select **Webhook**
2. Configure the endpoint:
   - **Name**: A descriptive label (e.g., "Stripe Webhooks")
   - **Path**: The URL path to receive webhooks (e.g., `/webhooks/stripe`)

## How It Works

When a request hits your webhook endpoint:

1. The request is logged to the Request Inspector
2. Headers, body, and metadata are captured
3. An automatic response is returned (configurable)
4. Optionally, the request is forwarded to another URL

## Viewing Webhook Requests

1. Go to the **Requests** view in the sidebar
2. Filter by your webhook endpoint path
3. Click any request to see full details:
   - Request headers
   - Request body (JSON formatted if applicable)
   - Query parameters
   - Timestamp and duration

## Response Configuration

Configure the automatic response returned to callers:

- **Status Code**: Default 200, set any valid HTTP status
- **Headers**: Add custom response headers
- **Body**: Custom response body (optional)

Most webhook senders just need a 200 OK response.

## Forwarding Requests

Forward webhook requests to another URL while still logging them locally:

1. Enable **Forward requests**
2. Enter the target URL (e.g., `http://localhost:3000/api/webhooks`)
3. Optionally enable **Forward headers** to pass through original headers

This lets you:
- Debug webhooks before they hit your app
- Test webhooks against multiple environments
- Inspect payloads without modifying your application

## Use Cases

### Payment Webhooks
Receive Stripe, PayPal, or other payment provider webhooks locally during development.

### CI/CD Notifications
Catch GitHub Actions, GitLab CI, or Jenkins build notifications.

### Third-Party Integrations
Debug webhooks from Slack, Discord, Twilio, or any service with webhook support.

## Tips

- **Star important requests** to keep them at the top of the list
- **Export requests** to JSON for documentation or sharing
- Use the **search** feature to find specific webhook payloads
