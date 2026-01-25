---
title: Template Variables
description: Generate dynamic data in your mock responses
context:
  - endpoint-editor
  - response-body-editor
---

# Template Variables

Template variables let you generate dynamic, realistic data in your mock responses. Use double curly braces: `{{variableName}}`.

## Basic Usage

In your response body:

```json
{
  "id": "{{uuid}}",
  "name": "{{name}}",
  "email": "{{email}}"
}
```

Each request generates fresh random data.

## Request Data

Access data from the incoming request:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{params.id}}` | Path parameter | `/users/{id}` -> `{{params.id}}` |
| `{{query.page}}` | Query string | `?page=2` -> `{{query.page}}` |
| `{{body.name}}` | Request body field | JSON body access |
| `{{headers.authorization}}` | Request header | Header value |

## Available Helpers

### Identity

| Helper | Output |
|--------|--------|
| `{{uuid}}` | `a1b2c3d4-e5f6-7890-...` |
| `{{name}}` | `John Smith` |
| `{{firstName}}` | `John` |
| `{{lastName}}` | `Smith` |
| `{{username}}` | `jsmith42` |

### Contact

| Helper | Output |
|--------|--------|
| `{{email}}` | `john.smith@example.com` |
| `{{phone}}` | `(555) 123-4567` |

### Location

| Helper | Output |
|--------|--------|
| `{{address}}` | `123 Main St` |
| `{{city}}` | `San Francisco` |
| `{{state}}` | `California` |
| `{{zipCode}}` | `94102` |
| `{{country}}` | `United States` |

### Business

| Helper | Output |
|--------|--------|
| `{{company}}` | `Acme Corp` |
| `{{jobTitle}}` | `Software Engineer` |

### Internet

| Helper | Output |
|--------|--------|
| `{{url}}` | `https://example.com/page` |
| `{{domain}}` | `example.com` |
| `{{ipv4}}` | `192.168.1.1` |

### Date & Time

| Helper | Output |
|--------|--------|
| `{{date}}` | `2026-01-15` |
| `{{timestamp}}` | `1737043200` |
| `{{pastDate}}` | Date in the past |
| `{{futureDate}}` | Date in the future |

### Numbers

| Helper | Output |
|--------|--------|
| `{{number 1 100}}` | Random integer 1-100 |
| `{{float 0 1 2}}` | Random float with 2 decimals |
| `{{boolean}}` | `true` or `false` |

### Text

| Helper | Output |
|--------|--------|
| `{{lorem}}` | Lorem ipsum paragraph |
| `{{sentence}}` | Random sentence |
| `{{word}}` | Random word |

## Arrays with Repeat

Generate arrays of items:

```handlebars
[
  {{#repeat 5}}
  {
    "id": "{{uuid}}",
    "name": "{{name}}"
  }{{#unless @last}},{{/unless}}
  {{/repeat}}
]
```

Generates an array of 5 user objects.

## Full Reference

See [Template Helpers Reference](../reference/template-helpers) for the complete list.
