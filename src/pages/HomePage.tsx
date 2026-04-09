import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";

const MotionBox = motion(Box);

const HomePage = () => {
  return (
    <Stack spacing={{ base: 6, lg: 8 }} paddingTop={{ base: 1, md: 2 }}>
      <Grid
        templateColumns={{ base: "1fr", lg: "1.6fr 1fr" }}
        gap={{ base: 4, lg: 6 }}
        alignItems="stretch"
      >
        <MotionBox
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="frosted-panel"
          borderRadius={{ base: "20px", md: "24px" }}
          padding={{ base: 5, md: 7 }}
        >
          <VStack align="start" spacing={4}>
            <GameHeading />
            <Text color="whiteAlpha.700" maxW="2xl">
              Browse games with useful filters, responsive cards, and quick
              access to gameplay media.
            </Text>
          </VStack>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="frosted-panel"
          borderRadius={{ base: "20px", md: "24px" }}
          padding={{ base: 5, md: 6 }}
        >
          <VStack align="start" spacing={3}>
            <Text fontSize="sm" color="blue.200" textTransform="uppercase" letterSpacing="0.08em">
              Quick Tips
            </Text>
            <Text color="whiteAlpha.900">Use search to narrow large results quickly.</Text>
            <Text color="whiteAlpha.900">Change platform and sort for a better shortlist.</Text>
            <Text color="whiteAlpha.900">Open any card for full details and media.</Text>
          </VStack>
        </MotionBox>
      </Grid>

      <Grid
        templateAreas={{
          base: `"main" "filters"`,
          lg: `"main filters"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "1fr 280px",
        }}
        gap={{ base: 4, lg: 6 }}
        alignItems="stretch"
      >
        <GridItem area="main">
          <Stack spacing={5}>
            <Flex
              id="discovery-grid"
              className="frosted-panel grid-anchor"
              borderRadius="18px"
              padding={{ base: 3.5, md: 4 }}
              justifyContent="space-between"
              alignItems={{ base: "start", md: "center" }}
              gap={4}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Text
                color="whiteAlpha.800"
                fontSize={{ base: "sm", md: "md" }}
                maxW="520px"
              >
                Filter and sort your discovery feed.
              </Text>
              <HStack spacing={3} flexWrap="wrap">
                <PlatformSelector />
                <SortSelector />
              </HStack>
            </Flex>
            <GameGrid />
          </Stack>
        </GridItem>

        <GridItem area="filters" id="genre-rail" display="flex">
          <Box
            className="genre-list frosted-panel"
            borderRadius="18px"
            padding={{ base: 4, md: 5 }}
            height={{ base: "auto", lg: "100%" }}
            width="100%"
          >
            <GenreList />
          </Box>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default HomePage;
