import { motion } from "framer-motion";
import { useState } from "react";

interface GameCardProps {
  title: string;
  image: string;
  score: number;
  platform: string;
  storage: string;
  engine: string;
  controller: string;
  releaseDate: string;
  index: number;
}

const GameCard = ({
  title,
  image,
  score,
  platform,
  storage,
  engine,
  controller,
  releaseDate,
  index,
}: GameCardProps) => {
  const [hovered, setHovered] = useState(false);

  const scoreColor =
    score >= 85
      ? "text-[hsl(142,71%,45%)]"
      : score >= 70
        ? "text-[hsl(38,92%,50%)]"
        : "text-destructive";

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-card card-surface cursor-pointer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        boxShadow: hovered
          ? "0 0 0 1px rgba(255,255,255,0.15), 0 10px 20px -3px rgba(0,0,0,0.6)"
          : undefined,
      }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Spec-Sheet Overlay */}
        <motion.div
          className="absolute inset-0 flex items-end bg-background/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="grid w-full grid-cols-3 gap-2">
            {[
              { label: "STORAGE", value: storage },
              { label: "ENGINE", value: engine },
              { label: "CONTROLLER", value: controller },
            ].map((spec) => (
              <div key={spec.label}>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {spec.label}
                </span>
                <p className="text-xs font-medium tabular-nums text-foreground">{spec.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <span className={`text-sm font-semibold tabular-nums ${scoreColor}`}>{score}</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{platform}</span>
          <span className="text-border">·</span>
          <span>{releaseDate}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
