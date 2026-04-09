import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <HStack
      position="sticky"
      top={{ base: 2, md: 4 }}
      width="100%"
      zIndex={20}
      justifyContent="space-between"
      alignItems="center"
      spacing={{ base: 3, md: 6 }}
      paddingX={{ base: 3, md: 5 }}
      paddingY={{ base: 3, md: 3.5 }}
      marginTop={{ base: 2, md: 3 }}
      marginBottom={{ base: 6, md: 7 }}
      borderRadius="20px"
      className="frosted-panel"
    >
      <HStack
        minWidth={{ base: "auto", md: "220px" }}
        spacing={3}
        cursor="pointer"
        onClick={() => {
          navigate("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <Image src={logo} boxSize={{ base: "44px", md: "52px" }} objectFit="cover" />
        <VStack align="start" spacing={0} display={{ base: "none", sm: "flex" }}>
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="800" letterSpacing="0.02em">
            NexusPlay
          </Text>
          <Text color="whiteAlpha.700" fontSize="xs">
            Discover your next favorite game
          </Text>
        </VStack>
      </HStack>
      <Box flex="1" maxWidth="760px">
        <SearchInput />
      </Box>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
