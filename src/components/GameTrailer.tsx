import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useTrailers from "../hooks/useTrailers";

interface Props {
  gameId: number;
}

const GameTrailer = ({ gameId }: Props) => {
  const { data, error, isLoading } = useTrailers(gameId);
  const [videoError, setVideoError] = useState(false);
  const [activeSource, setActiveSource] = useState(0);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    setVideoError(false);
    setActiveSource(0);
    setHasLoadedOnce(false);
  }, [gameId]);

  if (isLoading) return null;

  if (error)
    return (
      <Box className="frosted-panel" borderRadius="16px" padding={4} marginBottom={3}>
        <Text color="whiteAlpha.800">Trailer is unavailable for this game.</Text>
      </Box>
    );

  const first = data?.results[0];
  if (!first)
    return (
      <Box className="frosted-panel" borderRadius="16px" padding={4} marginBottom={3}>
        <Text color="whiteAlpha.800">No trailer available.</Text>
      </Box>
    );

  if (videoError)
    return (
      <Box className="frosted-panel" borderRadius="16px" padding={4} marginBottom={3}>
        <Text color="whiteAlpha.800">
          Trailer failed to load. Please try another game.
        </Text>
      </Box>
    );

  const sources = [
    first.data?.["480"],
    first.data?.max,
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  ]
    .filter(Boolean)
    .filter((value, index, self) => self.indexOf(value) === index);

  if (sources.length === 0)
    return (
      <Box className="frosted-panel" borderRadius="16px" padding={4} marginBottom={3}>
        <Text color="whiteAlpha.800">No trailer source available.</Text>
      </Box>
    );

  const handleVideoError = () => {
    // Some browsers can emit non-fatal video errors after playback starts.
    if (hasLoadedOnce) return;

    if (activeSource < sources.length - 1) {
      setActiveSource((current) => current + 1);
      return;
    }

    setVideoError(true);
  };

  return (
    <Box borderRadius="16px" overflow="hidden" marginBottom={3}>
      <video
        src={sources[activeSource]}
        poster={first.preview}
        controls
        preload="metadata"
        crossOrigin="anonymous"
        style={{ width: "100%", maxHeight: "360px", objectFit: "cover" }}
        onLoadedData={() => setHasLoadedOnce(true)}
        onError={handleVideoError}
      />
    </Box>
  );
};

export default GameTrailer;
