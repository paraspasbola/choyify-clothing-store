"use client";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

export default function CategorySection() {
  const categories = [
    {
      title: "WOMEN",
      subtitle: "EXPLORE WOMEN'S WEAR",
      image:
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85",
    },

    {
      title: "MEN",
      subtitle: "EXPLORE MEN'S WEAR",
      image:
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1000&q=85",
    },

    {
      title: "ACCESSORIES",
      subtitle: "COMPLETE YOUR LOOK",
      image:
        "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=1000&q=85",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#FFFFFF",

        py: {
          xs: 8,
          md: 13,
        },

        px: {
          xs: 2,
          md: 5,
        },
      }}
    >

      {/* =====================================
          SECTION HEADER
      ===================================== */}

      <Box
        sx={{
          maxWidth: "1500px",

          mx: "auto",

          mb: {
            xs: 5,
            md: 7,
          },

          display: "flex",

          flexDirection: {
            xs: "column",
            md: "row",
          },

          alignItems: {
            xs: "flex-start",
            md: "flex-end",
          },

          justifyContent: "space-between",

          gap: 3,
        }}
      >

        {/* LEFT */}

        <Box>

          <Typography
            sx={{
              fontFamily: "var(--font-montserrat)",

              fontSize: "11px",

              fontWeight: 800,

              letterSpacing: "0.3em",

              color: "#858585",

              mb: 2,
            }}
          >
            DISCOVER CHŌYIFY
          </Typography>


          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--font-anton)",

              fontSize: {
                xs: "52px",
                sm: "65px",
                md: "82px",
              },

              lineHeight: 0.9,

              letterSpacing: "-1px",

              fontWeight: 400,

              color: "#1E2D4C",
            }}
          >
            SHOP BY
            <br />

            <Box
              component="span"
              sx={{
                color: "#ACBDAA",
              }}
            >
              CATEGORY
            </Box>
          </Typography>

        </Box>


        {/* RIGHT DESCRIPTION */}

        <Typography
          sx={{
            fontFamily: "var(--font-montserrat)",

            fontSize: "13px",

            lineHeight: 1.8,

            fontWeight: 500,

            color: "#858585",

            maxWidth: "400px",
          }}
        >
          From everyday essentials to statement pieces,
          discover fashion designed to fit your style,
          your mood and your story.
        </Typography>

      </Box>


      {/* =====================================
          CATEGORY GRID
      ===================================== */}

      <Box
        sx={{
          maxWidth: "1500px",

          mx: "auto",

          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },

          gap: {
            xs: 2,
            md: 3,
          },
        }}
      >

        {categories.map((category) => (

          <Box
            key={category.title}

            component="a"

            href="#"

            sx={{
              position: "relative",

              height: {
                xs: "500px",
                sm: "550px",
                md: "600px",
              },

              overflow: "hidden",

              display: "block",

              textDecoration: "none",

              backgroundColor: "#F5F5F2",

              "&:hover .category-image": {
                transform: "scale(1.06)",
              },

              "&:hover .category-overlay": {
                opacity: 0.72,
              },

              "&:hover .category-arrow": {
                transform: "translateX(8px)",
              },
            }}
          >

            {/* IMAGE */}

            <Box
              component="img"

              className="category-image"

              src={category.image}

              alt={category.title}

              sx={{
                position: "absolute",

                inset: 0,

                width: "100%",

                height: "100%",

                objectFit: "cover",

                display: "block",

                transition:
                  "transform 0.7s cubic-bezier(.2,.7,.2,1)",
              }}
            />


            {/* DARK OVERLAY */}

            <Box
              className="category-overlay"

              sx={{
                position: "absolute",

                inset: 0,

                background:
                  "linear-gradient(180deg, rgba(30,45,76,0.02) 25%, rgba(30,45,76,0.72) 100%)",

                opacity: 0.55,

                transition: "opacity 0.5s ease",
              }}
            />


            {/* CONTENT */}

            <Box
              sx={{
                position: "absolute",

                left: {
                  xs: 22,
                  md: 30,
                },

                right: {
                  xs: 22,
                  md: 30,
                },

                bottom: {
                  xs: 24,
                  md: 30,
                },

                color: "#FFFFFF",
              }}
            >

              <Typography
                sx={{
                  fontFamily: "var(--font-montserrat)",

                  fontSize: "10px",

                  fontWeight: 800,

                  letterSpacing: "0.2em",

                  mb: 1,
                }}
              >
                {category.subtitle}
              </Typography>


              <Typography
                component="h3"
                sx={{
                  fontFamily: "var(--font-anton)",

                  fontSize: {
                    xs: "45px",
                    md: "55px",
                  },

                  lineHeight: 0.9,

                  letterSpacing: "-0.5px",

                  fontWeight: 400,

                  mb: 2,
                }}
              >
                {category.title}
              </Typography>


              <Button
                className="category-arrow"

                sx={{
                  padding: 0,

                  minWidth: "auto",

                  color: "#FFFFFF",

                  fontFamily:
                    "var(--font-montserrat)",

                  fontSize: "10px",

                  fontWeight: 800,

                  letterSpacing: "0.15em",

                  transition:
                    "transform 0.3s ease",

                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                SHOP NOW

                <Box
                  component="span"
                  sx={{
                    ml: 1,

                    fontSize: "18px",

                    lineHeight: 1,
                  }}
                >
                  →
                </Box>

              </Button>

            </Box>

          </Box>

        ))}

      </Box>

    </Box>
  );
}