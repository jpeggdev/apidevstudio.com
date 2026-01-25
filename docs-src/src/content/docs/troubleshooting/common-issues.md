---
title: Common Issues
description: Solutions to frequently encountered problems
context:
  - settings
  - project-list
---

# Common Issues

Solutions to problems you might encounter.

## Server Won't Start

### Port Already in Use

**Symptom:** Error message "Port 3001 is already in use"

**Solution:**
1. Choose a different port in project settings
2. Or stop whatever is using that port:
   - On Windows: `netstat -ano | findstr :3001` then `taskkill /PID <pid> /F`
   - On macOS/Linux: `lsof -i :3001` then `kill <pid>`

### Server Starts but Requests Fail

**Symptom:** Server shows as running but requests return connection refused

**Solution:**
1. Check you're using the correct port
2. Try `http://127.0.0.1:PORT` instead of `http://localhost:PORT`
3. Check your firewall isn't blocking the port

## Endpoints Not Working

### 404 Not Found

**Symptom:** Endpoint exists but returns 404

**Causes & Solutions:**
1. **Endpoint is disabled** - Check the enabled toggle
2. **Path mismatch** - Verify the path matches exactly (case-sensitive)
3. **Method mismatch** - Verify you're using the correct HTTP method
4. **Server not restarted** - Some changes require server restart

### Wrong Response Returned

**Symptom:** Getting unexpected response data

**Check:**
1. Response variations - You may have multiple variations configured
2. Conditional logic - Check if conditions are matching differently than expected
3. Caching - Try a fresh request with `curl` or disable browser cache

## Template Variables

### Variables Not Replaced

**Symptom:** Response shows `{{name}}` literally instead of generated value

**Causes:**
1. **Typo in helper name** - Check spelling exactly
2. **Missing closing braces** - Must be `{{name}}` not `{{name}` or `{name}`
3. **Wrong response type** - Body must be text, not binary

### Request Data Not Available

**Symptom:** `{{params.id}}` returns empty

**Check:**
1. Path parameter name matches - `/users/{id}` -> `{{params.id}}`
2. For query params, use `{{query.paramName}}`
3. For body fields, use `{{body.fieldName}}`

## Proxy Issues

### Proxy Returns Errors

**Symptom:** Proxy endpoint returns 500 or 502 errors

**Check:**
1. Target URL is correct and accessible
2. Target API is running
3. Network connectivity (try `curl` to target directly)
4. SSL certificate issues - some APIs require valid certificates

### Recordings Not Appearing

**Symptom:** Requests go through but nothing in Recordings tab

**Check:**
1. Recording toggle is enabled on the endpoint
2. You're making requests to the proxy endpoint, not the target directly

## Data & Storage

### Lost Endpoints After Update

**Symptom:** Endpoints disappeared after app update

**Solution:**
Endpoints are stored in your project folder. Check:
- Windows: `%APPDATA%\api-dev-studio\projects\`
- macOS: `~/Library/Application Support/api-dev-studio/projects/`
- Linux: `~/.config/api-dev-studio/projects/`

### Database Corruption

**Symptom:** App won't start or shows database errors

**Solution:**
1. Close the app completely
2. Delete `project.db` and `local.db` from the app data directory
3. Restart the app (databases will be recreated)
4. Re-import your projects from backups

**Note:** This loses request history. Export important data regularly.

## Performance

### App Running Slowly

**Try:**
1. Clear old requests from Request Inspector
2. Delete old recordings you don't need
3. Reduce number of response variations
4. Restart the app

## Getting More Help

If your issue isn't listed here:

1. Check the full documentation at [apidevstudio.com/docs](https://apidevstudio.com/docs)
2. Search existing issues on [GitHub](https://github.com/apidevstudio/apidevstudio/issues)
3. Open a new issue with:
   - Your OS and app version
   - Steps to reproduce
   - Expected vs actual behavior
   - Any error messages
