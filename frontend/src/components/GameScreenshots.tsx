import {
  Box,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import useScreenshots from "../hooks/useScreenshots";
import noImage from "../assets/Image Placeholder/no-image-placeholder-6f3882e0.webp";

interface Props {
  gameId: number;
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data, isLoading, error } = useScreenshots(gameId);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (isLoading) return null;

  if (error)
    return (
      <Box className="frosted-panel" borderRadius="16px" padding={4} marginTop={3}>
        <Text color="whiteAlpha.800">Screenshots are unavailable for this game.</Text>
      </Box>
    );

  const screenshots = data?.results || [];
  const activeImage =
    activeIndex === null ? null : screenshots[activeIndex]?.image || null;
  const showImageControls = screenshots.length > 1;

  const showPreviousImage = () => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === 0 ? screenshots.length - 1 : current - 1;
    });
  };

  const showNextImage = () => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === screenshots.length - 1 ? 0 : current + 1;
    });
  };

  if (screenshots.length === 0)
    return (
      <Box className="frosted-panel" borderRadius="16px" padding={4} marginTop={3}>
        <Text color="whiteAlpha.800">No screenshots available.</Text>
      </Box>
    );

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} marginTop={3}>
        {screenshots.map((file, index) => (
          <Image
            key={file.id}
            src={file.image}
            alt="Game screenshot"
            borderRadius="14px"
            objectFit="cover"
            height={{ base: "180px", md: "170px", xl: "190px" }}
            cursor="zoom-in"
            transition="transform 0.18s ease, filter 0.18s ease"
            _hover={{ transform: "scale(1.015)", filter: "brightness(1.08)" }}
            onClick={() => setActiveIndex(index)}
            onError={(event) => {
              event.currentTarget.src = noImage;
            }}
          />
        ))}
      </SimpleGrid>

      <Modal
        isOpen={!!activeImage}
        onClose={() => setActiveIndex(null)}
        size="full"
        isCentered
      >
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
              onClick={() => setActiveIndex(null)}
            />
            {showImageControls && (
              <>
                <IconButton
                  aria-label="Previous screenshot"
                  icon={<FiChevronLeft />}
                  position="fixed"
                  left={{ base: 3, md: 6 }}
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex={2}
                  borderRadius="full"
                  color="white"
                  bg="whiteAlpha.200"
                  _hover={{ bg: "whiteAlpha.300" }}
                  onClick={showPreviousImage}
                />
                <IconButton
                  aria-label="Next screenshot"
                  icon={<FiChevronRight />}
                  position="fixed"
                  right={{ base: 3, md: 6 }}
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex={2}
                  borderRadius="full"
                  color="white"
                  bg="whiteAlpha.200"
                  _hover={{ bg: "whiteAlpha.300" }}
                  onClick={showNextImage}
                />
              </>
            )}
            {activeImage && (
              <Image
                src={activeImage}
                alt="Game screenshot fullscreen"
                maxWidth="100%"
                maxHeight="92vh"
                objectFit="contain"
                borderRadius={{ base: "10px", md: "16px" }}
                onError={(event) => {
                  event.currentTarget.src = noImage;
                }}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameScreenshots;
