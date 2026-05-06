import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Trailer } from "../entities/Trailer";
import { FetchResponse } from "../services/api-client";

const useTrailers = (gameId: number) => {
  return useQuery({
    queryKey: ["trailers", gameId],
    queryFn: async () => {
      const response = await axios.get<FetchResponse<Trailer>>(
        `/api/nexusplay/trailers/${gameId}`,
      );
      return response.data;
    },
    enabled: Number.isFinite(gameId),
  });
};

export default useTrailers;
