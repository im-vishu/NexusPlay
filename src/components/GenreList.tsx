import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import useGameQueryStore from "../store";

const GenreList = () => {
  const { data, isLoading, error } = useGenres();
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId);

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Text
        color="blue.200"
        textTransform="uppercase"
        letterSpacing="0.12em"
        fontSize="xs"
        marginBottom={2}
      >
        Filters
      </Text>
      <Heading fontSize="xl" marginBottom={4}>
        Genres
      </Heading>
      <List spacing={2}>
        {data?.results.map((genre) => (
          <ListItem key={genre.id}>
            <HStack
              spacing={3}
              padding={2.5}
              borderRadius="14px"
              bg={
                genre.id === selectedGenreId
                  ? "rgba(59, 130, 246, 0.2)"
                  : "rgba(255, 255, 255, 0.04)"
              }
              borderWidth="1px"
              borderColor={
                genre.id === selectedGenreId
                  ? "rgba(96, 165, 250, 0.46)"
                  : "rgba(255, 255, 255, 0.05)"
              }
              transition="all 0.2s ease"
              _hover={{
                borderColor: "rgba(96, 165, 250, 0.35)",
              }}
            >
              <Image
                objectFit="cover"
                boxSize="36px"
                borderRadius={10}
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
                onClick={() => setSelectedGenreId(genre.id)}
                fontSize="sm"
                variant="link"
                color={genre.id === selectedGenreId ? "white" : "whiteAlpha.900"}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
