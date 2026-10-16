"use client";

import { Box, Typography } from "@mui/material";

export default function AnnouncementBar() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#1E2D4C",
        color: "#FFFFFF",
        minHeight: "36px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        px: 2,
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: "var(--font-montserrat)",
          fontSize: {
            xs: "10px",
            sm: "11px",
          },
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        Free Shipping on Orders Above ₹999
      </Typography>
    </Box>
  );
}