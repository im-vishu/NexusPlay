import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import useDownloads from "../hooks/useDownloads";

interface Props {
  gameId: number;
}

const GameDownloads = ({ gameId }: Props) => {
  const { data, error, isLoading } = useDownloads(gameId);

  if (isLoading)
    return (
      <Box marginTop={5}>
        <Spinner size="sm" />
      </Box>
    );

  if (error || !data?.downloads.length) return null;

  return (
    <Box marginTop={5}>
      <HStack marginBottom={3} spacing={2}>
        <FiDownload />
        <Text as="h2" fontWeight="bold">
          Download
        </Text>
      </HStack>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
        {data.downloads.map((download) => {
          const website = download.website || download.store;
          if (!website) return null;

          return (
            <Button
              key={`${website.slug}-${download.id}`}
              as="a"
              href={download.url}
              target="_blank"
              rel="noreferrer"
              rightIcon={<FiExternalLink />}
              justifyContent="space-between"
              whiteSpace="normal"
              minHeight="44px"
              height="auto"
              paddingY={3}
              title={download.note}
            >
              {website.name}
            </Button>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default GameDownloads;
