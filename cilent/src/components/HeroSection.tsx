import { motion } from "framer-motion";
import { Star, Monitor, Calendar, HardDrive } from "lucide-react";
import heroImage from "@/assets/hero-game.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="relative grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Left: Cinematic Image */}
          <motion.div
            className="relative aspect-[21/9] overflow-hidden rounded-xl card-surface"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <img
              src={heroImage}
              alt="Echoes of Eternity - Featured Game"
              className="h-full w-full object-cover image-outline"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, hsl(222 47% 4% / 0.8) 0%, transparent 60%), linear-gradient(to top, hsl(222 47% 4% / 0.9) 0%, transparent 40%)",
              }}
            />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="text-metadata text-primary">FEATURED · JUST ANNOUNCED</span>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
                Echoes of Eternity
              </h1>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Explore a vast alien world where ancient civilizations left behind technology beyond comprehension. A next-gen open-world RPG.
              </p>
              <div className="mt-4 flex gap-3">
                <motion.button
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 active:scale-[0.97]"
                  transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  Track Game
                </motion.button>
                <button className="rounded-lg border border-border bg-muted/30 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/60">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: Metadata Panel */}
          <motion.div
            className="flex flex-col gap-4 rounded-xl bg-card p-6 card-surface"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <div>
              <span className="text-metadata text-muted-foreground">CRITIC SCORE</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-4xl font-semibold text-foreground">94</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i <= 4 ? "fill-primary text-primary" : "text-border"}`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Based on 42 reviews</span>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-metadata text-muted-foreground">RELEASE DATE</span>
                  <p className="text-sm font-medium text-foreground">March 28, 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Monitor className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-metadata text-muted-foreground">PLATFORMS</span>
                  <p className="text-sm font-medium text-foreground">PC · PS5 · Xbox Series X</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HardDrive className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-metadata text-muted-foreground">SPECS</span>
                  <p className="text-sm font-medium text-foreground">4K @ 60FPS · 68.2GB</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div>
              <span className="text-metadata text-muted-foreground">GENRE</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Open World", "RPG", "Sci-Fi", "Action"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
