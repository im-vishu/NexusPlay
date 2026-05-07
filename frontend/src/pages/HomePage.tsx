import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiSliders } from "react-icons/fi";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import RecentlyViewedGames from "../components/RecentlyViewedGames";
import SortSelector from "../components/SortSelector";

const MotionBox = motion(Box);

const HomePage = () => {
  const [isGenrePanelOpen, setIsGenrePanelOpen] = useState(false);
  const mobileFilters = useDisclosure();

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

      <RecentlyViewedGames />

      <Grid
        templateAreas={{
          base: `"main" "filters"`,
          lg: `"main filters"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: isGenrePanelOpen ? "1fr 220px" : "1fr 54px",
        }}
        gap={{ base: 4, lg: 6 }}
        alignItems="stretch"
      >
        <GridItem area="main">
          <Stack spacing={5}>
            <Flex
              id="discovery-grid"
              className="frosted-panel grid-anchor"
              position="relative"
              zIndex={20}
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
              <Button
                display={{ base: "inline-flex", md: "none" }}
                leftIcon={<FiSliders />}
                onClick={mobileFilters.onOpen}
                borderRadius="full"
                bg="rgba(255, 255, 255, 0.08)"
                color="white"
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                _hover={{ bg: "rgba(255, 255, 255, 0.14)" }}
              >
                Filters
              </Button>
              <HStack spacing={3} flexWrap="wrap" display={{ base: "none", md: "flex" }}>
                <PlatformSelector />
                <SortSelector />
              </HStack>
            </Flex>
            <GameGrid />
          </Stack>
        </GridItem>

        <GridItem
          area="filters"
          id="genre-rail"
          display={{ base: "none", lg: "flex" }}
        >
          <Box
            className="genre-list frosted-panel"
            zIndex={10}
            borderRadius={isGenrePanelOpen ? "18px" : "16px"}
            padding={{ base: 2.5, md: isGenrePanelOpen ? 3.5 : 2 }}
            height={{ base: "auto", lg: isGenrePanelOpen ? "100%" : "fit-content" }}
            width="100%"
            transition="all 0.2s ease"
            position={{ base: "relative", lg: "sticky" }}
            top={{ base: "auto", lg: "92px" }}
          >
            <GenreList
              isOpen={isGenrePanelOpen}
              onToggle={() => setIsGenrePanelOpen((current) => !current)}
            />
          </Box>
        </GridItem>
      </Grid>

      <Drawer
        isOpen={mobileFilters.isOpen}
        placement="bottom"
        onClose={mobileFilters.onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg="rgba(12, 20, 32, 0.98)" color="white" borderTopRadius="20px">
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>
          <DrawerBody paddingBottom={6}>
            <Stack spacing={4}>
              <HStack spacing={3} flexWrap="wrap">
                <PlatformSelector />
                <SortSelector />
              </HStack>
              <GenreList isOpen onToggle={() => undefined} />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default HomePage;
