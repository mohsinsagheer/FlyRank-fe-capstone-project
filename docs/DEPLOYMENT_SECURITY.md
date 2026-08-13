# Deployment & Security Architecture

## 1. Security Guidelines: Server-Side API Key Protection

> [!CAUTION]
> **API Key Protection**: The Claude API key (`CLAUDE_API_KEY`) is strictly contained within server environment variables (`.env`) and processed via `server.ts`. It is **never** injected into Vite client bundle (`VITE_*`) or sent to the client browser.

- `.gitignore` explicitly blocks `.env`, `*.local`, and log files from git commits.
- Frontend queries `/api/ai/*`, which proxies to Express backend `http://localhost:3001` in local dev or production server environments.

---

## 2. Deployment Setup

### Environment Variables
```env
PORT=3001
CLAUDE_API_KEY=sk-ant-api03-xxxx...
```

### Production Build & Launch Commands
```bash
# Install dependencies
npm install

# Build client bundle
npm run build

# Start backend proxy server
npm run server

# Serve client static assets
npm run preview
```

---

## 3. Failure Handling & Rollback Protocol

- **Network Outage / Rate Limit:** `aiService.ts` catches HTTP 5xx / timeout errors and seamlessly falls back to heuristic matching without interrupting the user.
- **Rollback:** In the event of a breaking deployment, roll back to the previous Git commit tag. Core client bundle has zero dependency on external backend availability.
