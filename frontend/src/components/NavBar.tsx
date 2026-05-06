import { Box, HStack, IconButton, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Logo/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCompact, setIsCompact] = useState(false);
  const showBackButton = location.pathname !== "/";

  useEffect(() => {
    const handleScroll = () => setIsCompact(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HStack
      position="sticky"
      top={{ base: 1.5, md: 3 }}
      width="100%"
      zIndex={40}
      justifyContent="space-between"
      alignItems="center"
      spacing={{ base: 2, md: 5 }}
      paddingX={{ base: isCompact ? 2 : 3, md: isCompact ? 3 : 5 }}
      paddingY={{ base: isCompact ? 2 : 3, md: isCompact ? 2 : 3.5 }}
      marginTop={{ base: 2, md: 3 }}
      marginBottom={{ base: isCompact ? 4 : 6, md: isCompact ? 5 : 7 }}
      borderRadius={isCompact ? "16px" : "20px"}
      className="frosted-panel"
      transition="all 0.2s ease"
    >
      {showBackButton && (
        <IconButton
          aria-label="Go back"
          icon={<FiArrowLeft />}
          borderRadius="full"
          variant="ghost"
          color="white"
          flexShrink={0}
          onClick={() => navigate(-1)}
          _hover={{ bg: "whiteAlpha.200" }}
        />
      )}
      <HStack
        minWidth={{ base: "auto", md: isCompact ? "150px" : "220px" }}
        spacing={{ base: 2, md: 3 }}
        cursor="pointer"
        flexShrink={0}
        onClick={() => {
          navigate("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <Image
          src={logo}
          boxSize={{ base: isCompact ? "34px" : "44px", md: isCompact ? "38px" : "52px" }}
          objectFit="cover"
          transition="all 0.2s ease"
        />
        <VStack
          align="start"
          spacing={0}
          display={{ base: "none", sm: isCompact ? "none" : "flex", lg: "flex" }}
        >
          <Text
            fontSize={{ base: "lg", md: isCompact ? "lg" : "xl" }}
            fontWeight="800"
            letterSpacing="0.02em"
          >
            NexusPlay
          </Text>
          <Text
            color="whiteAlpha.700"
            fontSize="xs"
            display={isCompact ? "none" : "block"}
          >
            Discover your next favorite game
          </Text>
        </VStack>
      </HStack>
      <Box flex="1" maxWidth={isCompact ? "620px" : "760px"} transition="all 0.2s ease">
        <SearchInput />
      </Box>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
