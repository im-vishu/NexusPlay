import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useGameQueryStore from "../store";
import getCroppedImageUrl from "../services/image-url";
import noImage from "../assets/Image Placeholder/no-image-placeholder-6f3882e0.webp";

const RecentlyViewedGames = () => {
  const recentlyViewedGames = useGameQueryStore((s) => s.recentlyViewedGames);

  if (recentlyViewedGames.length === 0) return null;

  return (
    <Box className="frosted-panel" borderRadius="16px" padding={3}>
      <Text fontWeight="bold" marginBottom={3}>
        Recently Viewed
      </Text>
      <HStack spacing={3} overflowX="auto" paddingBottom={1}>
        {recentlyViewedGames.map((game) => (
          <Box
            key={game.id}
            as={Link}
            to={`/games/${game.slug}`}
            minWidth="150px"
            borderRadius="12px"
            overflow="hidden"
            bg="whiteAlpha.100"
          >
            <Image
              src={getCroppedImageUrl(game.background_image)}
              alt={game.name}
              height="78px"
              width="100%"
              objectFit="cover"
              onError={(event) => {
                event.currentTarget.src = noImage;
              }}
            />
            <Text fontSize="xs" fontWeight="bold" padding={2} noOfLines={1}>
              {game.name}
            </Text>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default RecentlyViewedGames;
