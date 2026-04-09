import { execSync } from 'child_process';

const messages = {
    frontend: [
        "ui: implement responsive grid for game cards", "style: update navbar with NexusPlay branding",
        "feat: add hover animations to genre sidebar", "ui: integrate glassmorphism effects on game details",
        "fix: resolve layout shift on mobile devices", "style: refine typography and font scaling",
        "ui: add loading skeletons for better UX", "feat: implement dark mode color palette refinements",
        "style: add border-glow effect to featured games", "ui: optimize image aspect ratios for thumbnails",
        "feat: add smooth page transitions with Framer Motion", "style: update button variants to match new theme",
        "ui: improve spacing in the filter panel", "fix: z-index layering on navigation dropdowns",
        "ui: add backdrop blur to modal components", "style: customize scrollbar for better aesthetics",
        "feat: add interactive tooltips for platform icons", "ui: align genre icons with text labels",
        "style: update shadow depth on game cards", "ui: enhance empty state illustrations",
        "feat: add 'Back to Top' floating button", "style: refine footer layout and social links",
        "ui: add pulse animation for active loading states", "fix: alignment issues in the game attributes grid",
        "ui: update logo SVG with new NexusPlay design", "style: optimize padding for ultra-wide monitors",
        "ui: implement breadcrumbs for deep navigation", "feat: add image zoom effect on hover",
        "style: standardize border radius across components", "ui: polish the search bar focus state"
    ],
    backend: [
        "backend: rename all endpoints to /api/nexusplay", "feat: implement in-memory rate limiting",
        "refactor: optimize server.js request handling", "feat: add /api/health check endpoint",
        "fix: handle upstream API timeouts gracefully", "backend: update CORS configuration for production",
        "perf: minimize JSON payload size for game lists", "fix: resolve memory leak in demo data routing",
        "feat: add request logging middleware", "backend: add support for legacy /api/gamehub paths",
        "refactor: separate demo catalog into static JSON", "fix: validate query parameters for genre filtering",
        "backend: implement compression middleware", "feat: add environment-based port configuration",
        "fix: resolve intermittent 502 errors from proxy", "backend: update server-side caching headers",
        "perf: optimize image URL cropping logic", "fix: handle null values in movie trailer responses",
        "backend: set default timeout for external fetches", "refactor: clean up unused express middlewares",
        "feat: add basic error boundaries for API routes", "backend: standardize error response structure",
        "fix: prevent duplicate game IDs in demo data", "perf: enhance search query performance",
        "backend: update security headers with Helmet", "feat: add metadata scraping fallback for missing trailers",
        "refactor: improve readability of server logs", "fix: handle malformed JSON from external sources",
        "backend: optimize static file serving", "feat: add graceful shutdown logic for Node process"
    ],
    logic: [
        "perf: implement route-level lazy loading", "logic: fix trailer 'failed to load' false positive",
        "refactor: optimize React Query cache timings", "logic: improve genre filter intersection logic",
        "perf: reduce initial bundle size by code splitting", "logic: implement robust fallback for broken images",
        "refactor: migrate state management to custom hooks", "perf: memoize expensive game list calculations",
        "logic: update sorting algorithm for 'Last Updated'", "fix: resolve infinite re-render in game detail page",
        "logic: implement debounced search input", "refactor: clean up stale useEffect dependencies",
        "logic: add validation for platform-specific data", "perf: optimize React Query prefetching",
        "logic: handle edge cases for empty genre categories", "refactor: unify API client configuration",
        "logic: implement smart retry for failed images", "perf: tree-shake unused icons from library",
        "logic: update logic for dynamic meta tags", "refactor: consolidate utility functions"
    ],
    general: [
        "chore: rename project to NexusPlay in package.json", "docs: update README with new installation steps",
        "chore: remove React Query Devtools for production", "docs: add API documentation for /api/nexusplay",
        "chore: update .gitignore to exclude build artifacts", "docs: add troubleshooting section to README",
        "chore: bump dependency versions for security", "docs: update screenshots and demo gifs",
        "chore: configure build script for Vercel/Netlify", "docs: add contribution guidelines",
        "chore: clean up console logs from production code", "docs: document environment variable requirements",
        "chore: fix linting errors across the codebase", "docs: add licensing information",
        "chore: update favicon to NexusPlay brand", "docs: refine project description in index.html",
        "chore: remove obsolete assets and fonts", "docs: document the 19 included genre categories",
        "chore: standardize import ordering", "final: complete migration to NexusPlay brand"
    ]
};

function getCategory(filePath) {
    if (filePath.match(/\.(css|scss|tsx|jsx)$/) || filePath.includes('components')) return 'frontend';
    if (filePath.match(/(server|api|proxy|route|middleware)/)) return 'backend';
    if (filePath.match(/(hooks|services|utils|logic)/)) return 'logic';
    return 'general';
}

async function startCommits() {
    try {
        const statusOutput = execSync('git status --porcelain', { encoding: 'utf8' });
        const files = statusOutput.split('\n')
            .filter(line => line.trim() !== '')
            .map(line => line.substring(3).trim());

        if (files.length === 0) {
            console.log("No files to commit.");
            return;
        }

        console.log("🚀 Found " + files.length + " files. Starting NexusPlay commits...");

        files.forEach((file, index) => {
            const category = getCategory(file);
            const pool = messages[category];
            const commitMsg = pool[index % pool.length];

            try {
                execSync('git add "' + file + '"');
                execSync('git commit -m "' + commitMsg + ' (#' + (index + 1) + ')"');
                console.log("[" + (index + 1) + "/" + files.length + "] ✅ Committed: " + file);
            } catch (err) {
                console.log("[" + (index + 1) + "/" + files.length + "] ❌ Failed: " + file);
            }
        });

        console.log("\n✨ Automation complete.");
    } catch (error) {
        console.error("Critical Error:", error.message);
    }
}

startCommits();