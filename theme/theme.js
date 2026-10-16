"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#1E2D4C",
    },

    secondary: {
      main: "#ACBDAA",
    },

    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1E2D4C",
      secondary: "#858585",
    },
  },

  typography: {
    fontFamily: "var(--font-montserrat), sans-serif",

    h1: {
      fontFamily: "var(--font-anton), sans-serif",
      fontWeight: 400,
      lineHeight: 0.9,
      letterSpacing: "-1px",
    },

    h2: {
      fontFamily: "var(--font-anton), sans-serif",
      fontWeight: 400,
      lineHeight: 0.9,
      letterSpacing: "-1px",
    },

    h3: {
      fontFamily: "var(--font-anton), sans-serif",
      fontWeight: 400,
      lineHeight: 0.9,
    },

    h4: {
      fontFamily: "var(--font-anton), sans-serif",
      fontWeight: 400,
    },

    h5: {
      fontFamily: "var(--font-montserrat), sans-serif",
      fontWeight: 800,
    },

    h6: {
      fontFamily: "var(--font-montserrat), sans-serif",
      fontWeight: 800,
    },

    body1: {
      fontFamily: "var(--font-montserrat), sans-serif",
      fontWeight: 400,
    },

    body2: {
      fontFamily: "var(--font-montserrat), sans-serif",
      fontWeight: 500,
    },

    button: {
      fontFamily: "var(--font-montserrat), sans-serif",
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
  },

  shape: {
    borderRadius: 0,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: "14px 28px",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;