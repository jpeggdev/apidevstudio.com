---
title: MCP Server
description: Connect AI assistants like Claude to manage your mock APIs
---


API Dev Studio includes a built-in MCP (Model Context Protocol) server that allows AI assistants like Claude to interact with your mock APIs directly.

## What is MCP?

MCP is a protocol that enables AI assistants to use tools and access context from external applications. With API Dev Studio's MCP server, you can:

- Create and manage mock endpoints using natural language
- Inspect recent requests through conversation
- Generate mock responses from descriptions
- Import/export OpenAPI specs

## Enabling the MCP Server

### In the Desktop App

1. Go to **MCP Server** in the sidebar
2. Click **Start Server**
3. Choose your connection mode:
   - **HTTP**: For network access (port 3100 by default)
   - **Stdio**: For direct process communication

### Using the CLI

```bash
apidev mcp

apidev mcp --http --port 3100
```

## Connecting Claude Desktop

Add API Dev Studio to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "apidevstudio": {
      "command": "apidev",
      "args": ["mcp"]
    }
  }
}
```

After restarting Claude Desktop, you can ask Claude to:

- "Create a mock endpoint for GET /api/users that returns a list of users"
- "Show me the last 5 requests to my mock server"
- "Add a new response variation for the users endpoint"

## Available Tools

The MCP server provides 18 tools across four categories:

### Project Tools
- `list_projects` - List all projects
- `create_project` - Create a new project
- `get_project` - Get project details
- `update_project` - Update project settings
- `delete_project` - Delete a project

### Endpoint Tools
- `list_endpoints` - List endpoints in a project
- `create_endpoint` - Create a mock endpoint
- `get_endpoint` - Get endpoint details
- `update_endpoint` - Update an endpoint
- `delete_endpoint` - Delete an endpoint
- `find_endpoint` - Find endpoint by path and method

### Request Tools
- `list_requests` - List recent requests
- `get_request` - Get request details
- `star_request` - Star/bookmark a request
- `delete_request` - Delete requests
- `clear_requests` - Clear all requests

### Import/Export Tools
- `import_openapi` - Import OpenAPI specification
- `export_openapi` - Export project as OpenAPI

## HTTP Mode

When running in HTTP mode, the MCP server exposes these endpoints:

| Endpoint | Description |
|----------|-------------|
| `POST /mcp` | JSON-RPC endpoint for MCP requests |
| `GET /mcp/sse` | Server-Sent Events for streaming |
| `GET /mcp/health` | Health check endpoint |
| `GET /mcp/logs` | View recent MCP logs |
| `GET /mcp/connections` | View active connections |

## Security Considerations

- The MCP server only accepts connections from localhost by default
- No authentication is required for local connections
- Be cautious when exposing HTTP mode to the network
- The server can only access projects in API Dev Studio's data directory
