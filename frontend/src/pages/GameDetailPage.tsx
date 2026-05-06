import {
  Box,
  GridItem,
  Heading,
  Text,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import GameDownloads from "../components/GameDownloads";
import GameScreenshots from "../components/GameScreenshots";
import GameTrailer from "../components/GameTrailer";
import useGame from "../hooks/useGame";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);

  if (isLoading) return <Spinner />;

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
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 6, lg: 10 }}
      margin="auto"
      padding={{ base: 3, md: 5 }}
      paddingTop={0}
    >
      <GridItem>
        <Box
          className="frosted-panel"
          borderRadius="18px"
          padding={{ base: 4, md: 5 }}
          position={{ base: "inherit", lg: "sticky" }}
          top={{ base: "auto", lg: "95px" }}
        >
          <Heading marginBottom={3}>{game.name}</Heading>
          <ExpandableText>{game.description_raw}</ExpandableText>
          <GameAttributes game={game} />
          <GameDownloads gameId={game.id} />
        </Box>
      </GridItem>
      <GridItem>
        <GameTrailer gameId={game.id} />
        <GameScreenshots gameId={game.id} />
      </GridItem>
    </SimpleGrid>
  );
};

export default GameDetailPage;
