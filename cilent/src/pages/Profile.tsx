import { motion } from "framer-motion";
import {
  Trophy, Clock, Gamepad2, Search, Bell, Settings, MessageSquare, UserPlus, Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import bannerImg from "@/assets/profile-banner.jpg";
import avatarImg from "@/assets/avatar-profile.jpg";
import rp1 from "@/assets/recently-played-1.jpg";
import rp2 from "@/assets/recently-played-2.jpg";
import rp3 from "@/assets/recently-played-3.jpg";

const recentlyPlayed = [
  { title: "Cyberfall: Eternal Echo", image: rp1, hours: "145h total", achievements: "32/50", lastPlayed: "Last played 2h ago" },
  { title: "Stellar Odyssey", image: rp2, hours: "28h total", achievements: "12/24", lastPlayed: "Last played yesterday" },
  { title: "Lost In The Wild", image: rp3, hours: "12h total", achievements: "5/10", lastPlayed: "Last played 3 days ago" },
];

const friends = [
  { name: "ShadowNinja", status: "Playing Elden Ring", online: true },
  { name: "CyberQueen", status: "Playing Valorant", online: true },
  { name: "IronHammer", status: "Offline", online: false },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 text-foreground">
            <Gamepad2 className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold tracking-tight">Gaming Hub</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 text-sm text-muted-foreground">
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search games, players...</span>
            </div>
            <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Bell className="h-4 w-4" />
            </button>
            <Link to="/settings" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Settings className="h-4 w-4" />
            </Link>
            <img src={avatarImg} alt="Avatar" className="h-8 w-8 rounded-full object-cover ring-2 ring-primary" />
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="relative h-48 md:h-56">
        <img src={bannerImg} alt="Banner" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="-mt-16 flex items-end gap-5">
          <div className="relative">
            <img src={avatarImg} alt="Avatar" className="h-28 w-28 rounded-2xl border-4 border-background object-cover" />
            <span className="absolute -bottom-1 left-3 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground">
              PRO
            </span>
          </div>
          <div className="flex flex-1 items-center justify-between pb-1">
            <div>
              <h1 className="text-2xl font-bold text-foreground">PixelWarrior_99</h1>
              <p className="text-sm text-muted-foreground">RPG Specialist & Content Creator</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110">
                <UserPlus className="h-4 w-4" />
                Follow
              </button>
              <button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Level */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Level 42</span>
                </div>
                <span className="text-metadata text-muted-foreground">ELITE RANK</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-3/4 rounded-full bg-primary" />
              </div>
              <div className="mt-1.5 flex justify-between text-xs tabular-nums text-muted-foreground">
                <span>22,500 XP</span>
                <span>30,000 XP</span>
              </div>
              <p className="mt-1 text-center text-xs italic text-muted-foreground">7,500 XP to next level</p>
            </div>

            {/* Collection */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Gamepad2 className="h-4 w-4 text-primary" />
                Collection
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "TOTAL GAMES", value: "124", highlight: true },
                  { label: "WISHLIST", value: "18", highlight: true },
                  { label: "ACHIEVEMENTS", value: "42", highlight: false },
                  { label: "PLAYTIME", value: "892h", highlight: false },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-border p-3">
                    <span className={`text-lg font-bold ${stat.highlight ? "text-primary" : "text-foreground"}`}>
                      {stat.value}
                    </span>
                    <p className="text-metadata text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Friends */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span>👥</span> Friends
                </h3>
                <a href="#" className="text-xs font-medium text-primary hover:underline">View All</a>
              </div>
              <div className="space-y-3">
                {friends.map((f) => (
                  <div key={f.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{f.name}</p>
                        <p className={`text-xs ${f.online ? "text-primary" : "text-muted-foreground"}`}>
                          {f.status}
                        </p>
                      </div>
                    </div>
                    <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recently Played */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Clock className="h-4 w-4 text-primary" />
                Recently Played
              </h3>
              <div className="space-y-4">
                {recentlyPlayed.map((game) => (
                  <div key={game.title} className="flex items-center gap-4">
                    <img src={game.image} alt={game.title} className="h-16 w-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground">{game.title}</h4>
                      <div className="mt-0.5 flex gap-3 text-xs text-muted-foreground">
                        <span>⏱ {game.hours}</span>
                        <span>🏆 {game.achievements} Achievements</span>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{
                            width: `${(parseInt(game.achievements.split("/")[0]) / parseInt(game.achievements.split("/")[1])) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-primary">
                      {game.lastPlayed}
                    </span>
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full rounded-lg border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                Browse Entire Library
              </button>
            </div>

            {/* About Me */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">About Me</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Passionate RPG enthusiast and competitive FPS player. I've been gaming since the 8-bit era
                and I love exploring deep narratives and atmospheric worlds. When I'm not grinding for
                platinum trophies, you can find me streaming tactical shooters or discussing game mechanics on Discord.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["#RPG", "#TwitchStreamer", "#Soulslike", "#Tactical", "#RetroGaming"].map((tag) => (
                  <span key={tag} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-border py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4 text-primary" />
            <span className="font-semibold text-foreground">Gaming Hub</span>
          </div>
          <nav className="flex gap-4">
            {["Store", "Library", "Community", "Support"].map((item) => (
              <a key={item} href="#" className="hover:text-foreground">{item}</a>
            ))}
          </nav>
          <span>© 2024 Gaming Hub Inc. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
