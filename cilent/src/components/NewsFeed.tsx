import { motion } from "framer-motion";
import { ArrowUpRight, TrendingDown, TrendingUp, FileText } from "lucide-react";

const newsItems = [
  { type: "patch", title: "Elden Ring v1.14 — Performance mode now targets 120FPS on PS5 Pro", time: "2h ago" },
  { type: "deal", title: "Cyberpunk 2077 Ultimate — 60% off on Steam ($23.99)", time: "4h ago", trend: "down" as const },
  { type: "news", title: "Nintendo Switch 2 pre-orders open March 24 — OLED confirmed", time: "6h ago" },
  { type: "patch", title: "Starfield Update 1.12.30 — New planet biomes and ship customization", time: "8h ago" },
  { type: "deal", title: "God of War Ragnarök PC — Launch week 20% discount ($39.99)", time: "12h ago", trend: "down" as const },
  { type: "news", title: "FromSoftware announces new IP — Reveal at TGA 2026", time: "1d ago" },
];

const typeIcons = {
  patch: FileText,
  deal: TrendingDown,
  news: ArrowUpRight,
};

const typeLabels = {
  patch: "PATCH NOTES",
  deal: "PRICE DROP",
  news: "BREAKING",
};

const NewsFeed = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Latest News */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">Latest News</h2>
          <div className="space-y-3">
            {newsItems.map((item, i) => {
              const Icon = typeIcons[item.type as keyof typeof typeIcons];
              const label = typeLabels[item.type as keyof typeof typeLabels];

              return (
                <motion.a
                  key={i}
                  href="#"
                  className="group flex items-start gap-4 rounded-xl bg-card p-4 card-surface transition-shadow hover:card-surface-hover"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <span className="text-metadata text-primary">{label}</span>
                    <p className="mt-0.5 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {item.time}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Upcoming Releases */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">Release Calendar</h2>
          <div className="rounded-xl bg-card p-5 card-surface">
            <div className="space-y-4">
              {[
                { title: "Blade of the Shogun", date: "MAR 18", platforms: "PC · PS5 · Xbox" },
                { title: "Echoes of Eternity", date: "MAR 28", platforms: "PC · PS5 · Xbox" },
                { title: "Abyssal Depths", date: "APR 12", platforms: "PC · PS5" },
                { title: "Starfront Assault", date: "MAY 01", platforms: "PC" },
                { title: "Protocol Zero", date: "JUN 08", platforms: "PC · Xbox" },
              ].map((release, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-muted">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {release.date.split(" ")[0]}
                    </span>
                    <span className="text-lg font-bold tabular-nums text-foreground leading-none">
                      {release.date.split(" ")[1]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{release.title}</p>
                    <p className="text-xs text-muted-foreground">{release.platforms}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsFeed;
