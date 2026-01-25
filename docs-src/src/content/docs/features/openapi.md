---
title: OpenAPI Import/Export
description: Import OpenAPI specs to generate endpoints, export your mocks as OpenAPI
---


API Dev Studio supports importing OpenAPI 3.x specifications to quickly generate mock endpoints, and exporting your mocks back to OpenAPI format for documentation or sharing.

## Importing OpenAPI Specs

### Supported Formats

- OpenAPI 3.0 and 3.1
- JSON and YAML formats
- Local files or URLs

### How to Import

1. Click **Import** in the project toolbar
2. Select **OpenAPI Specification**
3. Choose your spec file (`.json` or `.yaml`)
4. Preview the endpoints that will be created
5. Choose import options:
   - **Overwrite existing**: Replace endpoints with matching paths
   - **Skip existing**: Keep current endpoints, only add new ones
6. Click **Import**

### What Gets Imported

- **Paths** become mock endpoints
- **Methods** (GET, POST, PUT, DELETE, etc.)
- **Example responses** become the response body
- **Response schemas** are used to generate sample data if no examples exist
- **Path parameters** like `{id}` are preserved

### Preview Before Import

The preview screen shows:
- Number of endpoints to be created
- Any conflicts with existing endpoints
- Warnings for unsupported features

## Exporting to OpenAPI

Export your mock endpoints as an OpenAPI 3.0 specification.

### How to Export

1. Click **Export** in the project toolbar
2. Select **OpenAPI Specification**
3. Choose format: **JSON** or **YAML**
4. Click **Export** and choose save location

### What Gets Exported

- All enabled mock endpoints
- Path and method configuration
- Response status codes
- Response body as examples
- Response variations as named examples
- Inferred JSON schemas from response bodies

### Use Cases

- **Generate documentation** from your mocks
- **Share API contracts** with team members
- **Seed API gateways** with mock definitions
- **Create Postman collections** (import the OpenAPI spec into Postman)

## Postman Collection Import

API Dev Studio also supports importing Postman Collection v2.1 files.

### How to Import

1. Click **Import** in the project toolbar
2. Select **Postman Collection**
3. Choose your collection file (`.json`)
4. Preview the requests with folder structure
5. Select which requests to import
6. Click **Import**

### Variable Mapping

Postman dynamic variables are automatically mapped to API Dev Studio template helpers:

| Postman Variable | API Dev Studio Helper |
|-----------------|----------------------|
| `{{$guid}}` | `{{uuid}}` |
| `{{$randomEmail}}` | `{{email}}` |
| `{{$randomFirstName}}` | `{{firstName}}` |
| `{{$randomInt}}` | `{{number 1 1000}}` |
| `{{$timestamp}}` | `{{timestamp}}` |

Unmapped variables are shown in the preview with warnings.
