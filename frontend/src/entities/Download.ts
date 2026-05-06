export interface GameDownload {
  id: number;
  url: string;
  note: string;
  website: {
    id: number;
    name: string;
    slug: string;
    domain: string;
  };
  store?: {
    id: number;
    name: string;
    slug: string;
    domain: string;
  };
}

export interface GameDownloadResponse {
  game: {
    id: number;
    name: string;
    slug: string;
  };
  downloads: GameDownload[];
}
