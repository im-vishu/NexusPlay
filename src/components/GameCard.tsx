import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
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

  return (
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
        <Link to={"/games/" + game.slug}>
          <Box position="relative">
            <Image
              src={imageSrc}
              alt={game.name}
              width="100%"
              height="190px"
              objectFit="cover"
              onError={() => setImageSrc(noImage)}
            />
          </Box>
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
  );
};

export default GameCard;
