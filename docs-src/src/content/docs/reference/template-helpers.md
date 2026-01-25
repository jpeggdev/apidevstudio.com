---
title: Template Helpers Reference
description: Complete list of all template helpers for dynamic mock responses
context:
  - endpoint-editor
  - response-body-editor
---


Complete reference of all available template helpers. Use in response bodies with `{{helperName}}` syntax.

## Request Context

| Helper | Description | Example Input | Example Output |
|--------|-------------|---------------|----------------|
| `{{params.name}}` | Path parameter | `/users/{id}` called as `/users/42` | `42` |
| `{{query.name}}` | Query parameter | `?page=2&limit=10` | `2` |
| `{{body.field}}` | Request body field | `{"name": "Alice"}` | `Alice` |
| `{{body.nested.field}}` | Nested body field | `{"user": {"id": 1}}` | `1` |
| `{{headers.name}}` | Request header | `Authorization: Bearer xyz` | `Bearer xyz` |
| `{{method}}` | HTTP method | - | `GET` |
| `{{path}}` | Request path | - | `/api/users/42` |

## Identifiers

| Helper | Description | Example Output |
|--------|-------------|----------------|
| `{{uuid}}` | UUID v4 | `a1b2c3d4-e5f6-7890-abcd-1234567890ab` |
| `{{objectId}}` | MongoDB-style ID | `507f1f77bcf86cd799439011` |

## People

| Helper | Description | Example Output |
|--------|-------------|----------------|
| `{{name}}` | Full name | `John Smith` |
| `{{firstName}}` | First name | `John` |
| `{{lastName}}` | Last name | `Smith` |
| `{{username}}` | Username | `jsmith42` |
| `{{email}}` | Email address | `john.smith@example.com` |
| `{{phone}}` | Phone number | `(555) 123-4567` |
| `{{avatar}}` | Avatar URL | `https://...` |

## Location

| Helper | Description | Example Output |
|--------|-------------|----------------|
| `{{address}}` | Street address | `123 Main St` |
| `{{city}}` | City | `San Francisco` |
| `{{state}}` | State/Province | `California` |
| `{{stateAbbr}}` | State abbreviation | `CA` |
| `{{zipCode}}` | ZIP/Postal code | `94102` |
| `{{country}}` | Country | `United States` |
| `{{countryCode}}` | Country code | `US` |
| `{{latitude}}` | Latitude | `37.7749` |
| `{{longitude}}` | Longitude | `-122.4194` |

## Business

| Helper | Description | Example Output |
|--------|-------------|----------------|
| `{{company}}` | Company name | `Acme Corporation` |
| `{{jobTitle}}` | Job title | `Software Engineer` |
| `{{department}}` | Department | `Engineering` |

## Internet

| Helper | Description | Example Output |
|--------|-------------|----------------|
| `{{url}}` | URL | `https://example.com/page` |
| `{{domain}}` | Domain name | `example.com` |
| `{{ipv4}}` | IPv4 address | `192.168.1.1` |
| `{{ipv6}}` | IPv6 address | `2001:0db8:85a3:...` |
| `{{userAgent}}` | User agent string | `Mozilla/5.0...` |
| `{{color}}` | Hex color | `#3498db` |

## Date & Time

| Helper | Description | Example Output |
|--------|-------------|----------------|
| `{{date}}` | ISO date | `2026-01-15` |
| `{{datetime}}` | ISO datetime | `2026-01-15T10:30:00Z` |
| `{{timestamp}}` | Unix timestamp | `1737043200` |
| `{{timestampMs}}` | Unix timestamp (ms) | `1737043200000` |
| `{{pastDate}}` | Past date | `2025-06-20` |
| `{{futureDate}}` | Future date | `2026-08-15` |
| `{{now}}` | Current ISO datetime | `2026-01-23T14:30:00Z` |

## Numbers

| Helper | Syntax | Description | Example Output |
|--------|--------|-------------|----------------|
| `{{number}}` | `{{number min max}}` | Random integer | `{{number 1 100}}` -> `42` |
| `{{float}}` | `{{float min max precision}}` | Random float | `{{float 0 1 2}}` -> `0.73` |
| `{{boolean}}` | `{{boolean}}` | Random boolean | `true` |
| `{{price}}` | `{{price min max}}` | Price format | `{{price 10 100}}` -> `49.99` |

## Text

| Helper | Description | Example Output |
|--------|-------------|----------------|
| `{{lorem}}` | Lorem paragraph | `Lorem ipsum dolor sit...` |
| `{{sentence}}` | Random sentence | `The quick brown fox...` |
| `{{word}}` | Random word | `synergy` |
| `{{words 5}}` | N random words | `alpha beta gamma delta epsilon` |
| `{{paragraph}}` | Paragraph | Multiple sentences |

## Arrays & Repetition

### repeat

Generate arrays:

```handlebars
[
{{#repeat 3}}
  {"id": {{@index}}, "name": "{{name}}"}{{#unless @last}},{{/unless}}
{{/repeat}}
]
```

Output:
```json
[
  {"id": 0, "name": "Alice Johnson"},
  {"id": 1, "name": "Bob Smith"},
  {"id": 2, "name": "Carol Williams"}
]
```

**Variables inside repeat:**
- `{{@index}}` - Current index (0-based)
- `{{@first}}` - True if first iteration
- `{{@last}}` - True if last iteration

### oneOf

Pick randomly from options:

```handlebars
{{oneOf "active" "pending" "inactive"}}
```

## Conditional Helpers

### if / unless

```handlebars
{{#if params.id}}
  {"id": "{{params.id}}"}
{{else}}
  {"error": "ID required"}
{{/if}}
```

### Compare helpers

```handlebars
{{#eq query.status "active"}}
  Active users
{{/eq}}

{{#gt query.page 1}}
  Has previous page
{{/gt}}
```

Available: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`
