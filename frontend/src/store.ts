import { create } from "zustand";
import Game from "./entities/Game";

interface GameQuery {
  genreId?: number;
  platformId?: number;
  sortOrder?: string;
  searchText?: string;
}

interface GameQueryStore {
  gameQuery: GameQuery;
  favoriteGames: Game[];
  recentlyViewedGames: Game[];
  setSearchText: (searchText: string) => void;
  setGenreId: (genreId: number) => void;
  setPlatformId: (platforId: number) => void;
  setSordOrder: (sortOrder: string) => void;
  toggleFavorite: (game: Game) => void;
  isFavorite: (gameId: number) => boolean;
  addRecentlyViewed: (game: Game) => void;
}

const readStoredGames = (key: string) => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(window.localStorage.getItem(key) || "[]") as Game[];
  } catch {
    return [];
  }
};

const writeStoredGames = (key: string, games: Game[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(games));
};

const useGameQueryStore = create<GameQueryStore>()((set, get) => ({
  gameQuery: {},
  favoriteGames: readStoredGames("nexusplay:favorites"),
  recentlyViewedGames: readStoredGames("nexusplay:recently-viewed"),
  setSearchText: (searchText) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, searchText } })),
  setGenreId: (genreId) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, genreId } })),
  setPlatformId: (platformId) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, platformId } })),
  setSordOrder: (sortOrder) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, sortOrder } })),
  toggleFavorite: (game) =>
    set((store) => {
      const exists = store.favoriteGames.some((item) => item.id === game.id);
      const favoriteGames = exists
        ? store.favoriteGames.filter((item) => item.id !== game.id)
        : [game, ...store.favoriteGames].slice(0, 24);

      writeStoredGames("nexusplay:favorites", favoriteGames);
      return { favoriteGames };
    }),
  isFavorite: (gameId) =>
    get().favoriteGames.some((game) => game.id === gameId),
  addRecentlyViewed: (game) =>
    set((store) => {
      const recentlyViewedGames = [
        game,
        ...store.recentlyViewedGames.filter((item) => item.id !== game.id),
      ].slice(0, 8);

      writeStoredGames("nexusplay:recently-viewed", recentlyViewedGames);
      return { recentlyViewedGames };
    }),
}));

export default useGameQueryStore;
