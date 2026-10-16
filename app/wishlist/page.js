"use client";

import {
  Box,
  Button,
  Typography,
  IconButton,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useWishlist } from "../../components/wishlist/WishlistContext";
import { useCart } from "../../components/cart/CartContext";

export default function WishlistPage() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  // =========================================================
  // ADD WISHLIST PRODUCT TO BAG
  // =========================================================

  const handleAddToBag = (product) => {
    const size =
      product.sizes?.[0] || "S";

    addToCart(product, size);

    removeFromWishlist(product.id);
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <Box
      component="main"
      sx={{
        minHeight:
          "calc(100vh - 150px)",

        backgroundColor: "#F5F5F2",

        py: {
          xs: 7,
          md: 11,
        },

        px: {
          xs: 2,
          sm: 4,
          md: 6,
          lg: 8,
        },
      }}
    >
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <Box
        sx={{
          maxWidth: "1500px",
          mx: "auto",
          mb: {
            xs: 5,
            md: 8,
          },
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "var(--font-montserrat)",

            fontSize: "11px",

            fontWeight: 800,

            letterSpacing: "0.3em",

            color: "#858585",

            mb: 2,
          }}
        >
          YOUR SAVED STYLE
        </Typography>

        <Typography
          component="h1"
          sx={{
            fontFamily:
              "var(--font-anton)",

            fontSize: {
              xs: "60px",
              sm: "75px",
              md: "95px",
              lg: "110px",
            },

            lineHeight: 0.88,

            letterSpacing: "-1px",

            fontWeight: 400,

            color: "#1E2D4C",

            textTransform: "uppercase",
          }}
        >
          MY
          <br />

          <Box
            component="span"
            sx={{
              color: "#ACBDAA",
            }}
          >
            WISHLIST.
          </Box>
        </Typography>
      </Box>

      {/* =====================================================
          EMPTY WISHLIST
      ===================================================== */}

      {wishlist.length === 0 ? (
        <Box
          sx={{
            maxWidth: "1500px",

            mx: "auto",

            minHeight: "380px",

            backgroundColor: "#FFFFFF",

            display: "flex",

            flexDirection: "column",

            alignItems: "center",

            justifyContent: "center",

            textAlign: "center",

            px: 3,
          }}
        >
          <FavoriteIcon
            sx={{
              fontSize: 55,

              color: "#ACBDAA",

              mb: 3,
            }}
          />

          <Typography
            sx={{
              fontFamily:
                "var(--font-montserrat)",

              fontSize: "18px",

              fontWeight: 800,

              color: "#1E2D4C",

              mb: 1.5,
            }}
          >
            YOUR WISHLIST IS EMPTY
          </Typography>

          <Typography
            sx={{
              fontFamily:
                "var(--font-montserrat)",

              fontSize: "13px",

              color: "#858585",

              lineHeight: 1.8,

              maxWidth: "450px",

              mb: 3,
            }}
          >
            Save the pieces you love and
            come back to them whenever
            you're ready.
          </Typography>

          <Button
            component="a"
            href="/shop"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#1E2D4C",

              color: "#FFFFFF",

              borderRadius: 0,

              px: 4,

              py: 1.7,

              fontFamily:
                "var(--font-montserrat)",

              fontSize: "10px",

              fontWeight: 800,

              letterSpacing: "0.15em",

              "&:hover": {
                backgroundColor: "#ACBDAA",

                color: "#1E2D4C",
              },
            }}
          >
            CONTINUE SHOPPING
          </Button>
        </Box>
      ) : (
        /* =====================================================
           WISHLIST PRODUCTS
        ===================================================== */

        <Box
          sx={{
            maxWidth: "1500px",

            mx: "auto",

            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },

            gap: {
              xs: 3,
              md: 3,
              lg: 2.5,
            },
          }}
        >
          {wishlist.map((product) => {
            const image =
              product.images?.[0] ||
              product.image ||
              "";

            return (
              <Box
                key={product.id}
                sx={{
                  minWidth: 0,
                }}
              >
                {/* =================================================
                    PRODUCT IMAGE
                ================================================= */}

                <Box
                  sx={{
                    position: "relative",

                    overflow: "hidden",

                    backgroundColor:
                      "#EAEAEA",

                    aspectRatio: "3 / 4",
                  }}
                >
                  <Box
                    component="a"
                    href={`/products/${product.slug}`}
                    sx={{
                      display: "block",

                      width: "100%",

                      height: "100%",
                    }}
                  >
                    <Box
                      component="img"
                      src={image}
                      alt={product.name}
                      sx={{
                        width: "100%",

                        height: "100%",

                        objectFit: "cover",

                        display: "block",

                        transition:
                          "transform 0.6s cubic-bezier(.2,.7,.2,1)",

                        "&:hover": {
                          transform:
                            "scale(1.05)",
                        },
                      }}
                    />
                  </Box>

                  {/* =================================================
                      SAVED BADGE
                  ================================================= */}

                  <Box
                    sx={{
                      position:
                        "absolute",

                      top: 12,

                      left: 12,

                      backgroundColor:
                        "#FFFFFF",

                      px: 1.4,

                      py: 0.8,

                      zIndex: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily:
                          "var(--font-montserrat)",

                        fontSize: "9px",

                        fontWeight: 800,

                        letterSpacing:
                          "0.12em",

                        color: "#1E2D4C",
                      }}
                    >
                      SAVED
                    </Typography>
                  </Box>

                  {/* =================================================
                      DELETE BUTTON
                  ================================================= */}

                  <IconButton
                    type="button"
                    aria-label="Remove from wishlist"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();

                      removeFromWishlist(
                        product.id
                      );
                    }}
                    sx={{
                      position:
                        "absolute",

                      top: 12,

                      right: 12,

                      width: 42,

                      height: 42,

                      zIndex: 5,

                      backgroundColor:
                        "rgba(255,255,255,0.95)",

                      color: "#1E2D4C",

                      "&:hover": {
                        backgroundColor:
                          "#FFFFFF",

                        color: "#ACBDAA",
                      },
                    }}
                  >
                    <DeleteIcon
                      sx={{
                        fontSize: 21,
                      }}
                    />
                  </IconButton>
                </Box>

                {/* =================================================
                    PRODUCT DETAILS
                ================================================= */}

                <Box
                  sx={{
                    pt: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily:
                        "var(--font-montserrat)",

                      fontSize: "9px",

                      fontWeight: 700,

                      letterSpacing:
                        "0.15em",

                      color: "#858585",

                      mb: 0.8,
                    }}
                  >
                    {product.category ||
                      "CHŌYIFY"}
                  </Typography>

                  <Typography
                    component="a"
                    href={`/products/${product.slug}`}
                    sx={{
                      fontFamily:
                        "var(--font-montserrat)",

                      fontSize: "14px",

                      fontWeight: 700,

                      color: "#1E2D4C",

                      display: "block",

                      textDecoration:
                        "none",

                      mb: 1,

                      "&:hover": {
                        color: "#ACBDAA",
                      },
                    }}
                  >
                    {product.name}
                  </Typography>

                  {/* PRICE + ADD TO BAG */}

                  <Box
                    sx={{
                      display: "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "space-between",

                      gap: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily:
                          "var(--font-montserrat)",

                        fontSize: "14px",

                        fontWeight: 800,

                        color: "#1E2D4C",
                      }}
                    >
                      {product.price}
                    </Typography>

                    <Button
                      type="button"
                      onClick={() =>
                        handleAddToBag(
                          product
                        )
                      }
                      startIcon={
                        <ShoppingBagOutlinedIcon
                          sx={{
                            fontSize:
                              "17px !important",
                          }}
                        />
                      }
                      sx={{
                        fontFamily:
                          "var(--font-montserrat)",

                        fontSize: "9px",

                        fontWeight: 800,

                        letterSpacing:
                          "0.1em",

                        color: "#1E2D4C",

                        borderBottom:
                          "1px solid #1E2D4C",

                        borderRadius: 0,

                        px: 0,

                        py: 0.5,

                        "&:hover": {
                          backgroundColor:
                            "transparent",

                          color: "#ACBDAA",

                          borderColor:
                            "#ACBDAA",
                        },
                      }}
                    >
                      ADD TO BAG
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}