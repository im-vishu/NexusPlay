import { motion } from "framer-motion";
import { Search, Bell, Moon, Swords, Gem, Compass, Flame, Car, Download, Heart, Gamepad2, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";
import game4 from "@/assets/game-4.jpg";
import game5 from "@/assets/game-5.jpg";
import game6 from "@/assets/game-6.jpg";
import game7 from "@/assets/game-7.jpg";
import game8 from "@/assets/game-8.jpg";
import avatarImg from "@/assets/avatar-profile.jpg";

const genres = [
  { name: "Action", icon: Swords, active: true },
  { name: "RPG", icon: Gem, active: false },
  { name: "Strategy", icon: Compass, active: false },
  { name: "Adventure", icon: Compass, active: false },
  { name: "Indie", icon: Flame, active: false },
  { name: "Racing", icon: Car, active: false },
];

const games = [
  { title: "Grand Theft Auto V", image: game1, score: 96, date: "Sep 17, 2013", platforms: ["PC", "PS5", "Xbox"] },
  { title: "The Witcher 3: Wild Hunt", image: game2, score: 92, date: "May 19, 2015", platforms: ["PC", "PS5", "Xbox"] },
  { title: "Portal 2", image: game3, score: 95, date: "Apr 18, 2011", platforms: ["PC"] },
  { title: "Counter-Strike: GO", image: game4, score: 83, date: "Aug 21, 2012", platforms: ["PC"] },
  { title: "Cyberpunk 2077", image: game5, score: 88, date: "Dec 10, 2020", platforms: ["PC", "PS5", "Xbox"] },
  { title: "Elden Ring", image: game6, score: 94, date: "Feb 25, 2022", platforms: ["PC", "PS5", "Xbox"] },
  { title: "Red Dead Redemption 2", image: game7, score: 97, date: "Oct 26, 2018", platforms: ["PC", "PS5", "Xbox"] },
  { title: "Hades", image: game8, score: 93, date: "Sep 17, 2020", platforms: ["PC", "PS5", "Xbox", "Switch"] },
];

const scoreColor = (score: number) =>
  score >= 90 ? "bg-[hsl(var(--success))]" : score >= 80 ? "bg-[hsl(var(--warning))]" : "bg-destructive";

const Discover = () => {
  const [activeGenre, setActiveGenre] = useState("Action");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-border bg-sidebar p-5">
        <Link to="/" className="flex items-center gap-2 text-foreground mb-8">
          <Gamepad2 className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold tracking-tight">NEXUS</span>
        </Link>

        <div className="mb-2">
          <span className="text-metadata text-muted-foreground">GAME GENRES</span>
        </div>
        <nav className="space-y-1">
          {genres.map((g) => {
            const Icon = g.icon;
            const isActive = activeGenre === g.name;
            return (
              <button
                key={g.name}
                onClick={() => setActiveGenre(g.name)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {g.name}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 mb-2">
          <span className="text-metadata text-muted-foreground">LIBRARY</span>
        </div>
        <nav className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
            <Download className="h-4 w-4" />
            Downloaded
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
            <Heart className="h-4 w-4" />
            Favorites
          </button>
        </nav>

        {/* User at bottom */}
        <div className="mt-auto flex items-center gap-3 pt-6">
          <img src={avatarImg} alt="Avatar" className="h-9 w-9 rounded-full object-cover" />
          <div>
            <p className="text-sm font-medium text-foreground">Alex Chen</p>
            <p className="text-xs text-muted-foreground">Level 42</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-8 py-3 backdrop-blur-xl">
          <div className="flex-1" />
          <div className="flex h-9 w-full max-w-md items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 text-sm text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
            <span>Search over 500,000 games...</span>
          </div>
          <div className="flex flex-1 items-center justify-end gap-3">
            <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Bell className="h-4 w-4" />
            </button>
            <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Moon className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Discovery Hub</h1>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              Order by: <span className="font-semibold text-foreground">Relevance</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Game Grid */}
          <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
            {games.map((game, i) => (
              <Link to="/game-detail" key={game.title}>
                <motion.div
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {game.score && (
                      <div className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-primary-foreground ${scoreColor(game.score)}`}>
                        {game.score}
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="flex gap-1.5 text-muted-foreground mb-1">
                      {game.platforms.slice(0, 3).map((p) => (
                        <span key={p} className="text-xs">🖥</span>
                      ))}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground truncate">{game.title}</h3>
                    <p className="text-xs text-muted-foreground">Released: {game.date}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
