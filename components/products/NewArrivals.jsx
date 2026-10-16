"use client";

import {
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useWishlist } from "../wishlist/WishlistContext";

export default function NewArrivals() {
  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const products = [
    {
      id: 1,

      name: "Sage Relaxed Shirt",

      slug: "sage-relaxed-shirt",

      category: "WOMEN",

      price: "₹1,499",

      oldPrice: "₹2,499",

      discount: "40% OFF",

      badge: "NEW",

      image:
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",

      images: [
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
      ],
    },

    {
      id: 2,

      name: "Classic Oversized Blazer",

      slug: "classic-oversized-blazer",

      category: "WOMEN",

      price: "₹2,299",

      oldPrice: "₹3,499",

      discount: "34% OFF",

      badge: "TRENDING",

      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",

      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
      ],
    },

    {
      id: 3,

      name: "Essential Linen Shirt",

      slug: "essential-linen-shirt",

      category: "MEN",

      price: "₹1,799",

      oldPrice: "₹2,799",

      discount: "36% OFF",

      badge: "NEW",

      image:
        "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",

      images: [
        "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
      ],
    },

    {
      id: 4,

      name: "Minimal Everyday Tee",

      slug: "minimal-everyday-tee",

      category: "MEN",

      price: "₹899",

      oldPrice: "₹1,499",

      discount: "40% OFF",

      badge: "BESTSELLER",

      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",

      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
      ],
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#F5F5F2",

        py: {
          xs: 9,
          md: 14,
        },

        px: {
          xs: 2,
          sm: 3,
          md: 5,
        },
      }}
    >

      {/* HEADER */}

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

          justifyContent:
            "space-between",

          gap: 3,
        }}
      >

        <Box>

          <Typography
            sx={{
              fontFamily:
                "var(--font-montserrat)",

              fontSize: "11px",

              fontWeight: 800,

              letterSpacing:
                "0.3em",

              color: "#858585",

              mb: 2,
            }}
          >
            JUST DROPPED
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontFamily:
                "var(--font-anton)",

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
            NEW

            <br />

            <Box
              component="span"
              sx={{
                color: "#ACBDAA",
              }}
            >
              ARRIVALS
            </Box>
          </Typography>

        </Box>


        <Button
          href="/shop"
          endIcon={
            <ArrowForwardIcon />
          }
          sx={{
            fontFamily:
              "var(--font-montserrat)",

            fontSize: "10px",

            fontWeight: 800,

            letterSpacing:
              "0.15em",

            color: "#1E2D4C",

            borderBottom:
              "1px solid #1E2D4C",

            borderRadius: 0,

            px: 0,

            pb: 1,

            "&:hover": {
              backgroundColor:
                "transparent",

              color: "#ACBDAA",

              borderColor:
                "#ACBDAA",
            },
          }}
        >
          VIEW ALL PRODUCTS
        </Button>

      </Box>


      {/* PRODUCTS */}

      <Box
        sx={{
          maxWidth: "1500px",

          mx: "auto",

          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },

          gap: {
            xs: 3,
            md: 3,
            lg: 2.5,
          },
        }}
      >

        {products.map((product) => {

          const saved =
            isInWishlist(
              product.slug
            );

          return (
            <Box
              key={product.id}
              sx={{
                minWidth: 0,
              }}
            >

              {/* IMAGE */}

              <Box
                component="a"
                href={`/products/${product.slug}`}
                sx={{
                  position:
                    "relative",

                  overflow:
                    "hidden",

                  backgroundColor:
                    "#EAEAEA",

                  aspectRatio:
                    "3 / 4",

                  display:
                    "block",

                  textDecoration:
                    "none",

                  "&:hover .product-image":
                    {
                      transform:
                        "scale(1.05)",
                    },

                  "&:hover .add-bag":
                    {
                      transform:
                        "translateY(0)",

                      opacity: 1,
                    },
                }}
              >

                <Box
                  component="img"
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: "100%",

                    height: "100%",

                    objectFit:
                      "cover",

                    display:
                      "block",

                    transition:
                      "transform 0.6s cubic-bezier(.2,.7,.2,1)",
                  }}
                />


                {/* BADGE */}

                <Box
                  sx={{
                    position:
                      "absolute",

                    top: 14,

                    left: 14,

                    backgroundColor:
                      "#FFFFFF",

                    px: 1.4,

                    py: 0.8,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily:
                        "var(--font-montserrat)",

                      fontSize:
                        "9px",

                      fontWeight: 800,

                      letterSpacing:
                        "0.12em",

                      color:
                        "#1E2D4C",
                    }}
                  >
                    {product.badge}
                  </Typography>
                </Box>


                {/* WISHLIST */}

                <IconButton
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    toggleWishlist(
                      product
                    );
                  }}
                  aria-label={
                    saved
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  sx={{
                    position:
                      "absolute",

                    top: 12,

                    right: 12,

                    width: 58,

                    height: 58,

                    backgroundColor:
                      "#FFFFFF",

                    color:
                      "#1E2D4C",

                    "&:hover": {
                      backgroundColor:
                        "#FFFFFF",

                      color:
                        saved
                          ? "#1E2D4C"
                          : "#ACBDAA",
                    },
                  }}
                >
                  {saved ? (
                    <FavoriteIcon
                      sx={{
                        fontSize: 24,
                      }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      sx={{
                        fontSize: 24,
                      }}
                    />
                  )}
                </IconButton>


                {/* ADD TO BAG */}

                <Button
                  className="add-bag"
                  onClick={(event) =>
                    event.preventDefault()
                  }
                  fullWidth
                  sx={{
                    position:
                      "absolute",

                    bottom: 0,

                    left: 0,

                    height: 52,

                    backgroundColor:
                      "#1E2D4C",

                    color:
                      "#FFFFFF",

                    borderRadius: 0,

                    fontFamily:
                      "var(--font-montserrat)",

                    fontSize:
                      "10px",

                    fontWeight: 800,

                    letterSpacing:
                      "0.15em",

                    opacity: {
                      xs: 1,
                      md: 0,
                    },

                    transform: {
                      xs:
                        "translateY(0)",

                      md:
                        "translateY(100%)",
                    },

                    transition:
                      "all 0.35s cubic-bezier(.2,.7,.2,1)",

                    "&:hover": {
                      backgroundColor:
                        "#ACBDAA",

                      color:
                        "#1E2D4C",
                    },
                  }}
                >
                  ADD TO BAG
                </Button>

              </Box>


              {/* INFO */}

              <Box sx={{ pt: 2 }}>

                <Typography
                  sx={{
                    fontFamily:
                      "var(--font-montserrat)",

                    fontSize:
                      "9px",

                    fontWeight: 700,

                    letterSpacing:
                      "0.15em",

                    color:
                      "#858585",

                    mb: 0.8,
                  }}
                >
                  {product.category}
                </Typography>


                <Typography
                  component="a"
                  href={`/products/${product.slug}`}
                  sx={{
                    fontFamily:
                      "var(--font-montserrat)",

                    fontSize:
                      "13px",

                    fontWeight: 700,

                    color:
                      "#1E2D4C",

                    mb: 1,

                    display:
                      "block",

                    textDecoration:
                      "none",

                    "&:hover": {
                      color:
                        "#ACBDAA",
                    },
                  }}
                >
                  {product.name}
                </Typography>


                <Box
                  sx={{
                    display: "flex",

                    alignItems:
                      "center",

                    gap: 1,

                    flexWrap:
                      "wrap",
                  }}
                >

                  <Typography
                    sx={{
                      fontFamily:
                        "var(--font-montserrat)",

                      fontSize:
                        "13px",

                      fontWeight: 800,

                      color:
                        "#1E2D4C",
                    }}
                  >
                    {product.price}
                  </Typography>


                  <Typography
                    sx={{
                      fontFamily:
                        "var(--font-montserrat)",

                      fontSize:
                        "11px",

                      fontWeight: 500,

                      color:
                        "#999999",

                      textDecoration:
                        "line-through",
                    }}
                  >
                    {product.oldPrice}
                  </Typography>


                  <Typography
                    sx={{
                      fontFamily:
                        "var(--font-montserrat)",

                      fontSize:
                        "9px",

                      fontWeight: 800,

                      color:
                        "#ACBDAA",

                      letterSpacing:
                        "0.05em",
                    }}
                  >
                    {product.discount}
                  </Typography>

                </Box>

              </Box>

            </Box>
          );
        })}

      </Box>

    </Box>
  );
}