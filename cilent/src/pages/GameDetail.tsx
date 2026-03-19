import { motion } from "framer-motion";
import { Play, CheckCircle, Calendar, Shield, Gamepad2, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/game-detail-hero.jpg";
import thumb1 from "@/assets/game-detail-thumb-1.jpg";
import thumb2 from "@/assets/game-detail-thumb-2.jpg";
import thumb3 from "@/assets/game-detail-thumb-3.jpg";

const GameDetail = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-foreground">
              <Gamepad2 className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold tracking-tight">NEXUS</span>
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              {["Store", "Library", "Community", "Support"].map((item) => (
                <Link
                  key={item}
                  to={item === "Store" ? "/discover" : "#"}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 text-sm text-muted-foreground">
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search games...</span>
            </div>
            <Link to="/profile" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <User className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              Grand Theft<br />Auto V
            </h1>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Experience the critically acclaimed open-world game from Rockstar Games.
            </p>

            <div className="mt-6 flex gap-3">
              <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.97]">
                Play Now
                <Play className="h-4 w-4 fill-current" />
              </button>
              <button className="rounded-lg border border-border bg-muted/30 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/60">
                Read More
              </button>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled
              with some of the most frightening and deranged elements of the criminal underworld, the U.S. government
              and the entertainment industry, they must pull off a series of dangerous heists to survive.
            </p>

            {/* Metadata Grid */}
            <div className="mt-8 border-t border-border pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-metadata text-muted-foreground">PLATFORMS</span>
                  <p className="mt-1 text-sm font-medium text-foreground">PC, PS5, Xbox Series X/S</p>
                </div>
                <div>
                  <span className="text-metadata text-muted-foreground">METASCORE</span>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-[hsl(var(--success))] text-xs font-bold text-primary-foreground">
                      96
                    </span>
                    <span className="text-sm text-foreground">Universal Acclaim</span>
                  </div>
                </div>
                <div>
                  <span className="text-metadata text-muted-foreground">GENRES</span>
                  <p className="mt-1 text-sm font-medium text-foreground">Action, Open World</p>
                </div>
                <div>
                  <span className="text-metadata text-muted-foreground">PUBLISHERS</span>
                  <p className="mt-1 text-sm font-medium text-foreground">Rockstar Games</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Media */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Main Trailer */}
            <div className="relative overflow-hidden rounded-xl">
              <img src={heroImg} alt="GTA V Trailer" className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/60 backdrop-blur-sm transition-transform hover:scale-110">
                  <Play className="h-6 w-6 fill-foreground text-foreground ml-1" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 rounded-md bg-background/70 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                Official Trailer
              </div>
              <div className="absolute bottom-3 right-3 rounded-md bg-background/70 px-2 py-1 text-xs font-medium tabular-nums text-foreground backdrop-blur-sm">
                02:45
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-3 grid grid-cols-3 gap-3">
              <img src={thumb1} alt="Screenshot 1" className="aspect-video w-full rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity" />
              <img src={thumb2} alt="Screenshot 2" className="aspect-video w-full rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity" />
              <div className="relative aspect-video w-full overflow-hidden rounded-lg cursor-pointer">
                <img src={thumb3} alt="Screenshot 3" className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                  <span className="text-lg font-semibold text-foreground">+12</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Info Cards */}
        <motion.div
          className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Developer</p>
              <p className="text-xs text-muted-foreground">Rockstar North</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Release Date</p>
              <p className="text-xs text-muted-foreground">September 17, 2013</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Age Rating</p>
              <p className="text-xs text-muted-foreground">Mature 17+</p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 text-xs text-muted-foreground">
          <span>© 2024 GameHub. All rights reserved. Trademarks are property of their respective owners.</span>
        </div>
      </footer>
    </div>
  );
};

export default GameDetail;
