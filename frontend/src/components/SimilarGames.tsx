import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Game from "../entities/Game";
import { FetchResponse } from "../services/api-client";
import getCroppedImageUrl from "../services/image-url";
import noImage from "../assets/Image Placeholder/no-image-placeholder-6f3882e0.webp";

interface Props {
  game: Game;
}

const SimilarGames = ({ game }: Props) => {
  const genreId = game.genres?.[0]?.id;
  const { data } = useQuery({
    queryKey: ["similar-games", game.id, genreId],
    queryFn: async () => {
      const response = await axios.get<FetchResponse<Game>>("/api/nexusplay", {
        headers: { endpoint: "/games" },
        params: { genres: genreId, page: 1 },
      });
      return response.data;
    },
    enabled: Boolean(genreId),
  });

  const similarGames =
    data?.results.filter((candidate) => candidate.id !== game.id).slice(0, 6) || [];

  if (similarGames.length === 0) return null;

  return (
    <Box className="frosted-panel" borderRadius="16px" padding={4} marginTop={4}>
      <Text fontWeight="bold" marginBottom={3}>
        Similar Games
      </Text>
      <HStack spacing={3} overflowX="auto" paddingBottom={1}>
        {similarGames.map((similarGame) => (
          <Box
            key={similarGame.id}
            as={Link}
            to={`/games/${similarGame.slug}`}
            minWidth="150px"
            borderRadius="12px"
            overflow="hidden"
            bg="whiteAlpha.100"
          >
            <Image
              src={getCroppedImageUrl(similarGame.background_image)}
              alt={similarGame.name}
              height="78px"
              width="100%"
              objectFit="cover"
              onError={(event) => {
                event.currentTarget.src = noImage;
              }}
            />
            <Text fontSize="xs" fontWeight="bold" padding={2} noOfLines={1}>
              {similarGame.name}
            </Text>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default SimilarGames;
