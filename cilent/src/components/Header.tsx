import { Search, Bell, User, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <motion.a
            href="/"
            className="flex items-center gap-2 text-foreground"
            whileHover={{ scale: 1.02 }}
          >
            <Gamepad2 className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold tracking-tight">NEXUS</span>
          </motion.a>

          <nav className="hidden items-center gap-6 md:flex">
            {["Discover", "News", "Library", "Calendar"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted">
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search games...</span>
            <kbd className="ml-2 hidden rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
              ⌘K
            </kbd>
          </button>
          <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>
          <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
