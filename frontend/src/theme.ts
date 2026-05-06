import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};
const theme = extendTheme({
  config,
  fonts: {
    heading: "'Segoe UI', 'Tahoma', sans-serif",
    body: "'Segoe UI', 'Arial', sans-serif",
  },
  colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "#111",
    },
    brand: {
      50: "#fff3ea",
      100: "#ffd8bf",
      200: "#ffba92",
      300: "#ff9a64",
      400: "#ff7a3d",
      500: "#e95f1f",
      600: "#b94917",
      700: "#84340f",
      800: "#522006",
      900: "#230b00",
    },
    ocean: {
      500: "#59d4ff",
    },
    mint: {
      500: "#63f5b0",
    },
  },
  styles: {
    global: {
      body: {
        color: "gray.50",
      },
    },
  },
});
export default theme;
