"use client";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: {
          xs: "calc(100vh - 68px)",
          md: "calc(100vh - 86px)",
        },

        backgroundColor: "#F5F5F2",

        display: "flex",
        alignItems: "center",

        overflow: "hidden",

        position: "relative",
      }}
    >
      {/* =====================================
          HERO CONTAINER
      ===================================== */}

      <Box
        sx={{
          width: "100%",
          maxWidth: "1500px",
          margin: "0 auto",

          px: {
            xs: 3,
            sm: 5,
            md: 7,
            lg: 10,
          },

          py: {
            xs: 7,
            md: 8,
          },

          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },

          alignItems: "center",

          gap: {
            xs: 6,
            md: 4,
            lg: 8,
          },
        }}
      >
        {/* =====================================
            LEFT CONTENT
        ===================================== */}

        <Box
          sx={{
            position: "relative",
            zIndex: 2,

            maxWidth: {
              xs: "100%",
              md: "650px",
            },
          }}
        >
          {/* SMALL LABEL */}

          <Typography
            sx={{
              fontFamily: "var(--font-montserrat)",

              fontSize: {
                xs: "10px",
                md: "12px",
              },

              fontWeight: 800,

              letterSpacing: "0.3em",

              color: "#858585",

              mb: 3,
            }}
          >
            CONTEMPORARY FASHION
          </Typography>

          {/* =====================================
              MAIN HEADING
          ===================================== */}

          <Typography
            component="h1"
            sx={{
              fontFamily: "var(--font-anton)",

              fontSize: {
                xs: "64px",
                sm: "82px",
                md: "90px",
                lg: "110px",
              },

              lineHeight: 0.86,

              letterSpacing: "-2px",

              fontWeight: 400,

              color: "#1E2D4C",

              textTransform: "uppercase",

              mb: 4,
            }}
          >
            WEAR
            <br />

            YOUR
            <br />

            <Box
              component="span"
              sx={{
                color: "#ACBDAA",
              }}
            >
              STORY.
            </Box>
          </Typography>

          {/* =====================================
              DESCRIPTION
          ===================================== */}

          <Typography
            sx={{
              fontFamily: "var(--font-montserrat)",

              fontSize: {
                xs: "13px",
                md: "14px",
              },

              lineHeight: 1.8,

              fontWeight: 500,

              color: "#858585",

              maxWidth: "470px",

              mb: 4,
            }}
          >
            Contemporary fashion designed for people
            who wear their individuality with confidence.
            Discover pieces made to become part of your story.
          </Typography>

          {/* =====================================
              BUTTONS
          ===================================== */}

          <Box
            sx={{
              display: "flex",

              flexWrap: "wrap",

              gap: 2,
            }}
          >
            {/* WOMEN */}

            <Button
              component="a"
              href="/women"
              variant="contained"
              sx={{
                fontFamily: "var(--font-montserrat)",

                fontSize: "11px",

                fontWeight: 800,

                letterSpacing: "0.12em",

                backgroundColor: "#1E2D4C",

                color: "#FFFFFF",

                borderRadius: 0,

                px: 4,

                py: 1.8,

                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#ACBDAA",

                  color: "#1E2D4C",

                  boxShadow: "none",
                },
              }}
            >
              SHOP WOMEN
            </Button>

            {/* MEN */}

            <Button
              component="a"
              href="/men"
              variant="outlined"
              sx={{
                fontFamily: "var(--font-montserrat)",

                fontSize: "11px",

                fontWeight: 800,

                letterSpacing: "0.12em",

                color: "#1E2D4C",

                borderColor: "#1E2D4C",

                borderRadius: 0,

                px: 4,

                py: 1.8,

                "&:hover": {
                  borderColor: "#ACBDAA",

                  backgroundColor: "#ACBDAA",

                  color: "#1E2D4C",
                },
              }}
            >
              SHOP MEN
            </Button>
          </Box>
        </Box>

        {/* =====================================
            RIGHT IMAGE
        ===================================== */}

        <Box
          sx={{
            position: "relative",

            width: "100%",

            height: {
              xs: "500px",
              sm: "600px",
              md: "680px",
              lg: "720px",
            },

            overflow: "hidden",

            backgroundColor: "#E5E5E1",
          }}
        >
          {/* =====================================
              HERO IMAGE
          ===================================== */}

          <Box
            component="img"
            src="https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="CHŌYIFY fashion collection"
            sx={{
              width: "100%",

              height: "100%",

              objectFit: "cover",

              objectPosition: "center",

              display: "block",

              filter: "saturate(0.85)",

              transition:
                "transform 0.8s cubic-bezier(.2,.7,.2,1)",

              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          />

          {/* =====================================
              IMAGE OVERLAY
          ===================================== */}

          <Box
            sx={{
              position: "absolute",

              inset: 0,

              background:
                "linear-gradient(180deg, rgba(30,45,76,0.03), rgba(30,45,76,0.18))",

              pointerEvents: "none",
            }}
          />

          {/* =====================================
              IMAGE LABEL
          ===================================== */}

          <Box
            sx={{
              position: "absolute",

              left: {
                xs: 18,
                md: 25,
              },

              bottom: {
                xs: 18,
                md: 25,
              },

              backgroundColor: "#FFFFFF",

              px: {
                xs: 2,
                md: 2.5,
              },

              py: {
                xs: 1.5,
                md: 1.8,
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "var(--font-montserrat)",

                fontSize: "9px",

                fontWeight: 800,

                letterSpacing: "0.18em",

                color: "#1E2D4C",
              }}
            >
              CHŌYIFY / 2026 EDIT
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* =====================================
          DECORATIVE CIRCLE
      ===================================== */}

      <Box
        sx={{
          position: "absolute",

          width: {
            xs: "180px",
            md: "300px",
          },

          height: {
            xs: "180px",
            md: "300px",
          },

          borderRadius: "50%",

          backgroundColor: "#E0C8BB",

          opacity: 0.25,

          right: {
            xs: "-80px",
            md: "-120px",
          },

          bottom: {
            xs: "-80px",
            md: "-120px",
          },

          pointerEvents: "none",
        }}
      />
    </Box>
  );
}