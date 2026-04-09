import { Box } from "@chakra-ui/react";

const AnimatedBackdrop = () => {
  return (
    <Box
      position="fixed"
      inset={0}
      pointerEvents="none"
      overflow="hidden"
      zIndex={0}
    >
      <Box
        position="absolute"
        inset={0}
        bg="radial-gradient(circle at 15% 0%, rgba(96, 165, 250, 0.14), transparent 35%), radial-gradient(circle at 85% 12%, rgba(34, 211, 238, 0.12), transparent 30%), radial-gradient(circle at 50% 100%, rgba(15, 23, 42, 0.2), transparent 40%)"
      />
    </Box>
  );
};

export default AnimatedBackdrop;
