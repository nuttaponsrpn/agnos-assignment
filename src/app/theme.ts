"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    primary: {
      main: "#1A59C2",
    },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1024, xl: 1280 },
  },
  cssVariables: true,
});

export default theme;
