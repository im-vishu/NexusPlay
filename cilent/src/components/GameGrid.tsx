import GameCard from "./GameCard";
import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";
import game4 from "@/assets/game-4.jpg";
import game5 from "@/assets/game-5.jpg";
import game6 from "@/assets/game-6.jpg";
import game7 from "@/assets/game-7.jpg";
import game8 from "@/assets/game-8.jpg";

const games = [
  { title: "Dragon's Reign", image: game1, score: 92, platform: "PC · PS5", storage: "45.1GB", engine: "Unreal 5", controller: "Full", releaseDate: "Feb 14, 2026" },
  { title: "Neon Velocity", image: game2, score: 88, platform: "PC · Xbox", storage: "32.7GB", engine: "Unity 6", controller: "Partial", releaseDate: "Jan 22, 2026" },
  { title: "The Last Garden", image: game3, score: 95, platform: "All Platforms", storage: "24.3GB", engine: "Decima", controller: "Full", releaseDate: "Mar 5, 2026" },
  { title: "Abyssal Depths", image: game4, score: 81, platform: "PC · PS5", storage: "38.9GB", engine: "CryEngine", controller: "Full", releaseDate: "Apr 12, 2026" },
  { title: "Starfront Assault", image: game5, score: 77, platform: "PC", storage: "52.4GB", engine: "Unreal 5", controller: "None", releaseDate: "May 1, 2026" },
  { title: "Blade of the Shogun", image: game6, score: 91, platform: "PC · PS5 · Xbox", storage: "41.0GB", engine: "RE Engine", controller: "Full", releaseDate: "Mar 18, 2026" },
  { title: "Protocol Zero", image: game7, score: 85, platform: "PC · Xbox", storage: "29.5GB", engine: "Glacier 3", controller: "Full", releaseDate: "Jun 8, 2026" },
  { title: "Iron Colossus", image: game8, score: 73, platform: "PC · PS5", storage: "56.8GB", engine: "Unreal 5", controller: "Full", releaseDate: "Jul 20, 2026" },
];

const GameGrid = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Trending Games</h2>
          <p className="mt-1 text-sm text-muted-foreground">Top rated and most tracked this week</p>
        </div>
        <div className="flex gap-1">
          {["All", "PC", "PS5", "Xbox"].map((filter) => (
            <button
              key={filter}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === "All"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {games.map((game, i) => (
          <GameCard key={game.title} {...game} index={i} />
        ))}
      </div>
    </section>
  );
};

export default GameGrid;
