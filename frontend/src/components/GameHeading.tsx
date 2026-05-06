import { Heading, Text, VStack } from "@chakra-ui/react";
import usePlatform from "../hooks/usePlatform";
import useGenre from "../hooks/useGenre";
import useGameQueryStore from "../store";

const GameHeading = () => {
  const genreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const genre = useGenre(genreId);

  const platformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const platform = usePlatform(platformId);

  const heading = `${platform?.name || ""} ${genre?.name || ""} Games`;
  return (
    <VStack align="start" spacing={2}>
      <Text
        color="blue.200"
        fontSize="sm"
        textTransform="uppercase"
        letterSpacing="0.12em"
        fontWeight="600"
      >
        Discovery
      </Text>
      <Heading
        fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}
        as="h1"
        lineHeight={1.05}
        maxW="12ch"
      >
        {heading}
      </Heading>
      <Text color="whiteAlpha.800" maxW="2xl" fontSize={{ base: "sm", md: "md" }}>
        Browse top games by genre and platform with quick access to trailers and
        screenshots.
      </Text>
    </VStack>
  );
};

export default GameHeading;
