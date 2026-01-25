---
title: Your First Project
description: Create a project and start your mock API server
context:
  - project-list
  - project-create
---

# Your First Project

Projects organize your mock endpoints. Each project runs its own HTTP server on a configurable port.

## Create a Project

1. Click **New Project** in the top toolbar
2. Enter a name (e.g., "My API")
3. Set a port number (default: 3001)
4. Click **Create**

Your project appears in the sidebar.

## Start the Server

1. Select your project in the sidebar
2. Click the **Start** button in the project header
3. The status indicator turns green when running

Your mock server is now running at `http://localhost:3001` (or your chosen port).

## Test It

Open a terminal and run:

```bash
curl http://localhost:3001
```

You'll get a 404 response - that's expected! You haven't created any endpoints yet.

**Next:** [Learn the basic workflow](./basic-workflow)
