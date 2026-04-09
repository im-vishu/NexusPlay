# NexusPlay

NexusPlay is a responsive game discovery website built with React, Vite, Chakra UI, React Query, and Zustand.

It includes:
- Search
- Genre filtering
- Platform filtering
- Sorting
- Infinite scroll
- Game detail pages
- Screenshots and trailers

## Tech Stack

- Frontend: React 18 + Vite + TypeScript
- UI: Chakra UI + Framer Motion
- State/Server State: Zustand + React Query
- Backend Proxy: Express + Axios

## Data Modes

NexusPlay supports two modes:

1. Demo mode (works without API key)
2. Live mode (uses RAWG API key)

If `GHUB_API_KEY` is empty, the app serves an expanded internal demo catalog (40+ games) with screenshots/trailers and full filter support.

## API

- Primary API path: `/api/nexusplay`
- Legacy compatible path: `/api/gamehub` (kept for backward compatibility)
- Health check: `/api/health`

Backend protections included:
- Basic in-memory rate limiting
- Upstream timeout handling for RAWG requests

## Environment

Create a `.env` file in project root:

```env
GHUB_API_KEY=
APP_URL=http://localhost:5173
```

To use live RAWG data, set:

```env
GHUB_API_KEY=your_rawg_api_key
```

## Install

```bash
npm install
```

## Run Locally

Start backend:

```bash
npm run start
```

Start frontend in another terminal:

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Troubleshooting

### `EADDRINUSE: 3030`

Another process is using port `3030`.

Find and stop process:

```powershell
netstat -ano | findstr :3030
Stop-Process -Id <PID> -Force
```

Then run:

```bash
npm run start
```

### Images or videos not loading

- Hard refresh browser: `Ctrl + F5`
- Restart both servers (`npm run start` and `npm run dev`)
- In demo mode, fallback media is used when a source is unavailable

## Brand

Website name: **NexusPlay**
