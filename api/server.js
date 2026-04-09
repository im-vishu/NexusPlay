const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.set("trust proxy", 1);

const apiKey = process.env.GHUB_API_KEY;
const configuredOrigin = process.env.APP_URL;
const API_PREFIX = "/api/nexusplay";
const LEGACY_API_PREFIX = "/api/gamehub";
const REQUEST_TIMEOUT_MS = Number(process.env.REQUEST_TIMEOUT_MS || 8000);
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
const RATE_LIMIT_MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 120);
const demoGenres = [
  {
    id: 4,
    name: "Action",
    image_background:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "RPG",
    image_background:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 15,
    name: "Sports",
    image_background:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 1,
    name: "Racing",
    image_background:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Adventure",
    image_background:
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Shooter",
    image_background:
      "https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 10,
    name: "Strategy",
    image_background:
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Puzzle",
    image_background:
      "https://images.unsplash.com/photo-1553484771-047a44eee27a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 51,
    name: "Indie",
    image_background:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 14,
    name: "Simulation",
    image_background:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 11,
    name: "Arcade",
    image_background:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 83,
    name: "Platformer",
    image_background:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 59,
    name: "Massively Multiplayer",
    image_background:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Fighting",
    image_background:
      "https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 19,
    name: "Family",
    image_background:
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 28,
    name: "Board Games",
    image_background:
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 34,
    name: "Educational",
    image_background:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 17,
    name: "Card",
    image_background:
      "https://images.unsplash.com/photo-1553484771-047a44eee27a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 40,
    name: "Casual",
    image_background:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
  },
];

const demoPlatforms = [
  { id: 1, name: "PC", slug: "pc" },
  { id: 2, name: "PlayStation", slug: "playstation" },
  { id: 3, name: "Xbox", slug: "xbox" },
  { id: 7, name: "Nintendo", slug: "nintendo" },
  { id: 4, name: "iOS", slug: "ios" },
  { id: 8, name: "Android", slug: "android" },
];

const platformById = Object.fromEntries(demoPlatforms.map((p) => [p.id, p]));
const genreById = Object.fromEntries(demoGenres.map((g) => [g.id, g]));

const mediaByGameId = {
  101: {
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1600&q=80",
    ],
    trailer: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  102: {
    screenshots: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=1600&q=80",
    ],
    trailer: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  103: {
    screenshots: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1600&q=80",
    ],
    trailer: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  104: {
    screenshots: [
      "https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1600&q=80",
    ],
    trailer: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  105: {
    screenshots: [
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
    ],
    trailer: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  106: {
    screenshots: [
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1600&q=80",
    ],
    trailer: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
  107: {
    screenshots: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1600&q=80",
    ],
    trailer: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
  108: {
    screenshots: [
      "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
    ],
    trailer: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  109: {
    screenshots: [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80",
    ],
    trailer: "https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  },
  110: {
    screenshots: [
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1553484771-047a44eee27a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1600&q=80",
    ],
    trailer: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  111: {
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80",
    ],
    trailer: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  112: {
    screenshots: [
      "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1600&q=80",
    ],
    trailer: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
};

const buildParentPlatforms = (ids) =>
  ids
    .map((id) => platformById[id])
    .filter(Boolean)
    .map((platform) => ({ platform }));

const buildGenres = (ids) => ids.map((id) => genreById[id]).filter(Boolean);
const fallbackTrailer =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const demoGames = [
  {
    id: 101,
    name: "Elden Ring",
    slug: "elden-ring",
    genres: buildGenres([4, 5]),
    publishers: [{ id: 1, name: "Bandai Namco" }],
    description_raw:
      "A vast action RPG with open-world exploration, deep build variety, and tough boss encounters.",
    background_image: mediaByGameId[101].screenshots[0],
    parent_platforms: buildParentPlatforms([1, 2, 3]),
    metacritic: 95,
    rating_top: 5,
    released: "2022-02-25",
    added: "2025-10-06",
  },
  {
    id: 102,
    name: "The Witcher 3: Wild Hunt",
    slug: "the-witcher-3-wild-hunt",
    genres: buildGenres([5, 3]),
    publishers: [{ id: 2, name: "CD Projekt" }],
    description_raw:
      "A story-rich fantasy RPG with meaningful choices, memorable side quests, and monster contracts.",
    background_image: mediaByGameId[102].screenshots[0],
    parent_platforms: buildParentPlatforms([1, 2, 3, 7]),
    metacritic: 93,
    rating_top: 5,
    released: "2015-05-19",
    added: "2025-10-02",
  },
  {
    id: 103,
    name: "Forza Horizon 5",
    slug: "forza-horizon-5",
    genres: buildGenres([1, 3]),
    publishers: [{ id: 3, name: "Xbox Game Studios" }],
    description_raw:
      "An open-world festival racer in Mexico featuring hundreds of cars and seasonal events.",
    background_image: mediaByGameId[103].screenshots[0],
    parent_platforms: buildParentPlatforms([1, 3]),
    metacritic: 91,
    rating_top: 5,
    released: "2021-11-09",
    added: "2025-10-08",
  },
  {
    id: 104,
    name: "Cyberpunk 2077",
    slug: "cyberpunk-2077",
    genres: buildGenres([4, 5]),
    publishers: [{ id: 2, name: "CD Projekt" }],
    description_raw:
      "A first-person RPG set in Night City with build crafting, branching quests, and cinematic missions.",
    background_image: mediaByGameId[104].screenshots[0],
    parent_platforms: buildParentPlatforms([1, 2, 3]),
    metacritic: 86,
    rating_top: 4,
    released: "2020-12-10",
    added: "2025-09-29",
  },
  {
    id: 105,
    name: "God of War Ragnarok",
    slug: "god-of-war-ragnarok",
    genres: buildGenres([4, 3]),
    publishers: [{ id: 4, name: "Sony Interactive Entertainment" }],
    description_raw:
      "A cinematic action adventure blending mythic storytelling with polished combat systems.",
    background_image: mediaByGameId[105].screenshots[0],
    parent_platforms: buildParentPlatforms([2]),
    metacritic: 94,
    rating_top: 5,
    released: "2022-11-09",
    added: "2025-10-04",
  },
  {
    id: 106,
    name: "EA Sports FC 24",
    slug: "ea-sports-fc-24",
    genres: buildGenres([15]),
    publishers: [{ id: 5, name: "Electronic Arts" }],
    description_raw:
      "Club and career football modes with updated teams, mechanics, and tactical customization.",
    background_image: mediaByGameId[106].screenshots[0],
    parent_platforms: buildParentPlatforms([1, 2, 3]),
    metacritic: 78,
    rating_top: 4,
    released: "2023-09-29",
    added: "2025-09-26",
  },
  {
    id: 107,
    name: "Baldur's Gate 3",
    slug: "baldurs-gate-3",
    genres: buildGenres([5, 10]),
    publishers: [{ id: 6, name: "Larian Studios" }],
    description_raw:
      "A deep tactical RPG with party relationships, turn-based combat, and massive narrative choice.",
    background_image: mediaByGameId[107].screenshots[0],
    parent_platforms: buildParentPlatforms([1, 2]),
    metacritic: 96,
    rating_top: 5,
    released: "2023-08-03",
    added: "2025-10-07",
  },
  {
    id: 108,
    name: "Hades",
    slug: "hades",
    genres: buildGenres([4, 3]),
    publishers: [{ id: 7, name: "Supergiant Games" }],
    description_raw:
      "A high-speed action roguelike with strong progression and excellent voice-acted storytelling.",
    background_image: mediaByGameId[108].screenshots[0],
    parent_platforms: buildParentPlatforms([1, 2, 3, 7]),
    metacritic: 93,
    rating_top: 5,
    released: "2020-09-17",
    added: "2025-09-30",
  },
  {
    id: 109,
    name: "Gran Turismo 7",
    slug: "gran-turismo-7",
    genres: buildGenres([1]),
    publishers: [{ id: 4, name: "Sony Interactive Entertainment" }],
    description_raw:
      "A simulation-focused racing title with extensive car collecting and tuning systems.",
    background_image: mediaByGameId[109].screenshots[0],
    parent_platforms: buildParentPlatforms([2]),
    metacritic: 87,
    rating_top: 4,
    released: "2022-03-04",
    added: "2025-09-25",
  },
  {
    id: 110,
    name: "Portal 2",
    slug: "portal-2",
    genres: buildGenres([7, 3]),
    publishers: [{ id: 8, name: "Valve" }],
    description_raw:
      "A first-person puzzle masterpiece built around portal mechanics, humor, and co-op challenges.",
    background_image: mediaByGameId[110].screenshots[0],
    parent_platforms: buildParentPlatforms([1, 2, 3]),
    metacritic: 95,
    rating_top: 5,
    released: "2011-04-19",
    added: "2025-09-21",
  },
  {
    id: 111,
    name: "Apex Legends",
    slug: "apex-legends",
    genres: buildGenres([2, 4]),
    publishers: [{ id: 5, name: "Electronic Arts" }],
    description_raw:
      "A squad-based battle royale shooter with unique legends, tactical abilities, and fluid movement.",
    background_image: mediaByGameId[111].screenshots[0],
    parent_platforms: buildParentPlatforms([1, 2, 3]),
    metacritic: 88,
    rating_top: 4,
    released: "2019-02-04",
    added: "2025-09-27",
  },
  {
    id: 112,
    name: "Hollow Knight",
    slug: "hollow-knight",
    genres: buildGenres([3, 4]),
    publishers: [{ id: 9, name: "Team Cherry" }],
    description_raw:
      "A hand-crafted metroidvania with precise combat, rich atmosphere, and rewarding exploration.",
    background_image: mediaByGameId[112].screenshots[0],
    parent_platforms: buildParentPlatforms([1, 2, 3, 7]),
    metacritic: 90,
    rating_top: 5,
    released: "2017-02-24",
    added: "2025-10-01",
  },
];

const extraCatalogSeeds = [
  {
    name: "Red Dead Redemption 2",
    slug: "red-dead-redemption-2",
    genreIds: [4, 3],
    platformIds: [1, 2, 3],
    publisher: "Rockstar Games",
    metacritic: 97,
    ratingTop: 5,
    released: "2018-10-26",
    added: "2025-10-10",
    background:
      "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Grand Theft Auto V",
    slug: "grand-theft-auto-v",
    genreIds: [4, 3],
    platformIds: [1, 2, 3],
    publisher: "Rockstar Games",
    metacritic: 96,
    ratingTop: 5,
    released: "2013-09-17",
    added: "2025-10-09",
    background:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Call of Duty: Modern Warfare II",
    slug: "call-of-duty-modern-warfare-ii",
    genreIds: [2, 4],
    platformIds: [1, 2, 3],
    publisher: "Activision",
    metacritic: 79,
    ratingTop: 4,
    released: "2022-10-28",
    added: "2025-10-08",
    background:
      "https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Counter-Strike 2",
    slug: "counter-strike-2",
    genreIds: [2],
    platformIds: [1],
    publisher: "Valve",
    metacritic: 83,
    ratingTop: 4,
    released: "2023-09-27",
    added: "2025-10-08",
    background:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Valorant",
    slug: "valorant",
    genreIds: [2],
    platformIds: [1],
    publisher: "Riot Games",
    metacritic: 82,
    ratingTop: 4,
    released: "2020-06-02",
    added: "2025-10-07",
    background:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Minecraft",
    slug: "minecraft",
    genreIds: [3, 51],
    platformIds: [1, 2, 3, 7, 4, 8],
    publisher: "Mojang",
    metacritic: 93,
    ratingTop: 5,
    released: "2011-11-18",
    added: "2025-10-09",
    background:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Terraria",
    slug: "terraria",
    genreIds: [3, 51],
    platformIds: [1, 2, 3, 7, 4, 8],
    publisher: "Re-Logic",
    metacritic: 83,
    ratingTop: 4,
    released: "2011-05-16",
    added: "2025-10-06",
    background:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Stardew Valley",
    slug: "stardew-valley",
    genreIds: [14, 40],
    platformIds: [1, 2, 3, 7, 4, 8],
    publisher: "ConcernedApe",
    metacritic: 89,
    ratingTop: 5,
    released: "2016-02-26",
    added: "2025-10-06",
    background:
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Civilization VI",
    slug: "civilization-vi",
    genreIds: [10],
    platformIds: [1, 7],
    publisher: "2K",
    metacritic: 88,
    ratingTop: 4,
    released: "2016-10-21",
    added: "2025-10-05",
    background:
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Age of Empires IV",
    slug: "age-of-empires-iv",
    genreIds: [10],
    platformIds: [1],
    publisher: "Xbox Game Studios",
    metacritic: 81,
    ratingTop: 4,
    released: "2021-10-28",
    added: "2025-10-04",
    background:
      "https://images.unsplash.com/photo-1553484771-047a44eee27a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Tekken 8",
    slug: "tekken-8",
    genreIds: [6],
    platformIds: [1, 2, 3],
    publisher: "Bandai Namco",
    metacritic: 90,
    ratingTop: 4,
    released: "2024-01-26",
    added: "2025-10-04",
    background:
      "https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Street Fighter 6",
    slug: "street-fighter-6",
    genreIds: [6],
    platformIds: [1, 2, 3],
    publisher: "Capcom",
    metacritic: 92,
    ratingTop: 5,
    released: "2023-06-02",
    added: "2025-10-03",
    background:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Mario Kart 8 Deluxe",
    slug: "mario-kart-8-deluxe",
    genreIds: [1, 19],
    platformIds: [7],
    publisher: "Nintendo",
    metacritic: 92,
    ratingTop: 5,
    released: "2017-04-28",
    added: "2025-10-03",
    background:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Need for Speed Unbound",
    slug: "need-for-speed-unbound",
    genreIds: [1],
    platformIds: [1, 2, 3],
    publisher: "Electronic Arts",
    metacritic: 77,
    ratingTop: 4,
    released: "2022-12-02",
    added: "2025-10-02",
    background:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Rocket League",
    slug: "rocket-league",
    genreIds: [15, 1],
    platformIds: [1, 2, 3, 7],
    publisher: "Psyonix",
    metacritic: 86,
    ratingTop: 4,
    released: "2015-07-07",
    added: "2025-10-02",
    background:
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "NBA 2K24",
    slug: "nba-2k24",
    genreIds: [15],
    platformIds: [1, 2, 3],
    publisher: "2K",
    metacritic: 74,
    ratingTop: 3,
    released: "2023-09-08",
    added: "2025-10-01",
    background:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "The Sims 4",
    slug: "the-sims-4",
    genreIds: [14, 40],
    platformIds: [1, 2, 3],
    publisher: "Electronic Arts",
    metacritic: 70,
    ratingTop: 4,
    released: "2014-09-02",
    added: "2025-10-01",
    background:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Microsoft Flight Simulator",
    slug: "microsoft-flight-simulator",
    genreIds: [14],
    platformIds: [1, 3],
    publisher: "Xbox Game Studios",
    metacritic: 91,
    ratingTop: 5,
    released: "2020-08-18",
    added: "2025-09-30",
    background:
      "https://images.unsplash.com/photo-1553484771-047a44eee27a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Monument Valley 2",
    slug: "monument-valley-2",
    genreIds: [7, 40],
    platformIds: [4, 8],
    publisher: "ustwo games",
    metacritic: 86,
    ratingTop: 4,
    released: "2017-06-05",
    added: "2025-09-30",
    background:
      "https://images.unsplash.com/photo-1553484771-047a44eee27a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Celeste",
    slug: "celeste",
    genreIds: [83, 51],
    platformIds: [1, 2, 3, 7],
    publisher: "Maddy Makes Games",
    metacritic: 92,
    ratingTop: 5,
    released: "2018-01-25",
    added: "2025-09-29",
    background:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Dead Cells",
    slug: "dead-cells",
    genreIds: [83, 4],
    platformIds: [1, 2, 3, 7, 4, 8],
    publisher: "Motion Twin",
    metacritic: 89,
    ratingTop: 4,
    released: "2018-08-07",
    added: "2025-09-29",
    background:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Warframe",
    slug: "warframe",
    genreIds: [59, 2],
    platformIds: [1, 2, 3, 7],
    publisher: "Digital Extremes",
    metacritic: 81,
    ratingTop: 4,
    released: "2013-03-25",
    added: "2025-09-28",
    background:
      "https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Final Fantasy XIV Online",
    slug: "final-fantasy-xiv-online",
    genreIds: [59, 5],
    platformIds: [1, 2],
    publisher: "Square Enix",
    metacritic: 86,
    ratingTop: 4,
    released: "2013-08-27",
    added: "2025-09-28",
    background:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "It Takes Two",
    slug: "it-takes-two",
    genreIds: [19, 3],
    platformIds: [1, 2, 3],
    publisher: "Electronic Arts",
    metacritic: 88,
    ratingTop: 5,
    released: "2021-03-26",
    added: "2025-09-27",
    background:
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Mario Party Superstars",
    slug: "mario-party-superstars",
    genreIds: [19, 28],
    platformIds: [7],
    publisher: "Nintendo",
    metacritic: 80,
    ratingTop: 4,
    released: "2021-10-29",
    added: "2025-09-27",
    background:
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Slay the Spire",
    slug: "slay-the-spire",
    genreIds: [17, 10],
    platformIds: [1, 2, 3, 7, 4, 8],
    publisher: "Mega Crit",
    metacritic: 89,
    ratingTop: 5,
    released: "2019-01-23",
    added: "2025-09-26",
    background:
      "https://images.unsplash.com/photo-1553484771-047a44eee27a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Marvel Snap",
    slug: "marvel-snap",
    genreIds: [17, 40],
    platformIds: [1, 4, 8],
    publisher: "Second Dinner",
    metacritic: 84,
    ratingTop: 4,
    released: "2022-10-18",
    added: "2025-09-26",
    background:
      "https://images.unsplash.com/photo-1553484771-047a44eee27a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Human Resource Machine",
    slug: "human-resource-machine",
    genreIds: [34, 7],
    platformIds: [1, 4, 8],
    publisher: "Tomorrow Corporation",
    metacritic: 82,
    ratingTop: 4,
    released: "2015-10-15",
    added: "2025-09-25",
    background:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Kerbal Space Program",
    slug: "kerbal-space-program",
    genreIds: [34, 14],
    platformIds: [1],
    publisher: "Private Division",
    metacritic: 88,
    ratingTop: 4,
    released: "2015-04-27",
    added: "2025-09-24",
    background:
      "https://images.unsplash.com/photo-1553484771-047a44eee27a?auto=format&fit=crop&w=1600&q=80",
  },
];

const extraCatalogGames = extraCatalogSeeds.map((seed, index) => ({
  id: 300 + index,
  name: seed.name,
  slug: seed.slug,
  genres: buildGenres(seed.genreIds),
  publishers: [{ id: 200 + index, name: seed.publisher }],
  description_raw: `${seed.name} is included in this expanded demo catalog for richer browsing and filtering.`,
  background_image: seed.background,
  parent_platforms: buildParentPlatforms(seed.platformIds),
  metacritic: seed.metacritic,
  rating_top: seed.ratingTop,
  released: seed.released,
  added: seed.added,
}));
demoGames.push(...extraCatalogGames);

const coveredGenreIds = new Set(
  demoGames.flatMap((game) => game.genres.map((genre) => genre.id))
);
const extraDemoGames = demoGenres
  .filter((genre) => !coveredGenreIds.has(genre.id))
  .map((genre, index) => {
    const id = 200 + index;

    return {
      id,
      name: `${genre.name} Showcase`,
      slug: `${genre.name.toLowerCase().replace(/\s+/g, "-")}-showcase`,
      genres: buildGenres([genre.id]),
      publishers: [{ id: 50 + index, name: "Nexus Studio" }],
      description_raw: `A curated demo title for the ${genre.name.toLowerCase()} category.`,
      background_image: genre.image_background,
      parent_platforms: buildParentPlatforms([1, 2, 3]),
      metacritic: 76 + (index % 10),
      rating_top: 4,
      released: "2024-01-01",
      added: "2025-10-09",
    };
  });
demoGames.push(...extraDemoGames);
const allowedEndpointPatterns = [
  /^\/games$/,
  /^\/games\/[^/]+$/,
  /^\/games\/\d+\/movies$/,
  /^\/games\/\d+\/screenshots$/,
  /^\/genres$/,
  /^\/platforms\/lists\/parents$/,
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  const localhostPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
  if (localhostPattern.test(origin)) return true;

  if (configuredOrigin && origin === configuredOrigin) return true;

  return /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
};

const isAllowedEndpoint = (endpoint = "") =>
  allowedEndpointPatterns.some((pattern) => pattern.test(endpoint));

const getDemoGames = (query = {}) => {
  const search = (query.search || "").toString().toLowerCase().trim();
  const sortOrder = (query.ordering || "").toString();
  const genreId = Number(query.genres);
  const platformId = Number(query.parent_platforms);
  const page = Math.max(Number(query.page || 1), 1);
  const pageSize = 12;

  let results = [...demoGames];

  if (Number.isFinite(genreId) && genreId > 0) {
    results = results.filter((game) =>
      game.genres.some((genre) => genre.id === genreId)
    );
  }

  if (Number.isFinite(platformId) && platformId > 0) {
    results = results.filter((game) =>
      game.parent_platforms.some((entry) => entry.platform.id === platformId)
    );
  }

  if (search) {
    results = results.filter((game) => game.name.toLowerCase().includes(search));
  }

  if (sortOrder === "name") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortOrder === "-metacritic") {
    results.sort((a, b) => b.metacritic - a.metacritic);
  }

  if (sortOrder === "-rating") {
    results.sort((a, b) => b.rating_top - a.rating_top);
  }

  if (sortOrder === "-released") {
    results.sort(
      (a, b) =>
        new Date(b.released || 0).getTime() - new Date(a.released || 0).getTime()
    );
  }

  if (sortOrder === "-added") {
    results.sort(
      (a, b) =>
        new Date(b.added || 0).getTime() - new Date(a.added || 0).getTime()
    );
  }

  const start = (page - 1) * pageSize;
  const paged = results.slice(start, start + pageSize);

  return {
    count: results.length,
    next:
      start + pageSize < results.length
        ? `${API_PREFIX}?page=${page + 1}`
        : null,
    results: paged,
  };
};

const getDemoResponse = (endpoint, query, id) => {
  if (endpoint === "/games") {
    if (id) {
      return demoGames.find((game) => game.slug === id || String(game.id) === id) || null;
    }
    return getDemoGames(query);
  }

  if (/^\/games\/\d+\/movies$/.test(endpoint)) {
    const gameId = Number(endpoint.split("/")[2]);
    const media = mediaByGameId[gameId];
    const fallbackGame = demoGames.find((game) => game.id === gameId);
    const trailer = media?.trailer || fallbackTrailer;
    const preview = media?.screenshots?.[0] || fallbackGame?.background_image;
    if (!preview) return { count: 0, next: null, results: [] };

    return {
      count: 1,
      next: null,
      results: [
        {
          id: gameId * 10,
          name: "Official Trailer",
          preview,
          data: {
            480: trailer,
            max: trailer,
          },
        },
      ],
    };
  }

  if (/^\/games\/\d+\/screenshots$/.test(endpoint)) {
    const gameId = Number(endpoint.split("/")[2]);
    const media = mediaByGameId[gameId];
    const fallbackGame = demoGames.find((game) => game.id === gameId);
    const screenshots = media?.screenshots?.length
      ? media.screenshots
      : fallbackGame?.background_image
        ? [fallbackGame.background_image]
        : [];
    if (!screenshots.length) return { count: 0, next: null, results: [] };

    return {
      count: screenshots.length,
      next: null,
      results: screenshots.map((image, index) => ({
        id: gameId * 100 + index + 1,
        image,
        width: 1600,
        height: 900,
      })),
    };
  }

  if (endpoint === "/genres") {
    return { count: demoGenres.length, next: null, results: demoGenres };
  }

  if (endpoint === "/platforms/lists/parents") {
    return { count: demoPlatforms.length, next: null, results: demoPlatforms };
  }

  return null;
};

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  })
);

const requestLedger = new Map();
const getClientKey = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  const forwardedIp = Array.isArray(forwarded)
    ? forwarded[0]
    : forwarded?.split(",")[0]?.trim();

  return forwardedIp || req.ip || req.socket.remoteAddress || "unknown";
};

const rateLimitMiddleware = (req, res, next) => {
  if (!req.path.startsWith("/api")) {
    next();
    return;
  }

  if (req.path === "/api/health") {
    next();
    return;
  }

  const clientKey = getClientKey(req);
  const now = Date.now();
  const current = requestLedger.get(clientKey);

  if (!current || now - current.windowStart >= RATE_LIMIT_WINDOW_MS) {
    requestLedger.set(clientKey, { windowStart: now, count: 1 });
    res.setHeader("X-RateLimit-Limit", RATE_LIMIT_MAX_REQUESTS);
    res.setHeader("X-RateLimit-Remaining", RATE_LIMIT_MAX_REQUESTS - 1);
    next();
    return;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - current.windowStart)) / 1000
    );
    res.setHeader("Retry-After", retryAfter);
    res.status(429).json({
      error: "Rate limit exceeded. Please try again shortly.",
    });
    return;
  }

  current.count += 1;
  requestLedger.set(clientKey, current);
  res.setHeader("X-RateLimit-Limit", RATE_LIMIT_MAX_REQUESTS);
  res.setHeader("X-RateLimit-Remaining", RATE_LIMIT_MAX_REQUESTS - current.count);
  next();
};

app.use(rateLimitMiddleware);

setInterval(() => {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS * 2;
  for (const [key, value] of requestLedger.entries()) {
    if (value.windowStart < cutoff) {
      requestLedger.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW_MS).unref();

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "nexusplay-api",
    mode: apiKey ? "live" : "demo",
    timestamp: new Date().toISOString(),
  });
});

const instance = axios.create({
  baseURL: "https://api.rawg.io/api",
  timeout: REQUEST_TIMEOUT_MS,
  params: {
    key: apiKey,
  },
});

const getErrorMessage = (err) =>
  err.response?.data?.error ||
  err.response?.data?.detail ||
  err.message ||
  "Unknown server error";

const handleCollectionRequest = async (req, res) => {
  try {
    if (req.path.startsWith(LEGACY_API_PREFIX)) {
      res.setHeader(
        "X-API-Deprecated",
        `Use ${API_PREFIX} instead of ${LEGACY_API_PREFIX}.`
      );
    }

    if (!apiKey) {
      const endpoint = req.headers.endpoint;
      if (!isAllowedEndpoint(endpoint)) {
        return res.status(400).json({ error: "Unsupported RAWG endpoint." });
      }

      const demo = getDemoResponse(endpoint, req.query);
      if (demo) return res.json(demo);

      return res.status(503).json({
        error:
          "Demo mode is active. Set GHUB_API_KEY in .env for live RAWG data.",
      });
    }

    const endpoint = req.headers.endpoint;

    if (!isAllowedEndpoint(endpoint)) {
      return res.status(400).json({ error: "Unsupported RAWG endpoint." });
    }

    const response = await instance.get(endpoint, {
      params: req.query,
    });

    res.json(response.data);
  } catch (err) {
    if (err.code === "ECONNABORTED") {
      res.status(504).json({
        error: "Upstream API timeout. Please retry.",
      });
      return;
    }

    res.status(err.response?.status || 500).json({ error: getErrorMessage(err) });
  }
};

const handleItemRequest = async (req, res) => {
  try {
    if (req.path.startsWith(LEGACY_API_PREFIX)) {
      res.setHeader(
        "X-API-Deprecated",
        `Use ${API_PREFIX} instead of ${LEGACY_API_PREFIX}.`
      );
    }

    if (!apiKey) {
      const endpoint = req.headers.endpoint;
      const fullEndpoint = `${endpoint}/${req.params.id}`;
      if (!isAllowedEndpoint(fullEndpoint)) {
        return res.status(400).json({ error: "Unsupported RAWG endpoint." });
      }

      const demo = getDemoResponse(endpoint, req.query, req.params.id);
      if (demo) return res.json(demo);

      return res.status(503).json({
        error:
          "Demo mode is active. Set GHUB_API_KEY in .env for live RAWG data.",
      });
    }

    const endpoint = req.headers.endpoint;
    const fullEndpoint = `${endpoint}/${req.params.id}`;

    if (!isAllowedEndpoint(fullEndpoint)) {
      return res.status(400).json({ error: "Unsupported RAWG endpoint." });
    }

    const response = await instance.get(fullEndpoint);
    res.json(response.data);
  } catch (err) {
    if (err.code === "ECONNABORTED") {
      res.status(504).json({
        error: "Upstream API timeout. Please retry.",
      });
      return;
    }

    res.status(err.response?.status || 500).json({ error: getErrorMessage(err) });
  }
};

app.get(API_PREFIX, handleCollectionRequest);
app.get(`${API_PREFIX}/:id`, handleItemRequest);
app.get(LEGACY_API_PREFIX, handleCollectionRequest);
app.get(`${LEGACY_API_PREFIX}/:id`, handleItemRequest);

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3030;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
