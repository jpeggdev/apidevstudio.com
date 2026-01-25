---
title: CLI Reference
description: Command-line interface for API Dev Studio
---

# CLI Reference

API Dev Studio includes a command-line interface (`apidev`) for managing mock servers, running the MCP server, and performing common tasks without the GUI.

## Installation

The CLI is included with API Dev Studio. After installation, add it to your PATH:

**Windows:**
```
%LOCALAPPDATA%\api-dev-studio\
```

**macOS:**
```
/Applications/API Dev Studio.app/Contents/MacOS/
```

**Linux:**
```
/usr/local/bin/
```

Or download the standalone CLI from the releases page.

## Commands

### `apidev serve`

Start the mock server for a project.

```bash
apidev serve [PROJECT_ID] [OPTIONS]
```

**Options:**
| Option | Description |
|--------|-------------|
| `-p, --port <PORT>` | Port to run server on (default: from project settings) |
| `--host <HOST>` | Host to bind to (default: 127.0.0.1) |

**Examples:**
```bash
# Start server for default project
apidev serve

# Start server on specific port
apidev serve my-project --port 4000

# Start server accessible on network
apidev serve --host 0.0.0.0
```

### `apidev mcp`

Start the MCP server for AI assistant integration.

```bash
apidev mcp [OPTIONS]
```

**Options:**
| Option | Description |
|--------|-------------|
| `--http` | Run in HTTP mode (default: stdio) |
| `-p, --port <PORT>` | HTTP port (default: 3100) |

**Examples:**
```bash
# Start MCP server in stdio mode (for Claude Desktop)
apidev mcp

# Start MCP server in HTTP mode
apidev mcp --http --port 3100
```

### `apidev list`

List projects or endpoints.

```bash
apidev list [RESOURCE]
```

**Resources:**
- `projects` (default) - List all projects
- `endpoints [PROJECT_ID]` - List endpoints in a project

**Examples:**
```bash
# List all projects
apidev list

# List endpoints in a project
apidev list endpoints my-project
```

### `apidev import`

Import an OpenAPI specification.

```bash
apidev import <FILE> [OPTIONS]
```

**Options:**
| Option | Description |
|--------|-------------|
| `-p, --project <ID>` | Target project ID |
| `--overwrite` | Overwrite existing endpoints |

**Examples:**
```bash
# Import spec to new project
apidev import api-spec.yaml

# Import to existing project, overwriting conflicts
apidev import api-spec.json --project my-api --overwrite
```

### `apidev export`

Export a project as OpenAPI specification.

```bash
apidev export <PROJECT_ID> [OPTIONS]
```

**Options:**
| Option | Description |
|--------|-------------|
| `-o, --output <FILE>` | Output file path |
| `-f, --format <FORMAT>` | Format: json or yaml (default: yaml) |

**Examples:**
```bash
# Export as YAML
apidev export my-project -o api-spec.yaml

# Export as JSON
apidev export my-project -o api-spec.json --format json
```

### `apidev version`

Show version information.

```bash
apidev version
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `APIDEV_DATA_DIR` | Override default data directory |
| `APIDEV_LOG_LEVEL` | Log level: error, warn, info, debug, trace |

## Exit Codes

| Code | Description |
|------|-------------|
| 0 | Success |
| 1 | General error |
| 2 | Invalid arguments |
| 3 | Project not found |
| 4 | Port already in use |

## Examples

### Start Development Server

```bash
# Start mock server for your API project
apidev serve my-api --port 3001

# In another terminal, test an endpoint
curl http://localhost:3001/api/users
```

### CI/CD Integration

```bash
# Import OpenAPI spec and start server for tests
apidev import ./openapi.yaml --project test-api --overwrite
apidev serve test-api --port 3001 &
npm test
```

### Claude Desktop Integration

Add to your Claude Desktop config (`claude_desktop_config.json`):

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
