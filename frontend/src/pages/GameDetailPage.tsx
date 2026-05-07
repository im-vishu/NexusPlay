import {
  Box,
  Button,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import GameDownloads from "../components/GameDownloads";
import GameScreenshots from "../components/GameScreenshots";
import GameTrailer from "../components/GameTrailer";
import ShareButtons from "../components/ShareButtons";
import SimilarGames from "../components/SimilarGames";
import useGame from "../hooks/useGame";
import getCroppedImageUrl from "../services/image-url";
import useGameQueryStore from "../store";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);
  const addRecentlyViewed = useGameQueryStore((s) => s.addRecentlyViewed);
  const toggleFavorite = useGameQueryStore((s) => s.toggleFavorite);
  const isFavorite = useGameQueryStore((s) =>
    game ? s.isFavorite(game.id) : false
  );

  useEffect(() => {
    if (game) addRecentlyViewed(game);
  }, [addRecentlyViewed, game]);

  if (isLoading)
    return (
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 10 }}>
        <Box className="frosted-panel" borderRadius="18px" padding={5}>
          <Skeleton height="220px" borderRadius="16px" marginBottom={5} />
          <Skeleton height="36px" width="70%" marginBottom={4} />
          <SkeletonText noOfLines={5} spacing={3} />
        </Box>
        <Box>
          <Skeleton height="310px" borderRadius="16px" marginBottom={4} />
          <SimpleGrid columns={2} spacing={3}>
            <Skeleton height="150px" borderRadius="14px" />
            <Skeleton height="150px" borderRadius="14px" />
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    );

  if (error) throw error;
  if (!game)
    return (
      <Box padding={6} className="frosted-panel" borderRadius="18px">
        <Heading size="md" marginBottom={2}>
          Game not found
        </Heading>
        <Text color="whiteAlpha.800">
          This game could not be loaded. Try returning to the home page.
        </Text>
      </Box>
    );

  return (
    <Box padding={{ base: 3, md: 5 }} paddingTop={0}>
      <Box
        borderRadius="22px"
        overflow="hidden"
        minHeight={{ base: "260px", md: "360px" }}
        position="relative"
        marginBottom={{ base: 5, lg: 7 }}
        className="frosted-panel"
      >
        <Image
          src={getCroppedImageUrl(game.background_image)}
          alt={game.name}
          width="100%"
          height={{ base: "260px", md: "360px" }}
          objectFit="cover"
        />
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(180deg, rgba(3, 7, 18, 0.08), rgba(3, 7, 18, 0.9))"
        />
        <Box position="absolute" left={{ base: 4, md: 6 }} bottom={{ base: 4, md: 6 }}>
          <Heading size={{ base: "xl", md: "2xl" }}>{game.name}</Heading>
          <HStack marginTop={3} spacing={3} flexWrap="wrap">
            <Button
              leftIcon={<FiHeart fill={isFavorite ? "currentColor" : "none"} />}
              size="sm"
              onClick={() => toggleFavorite(game)}
            >
              {isFavorite ? "Wishlisted" : "Wishlist"}
            </Button>
            <ShareButtons title={game.name} />
          </HStack>
        </Box>
      </Box>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 10 }}>
        <GridItem>
          <Box
            className="frosted-panel"
            borderRadius="18px"
            padding={{ base: 4, md: 5 }}
            position={{ base: "inherit", lg: "sticky" }}
            top={{ base: "auto", lg: "95px" }}
          >
            <ExpandableText>{game.description_raw}</ExpandableText>
            <GameAttributes game={game} />
            <GameDownloads gameId={game.id} />
          </Box>
        </GridItem>
        <GridItem>
          <GameTrailer gameId={game.id} />
          <GameScreenshots gameId={game.id} />
          <SimilarGames game={game} />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default GameDetailPage;
