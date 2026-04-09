import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import useScreenshots from "../hooks/useScreenshots";
import noImage from "../assets/Image Placeholder/no-image-placeholder-6f3882e0.webp";

interface Props {
  gameId: number;
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data, isLoading, error } = useScreenshots(gameId);

  if (isLoading) return null;

  if (error)
    return (
      <Box className="frosted-panel" borderRadius="16px" padding={4} marginTop={3}>
        <Text color="whiteAlpha.800">Screenshots are unavailable for this game.</Text>
      </Box>
    );

  const screenshots = data?.results || [];

  if (screenshots.length === 0)
    return (
      <Box className="frosted-panel" borderRadius="16px" padding={4} marginTop={3}>
        <Text color="whiteAlpha.800">No screenshots available.</Text>
      </Box>
    );

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} marginTop={3}>
      {screenshots.map((file) => (
        <Image
          key={file.id}
          src={file.image}
          alt="Game screenshot"
          borderRadius="14px"
          objectFit="cover"
          height={{ base: "180px", md: "170px", xl: "190px" }}
          onError={(event) => {
            event.currentTarget.src = noImage;
          }}
        />
      ))}
    </SimpleGrid>
  );
};

export default GameScreenshots;
