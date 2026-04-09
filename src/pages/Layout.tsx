import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AnimatedBackdrop from "../components/AnimatedBackdrop";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <Box minHeight="100vh" position="relative">
      <AnimatedBackdrop />
      <NavBar />
      <Container
        maxW="1440px"
        paddingX={{ base: 4, md: 6, xl: 10 }}
        paddingBottom={{ base: 10, lg: 16 }}
        position="relative"
        zIndex={1}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
