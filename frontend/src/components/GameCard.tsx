import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMaximize2, FiX } from "react-icons/fi";
import Game from "../entities/Game";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/image-url";
import Emoji from "./Emoji";
import { Link } from "react-router-dom";
import noImage from "../assets/Image Placeholder/no-image-placeholder-6f3882e0.webp";

interface Props {
  game: Game;
}

const MotionBox = motion(Box);

const GameCard = ({ game }: Props) => {
  const bg = useColorModeValue("rgba(248, 250, 252, 0.96)", "rgba(15, 24, 36, 0.78)");
  const [imageSrc, setImageSrc] = useState(getCroppedImageUrl(game.background_image));
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <>
      <MotionBox
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Card
          bg={bg}
          overflow="hidden"
          borderRadius="20px"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          boxShadow="0 12px 26px rgba(0, 0, 0, 0.18)"
        >
          <Box position="relative">
            <Link to={"/games/" + game.slug}>
              <Image
                src={imageSrc}
                alt={game.name}
                width="100%"
                height="190px"
                objectFit="cover"
                onError={() => setImageSrc(noImage)}
              />
            </Link>
            <IconButton
              aria-label={`View ${game.name} image fullscreen`}
              icon={<FiMaximize2 />}
              position="absolute"
              top={3}
              right={3}
              size="sm"
              borderRadius="full"
              color="white"
              bg="blackAlpha.600"
              _hover={{ bg: "blackAlpha.800" }}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsImageOpen(true);
              }}
            />
          </Box>
          <Link to={"/games/" + game.slug}>
            <CardBody padding={4}>
              <Stack spacing={3}>
                <HStack justifyContent="space-between" alignItems="center">
                  <PlatformIconList
                    platform={game.parent_platforms?.map((p) => p.platform)}
                  />
                  <CriticScore score={game.metacritic} />
                </HStack>
                <Heading fontSize="xl" noOfLines={1}>
                  {game.name}
                </Heading>
                <HStack justifyContent="space-between">
                  <Emoji rating={game.rating_top} />
                </HStack>
              </Stack>
            </CardBody>
          </Link>
        </Card>
      </MotionBox>

      <Modal isOpen={isImageOpen} onClose={() => setIsImageOpen(false)} size="full">
        <ModalOverlay bg="rgba(3, 7, 18, 0.92)" backdropFilter="blur(10px)" />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalBody
            padding={{ base: 3, md: 6 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            position="relative"
          >
            <IconButton
              aria-label="Close image"
              icon={<FiX />}
              position="fixed"
              top={{ base: 4, md: 6 }}
              right={{ base: 4, md: 6 }}
              zIndex={2}
              borderRadius="full"
              color="white"
              bg="whiteAlpha.200"
              _hover={{ bg: "whiteAlpha.300" }}
              onClick={() => setIsImageOpen(false)}
            />
            <Image
              src={imageSrc}
              alt={`${game.name} fullscreen`}
              maxWidth="100%"
              maxHeight="92vh"
              objectFit="contain"
              borderRadius={{ base: "10px", md: "16px" }}
              onError={() => setImageSrc(noImage)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameCard;
