# NexusPlay - GameHub Platform

NexusPlay is a modern, high-performance game discovery and management platform. With a beautiful UI, robust filtering, detailed game pages, a simulated e-commerce cart, news feeds, and user profiles, NexusPlay lets you explore, sort, and curate your gaming world—all built with React, TypeScript, and Vite.

---

## ✨ Features

- 🕹️ **Game Discovery:** Browse and search trending and new games
- 🎮 **Game Details:** See screenshots, trailers, reviews, and ratings
- 🔎 **Filter & Sort:** Genre, platform, and sorting options
- ♾️ **Infinite Scroll:** Continuous explore experience
- 🛒 **Cart & Checkout:** Manage a cart, offers & simulate purchases
- 📰 **News Feed:** Stay updated with the latest gaming news
- 👤 **User Profiles:** Recently played, avatars, profile settings
- ☁️ **Live & Demo Data Modes:** Switch between RAWG API and demo mode
- 🌙 **Modern UI:** Chakra/Radix UI, Sonner toasts, Framer Motion, Lucide icons

---

## 🚀 Tech Stack

- **Frontend:** React 18 + Vite + TypeScript  
- **UI:** Chakra UI + Framer Motion  
- **State/Server State:** Zustand + React Query  
- **Backend Proxy:** Express + Axios  

---

## 🗂️ Folder Structure

```
cilent/
├── public/
│   └── assets/         # Game images, avatars, banners, etc.
├── src/
│   ├── components/     # Reusable UI and custom components
│   │   └── ui/         # Tooltip, toaster, sonner wrappers
│   ├── pages/          # Page components (Home, Cart, Details, etc.)
│   ├── App.tsx         # Main app container
│   ├── main.tsx        # Entry point
│   └── ...
├── vite.config.ts      # Vite config (with @ path alias)
└── tsconfig.app.json   # TS path alias config
```

---

## 🌐 API/Backend

NexusPlay can run with or without a RAWG API key:

- **Demo mode:** No API required (40+ sample games, images/trailers, full filtering)
- **Live mode:** Uses RAWG data (requires API key)

Backend (Express proxy) endpoints:

- `/api/nexusplay`: Main API path
- `/api/gamehub`: Legacy/compatible
- `/api/health`: Health check

**.env file example:**
```env
GHUB_API_KEY=your_rawg_api_key    # blank for demo mode
APP_URL=http://localhost:5173
```

---

## 🛠️ Setup & Development

**Prerequisites:**
- Node.js >= 18
- npm >= 9

**Install dependencies:**
```bash
cd cilent
npm install
```

**Run Backend (if live mode):**
```bash
npm run start
```

**Run Frontend:**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173/) in your browser.

---

## 🖼️ Assets

- Place game images and profile banners in `cilent/public/assets/`
- Use meaningful filenames (e.g., `game-1.jpg`, `profile-banner.jpg`)

---

## 🐞 Troubleshooting

### `EADDRINUSE: 3030`
Another process is using port `3030`.
Find and kill with:
```powershell
netstat -ano | findstr :3030
Stop-Process -Id <PID> -Force
```

### Images/Videos not loading
- Hard refresh: `Ctrl + F5`
- Restart both servers (`npm run start` and `npm run dev`)
- In demo mode, fallback media is served

---

## 🙏 Contributing

PRs are welcome!
- Fork the repo
- Create a feature branch
- Commit your changes with meaningful messages
- Open a pull request

---

## 📄 License

MIT

---

**NexusPlay** © 2026 — Created by Vishant Chaudhary
