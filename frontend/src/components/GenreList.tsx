import {
  Button,
  Collapse,
  Heading,
  HStack,
  IconButton,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import useGameQueryStore from "../store";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

const GenreList = ({ isOpen, onToggle }: Props) => {
  const { data, isLoading, error } = useGenres();
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId);

  if (error) return null;

  if (isLoading) return <Spinner />;

  if (!isOpen)
    return (
      <VStack spacing={3}>
        <Tooltip label="Show genres" placement="left">
          <IconButton
            aria-label="Show genres"
            icon={<BsChevronLeft />}
            borderRadius="12px"
            bg="rgba(255, 255, 255, 0.08)"
            color="white"
            borderWidth="1px"
            borderColor="whiteAlpha.200"
            onClick={onToggle}
            _hover={{ bg: "rgba(255, 255, 255, 0.14)" }}
          />
        </Tooltip>
        <Text
          color="whiteAlpha.700"
          fontSize="xs"
          fontWeight="bold"
          sx={{ writingMode: "vertical-rl" }}
        >
          Genres
        </Text>
      </VStack>
    );

  return (
    <>
      <Button
        width="100%"
        rightIcon={
          isOpen ? <BsChevronRight /> : <BsChevronDown
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
        }
        bg="rgba(255, 255, 255, 0.08)"
        color="white"
        borderWidth="1px"
        borderColor="whiteAlpha.200"
        borderRadius="12px"
        justifyContent="space-between"
        onClick={onToggle}
        _hover={{ bg: "rgba(255, 255, 255, 0.14)" }}
      >
        <HStack spacing={2}>
          <Heading fontSize="sm">Genres</Heading>
          {isOpen && (
            <Text color="whiteAlpha.600" fontSize="xs">
              Filters
            </Text>
          )}
        </HStack>
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <List spacing={1.5} marginTop={3}>
          {data?.results.map((genre) => (
            <ListItem key={genre.id}>
              <HStack
                spacing={2}
                padding={1.5}
                borderRadius="10px"
                bg={
                  genre.id === selectedGenreId
                    ? "rgba(59, 130, 246, 0.2)"
                    : "rgba(255, 255, 255, 0.075)"
                }
                borderWidth="1px"
                borderColor={
                  genre.id === selectedGenreId
                    ? "rgba(96, 165, 250, 0.46)"
                    : "rgba(255, 255, 255, 0.1)"
                }
                transition="all 0.2s ease"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.11)",
                  borderColor: "rgba(96, 165, 250, 0.35)",
                }}
              >
                <Image
                  objectFit="cover"
                  boxSize="28px"
                  borderRadius={8}
                  src={getCroppedImageUrl(genre.image_background)}
                />
                <Button
                  whiteSpace="normal"
                  textAlign="left"
                  fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
                  onClick={() => setSelectedGenreId(genre.id)}
                  fontSize="xs"
                  variant="link"
                  color={genre.id === selectedGenreId ? "white" : "whiteAlpha.900"}
                >
                  {genre.name}
                </Button>
              </HStack>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default GenreList;
