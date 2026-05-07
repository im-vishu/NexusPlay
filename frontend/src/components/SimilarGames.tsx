import { Box, Button, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import CriticScore from "./CriticScore";
import Game from "../entities/Game";
import { GameDownloadResponse } from "../entities/Download";
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
  const { data: downloadResponses } = useQuery({
    queryKey: ["similar-game-downloads", similarGames.map((item) => item.id)],
    queryFn: async () => {
      const responses = await Promise.all(
        similarGames.map((similarGame) =>
          axios
            .get<GameDownloadResponse>(`/api/nexusplay/downloads/${similarGame.id}`)
            .then((response) => [similarGame.id, response.data] as const)
        )
      );

      return Object.fromEntries(responses);
    },
    enabled: similarGames.length > 0,
  });

  if (similarGames.length === 0) return null;

  const getOfficialLinksUrl = (similarGame: Game) =>
    downloadResponses?.[similarGame.id]?.downloads[0]?.url ||
    `/api/nexusplay/downloads/${similarGame.id}`;

  return (
    <Box className="frosted-panel" borderRadius="16px" padding={4} marginTop={4}>
      <Text fontWeight="bold" marginBottom={3}>
        Similar Games
      </Text>
      <HStack spacing={3} overflowX="auto" paddingBottom={1}>
        {similarGames.map((similarGame) => (
          <Box
            key={similarGame.id}
            minWidth="190px"
            borderRadius="12px"
            overflow="hidden"
            bg="whiteAlpha.100"
            borderWidth="1px"
            borderColor="whiteAlpha.200"
          >
            <Box as={Link} to={`/games/${similarGame.slug}`}>
              <Image
                src={getCroppedImageUrl(similarGame.background_image)}
                alt={similarGame.name}
                height="96px"
                width="100%"
                objectFit="cover"
                onError={(event) => {
                  event.currentTarget.src = noImage;
                }}
              />
            </Box>
            <Stack spacing={2} padding={3}>
              <HStack justifyContent="space-between" alignItems="start">
                <Text
                  as={Link}
                  to={`/games/${similarGame.slug}`}
                  fontSize="sm"
                  fontWeight="bold"
                  noOfLines={2}
                >
                  {similarGame.name}
                </Text>
                <CriticScore score={similarGame.metacritic} />
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontSize="xs" color="whiteAlpha.700">
                  Rating {similarGame.rating_top || "N/A"}/5
                </Text>
                <Button
                  as="a"
                  href={getOfficialLinksUrl(similarGame)}
                  target="_blank"
                  rel="noreferrer"
                  size="xs"
                  rightIcon={<FiExternalLink />}
                >
                  Links
                </Button>
              </HStack>
            </Stack>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default SimilarGames;
