import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GameDownloadResponse } from "../entities/Download";

const useDownloads = (gameId: number) =>
  useQuery({
    queryKey: ["downloads", gameId],
    queryFn: async () => {
      const response = await axios.get<GameDownloadResponse>(
        `/api/nexusplay/downloads/${gameId}`,
      );
      return response.data;
    },
    enabled: Number.isFinite(gameId),
  });

export default useDownloads;
