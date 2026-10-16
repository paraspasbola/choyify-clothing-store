"use client";

import { useMemo, useState } from "react";

import {
  Box,
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useWishlist } from "../../components/wishlist/WishlistContext";

export default function ShopPage() {
  /* =========================================================
     PRODUCTS
  ========================================================= */

  const products = [
    {
      id: 1,
      name: "Sage Relaxed Shirt",
      slug: "sage-relaxed-shirt",
      category: "WOMEN",
      price: 1499,
      oldPrice: 2499,
      discount: "40% OFF",
      badge: "NEW",
      image:
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    },

    {
      id: 2,
      name: "Classic Oversized Blazer",
      slug: "classic-oversized-blazer",
      category: "WOMEN",
      price: 2299,
      oldPrice: 3499,
      discount: "34% OFF",
      badge: "TRENDING",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    },

    {
      id: 3,
      name: "Essential Linen Shirt",
      slug: "essential-linen-shirt",
      category: "MEN",
      price: 1799,
      oldPrice: 2799,
      discount: "36% OFF",
      badge: "NEW",
      image:
        "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
    },

    {
      id: 4,
      name: "Minimal Everyday Tee",
      slug: "minimal-everyday-tee",
      category: "MEN",
      price: 899,
      oldPrice: 1499,
      discount: "40% OFF",
      badge: "BESTSELLER",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    },
  ];

  /* =========================================================
     WISHLIST
  ========================================================= */

  const { wishlist, toggleWishlist } = useWishlist();

  /* =========================================================
     STATES
  ========================================================= */

  const [category, setCategory] = useState("ALL");

  const [sort, setSort] = useState("featured");

  const [search, setSearch] = useState("");

  /* =========================================================
     FILTER + SEARCH + SORT
  ========================================================= */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /* CATEGORY */

    if (category !== "ALL") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    /* SEARCH */

    if (search.trim() !== "") {
      const searchValue = search.toLowerCase();

      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchValue)
      );
    }

    /* SORT */

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [category, search, sort]);

  /* =========================================================
     WISHLIST CHECK
  ========================================================= */

  const isWishlisted = (product) => {
    return wishlist?.some(
      (item) => item.id === product.id
    );
  };

  /* =========================================================
     FORMAT PRICE
  ========================================================= */

  const formatPrice = (price) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <main>

      {/* =====================================================
          SHOP HEADER
      ===================================================== */}

      <Box
        component="section"
        sx={{
          backgroundColor: "#F5F5F2",

          minHeight: {
            xs: "320px",
            md: "400px",
          },

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          textAlign: "center",

          px: 3,
          py: 8,
        }}
      >
        <Box>

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
            CHŌYIFY COLLECTION
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontFamily:
                "var(--font-anton)",

              fontSize: {
                xs: "65px",
                sm: "85px",
                md: "110px",
              },

              lineHeight: 0.9,

              letterSpacing: "-1px",

              fontWeight: 400,

              color: "#1E2D4C",
            }}
          >
            SHOP
            <br />

            <Box
              component="span"
              sx={{
                color: "#ACBDAA",
              }}
            >
              ALL
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 3,

              fontFamily:
                "var(--font-montserrat)",

              fontSize: "13px",

              lineHeight: 1.8,

              fontWeight: 500,

              color: "#858585",

              maxWidth: "500px",

              mx: "auto",
            }}
          >
            Discover contemporary pieces designed
            for everyday expression. Find your next
            favourite from the CHŌYIFY collection.
          </Typography>

        </Box>
      </Box>


      {/* =====================================================
          SHOP CONTROLS
      ===================================================== */}

      <Box
        component="section"
        sx={{
          backgroundColor: "#FFFFFF",

          px: {
            xs: 2,
            sm: 3,
            md: 5,
            lg: 7,
          },

          pt: {
            xs: 5,
            md: 7,
          },
        }}
      >

        <Box
          sx={{
            maxWidth: "1500px",

            mx: "auto",

            display: "flex",

            flexDirection: {
              xs: "column",
              lg: "row",
            },

            justifyContent:
              "space-between",

            alignItems: {
              xs: "stretch",
              lg: "center",
            },

            gap: 3,

            pb: 3,

            borderBottom:
              "1px solid #EAE7DD",
          }}
        >

          {/* CATEGORY FILTER */}

          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              gap: 1,

              flexWrap: "wrap",
            }}
          >

            {[
              "ALL",
              "WOMEN",
              "MEN",
            ].map((item) => (
              <Button
                key={item}
                onClick={() =>
                  setCategory(item)
                }
                sx={{
                  fontFamily:
                    "var(--font-montserrat)",

                  fontSize: "10px",

                  fontWeight: 800,

                  letterSpacing:
                    "0.12em",

                  color:
                    category === item
                      ? "#FFFFFF"
                      : "#1E2D4C",

                  backgroundColor:
                    category === item
                      ? "#1E2D4C"
                      : "transparent",

                  border:
                    "1px solid #1E2D4C",

                  borderRadius: 0,

                  px: 2.5,

                  py: 1.2,

                  "&:hover": {
                    backgroundColor:
                      "#ACBDAA",

                    color: "#1E2D4C",

                    borderColor:
                      "#ACBDAA",
                  },
                }}
              >
                {item}
              </Button>
            ))}

          </Box>


          {/* SEARCH + SORT */}

          <Box
            sx={{
              display: "flex",

              alignItems: "center",

              gap: 2,

              flexDirection: {
                xs: "column",
                sm: "row",
              },

              width: {
                xs: "100%",
                lg: "auto",
              },
            }}
          >

            {/* SEARCH */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                borderBottom:
                  "1px solid #1E2D4C",

                width: {
                  xs: "100%",
                  sm: "240px",
                },

                height: "42px",
              }}
            >

              <SearchIcon
                sx={{
                  fontSize: 20,
                  color: "#1E2D4C",
                  mr: 1,
                }}
              />

              <InputBase
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="SEARCH PRODUCTS"
                sx={{
                  flex: 1,

                  fontFamily:
                    "var(--font-montserrat)",

                  fontSize: "10px",

                  fontWeight: 700,

                  letterSpacing:
                    "0.08em",

                  color: "#1E2D4C",

                  "& input::placeholder": {
                    color: "#858585",

                    opacity: 1,
                  },
                }}
              />

            </Box>


            {/* SORT */}

            <Select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value)
              }
              size="small"
              sx={{
                minWidth: "190px",

                fontFamily:
                  "var(--font-montserrat)",

                fontSize: "10px",

                fontWeight: 800,

                letterSpacing:
                  "0.05em",

                color: "#1E2D4C",

                borderRadius: 0,

                "& .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor:
                      "#1E2D4C",
                  },

                "&:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor:
                      "#ACBDAA",
                  },
              }}
            >

              <MenuItem value="featured">
                FEATURED
              </MenuItem>

              <MenuItem value="price-low">
                PRICE: LOW TO HIGH
              </MenuItem>

              <MenuItem value="price-high">
                PRICE: HIGH TO LOW
              </MenuItem>

            </Select>

          </Box>

        </Box>


        {/* ===================================================
            RESULT COUNT
        =================================================== */}

        <Box
          sx={{
            maxWidth: "1500px",

            mx: "auto",

            pt: 3,

            pb: 3,

            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",
          }}
        >

          <Typography
            sx={{
              fontFamily:
                "var(--font-montserrat)",

              fontSize: "10px",

              fontWeight: 800,

              letterSpacing:
                "0.12em",

              color: "#858585",
            }}
          >
            {filteredProducts.length}{" "}
            PRODUCTS
          </Typography>

          {search && (
            <Typography
              sx={{
                fontFamily:
                  "var(--font-montserrat)",

                fontSize: "10px",

                fontWeight: 700,

                color: "#858585",
              }}
            >
              SEARCH: "{search}"
            </Typography>
          )}

        </Box>


        {/* ===================================================
            PRODUCT GRID
        =================================================== */}

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

            pb: {
              xs: 8,
              md: 14,
            },
          }}
        >

          {filteredProducts.map(
            (product) => (
              <Box
                key={product.id}
                sx={{
                  minWidth: 0,
                }}
              >

                {/* PRODUCT IMAGE */}

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

                    display: "block",

                    textDecoration:
                      "none",

                    "&:hover .product-image":
                      {
                        transform:
                          "scale(1.05)",
                      },

                    "&:hover .shop-add":
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

                      display: "block",

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

                        fontSize: "9px",

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

                      toggleWishlist(product);
                    }}
                    aria-label="Add to wishlist"
                    sx={{
                      position:
                        "absolute",

                      top: 8,

                      right: 8,

                      width: 42,

                      height: 42,

                      backgroundColor:
                        "rgba(255,255,255,0.94)",

                      color:
                        isWishlisted(product)
                          ? "#ACBDAA"
                          : "#1E2D4C",

                      "&:hover": {
                        backgroundColor:
                          "#FFFFFF",

                        color:
                          "#ACBDAA",
                      },
                    }}
                  >

                    {isWishlisted(
                      product
                    ) ? (
                      <FavoriteIcon
                        sx={{
                          fontSize: 20,
                        }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{
                          fontSize: 20,
                        }}
                      />
                    )}

                  </IconButton>


                  {/* ADD TO BAG */}

                  <Button
                    className="shop-add"
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

                      fontSize: "10px",

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


                {/* PRODUCT INFORMATION */}

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

                      fontSize: "13px",

                      fontWeight: 700,

                      color:
                        "#1E2D4C",

                      mb: 1,

                      display: "block",

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


                  {/* PRICE */}

                  <Box
                    sx={{
                      display:
                        "flex",

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

                        fontSize: "13px",

                        fontWeight: 800,

                        color:
                          "#1E2D4C",
                      }}
                    >
                      {formatPrice(
                        product.price
                      )}
                    </Typography>

                    <Typography
                      sx={{
                        fontFamily:
                          "var(--font-montserrat)",

                        fontSize: "11px",

                        fontWeight: 500,

                        color:
                          "#999999",

                        textDecoration:
                          "line-through",
                      }}
                    >
                      {formatPrice(
                        product.oldPrice
                      )}
                    </Typography>

                    <Typography
                      sx={{
                        fontFamily:
                          "var(--font-montserrat)",

                        fontSize: "9px",

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
            )
          )}

        </Box>


        {/* ===================================================
            NO RESULTS
        =================================================== */}

        {filteredProducts.length === 0 && (
          <Box
            sx={{
              maxWidth: "700px",

              mx: "auto",

              textAlign: "center",

              py: 12,
            }}
          >

            <Typography
              sx={{
                fontFamily:
                  "var(--font-anton)",

                fontSize: "55px",

                lineHeight: 0.9,

                color: "#1E2D4C",

                mb: 2,
              }}
            >
              NOTHING
              <br />

              <Box
                component="span"
                sx={{
                  color: "#ACBDAA",
                }}
              >
                FOUND
              </Box>
            </Typography>

            <Typography
              sx={{
                fontFamily:
                  "var(--font-montserrat)",

                fontSize: "13px",

                color: "#858585",

                mb: 3,
              }}
            >
              Try another search or
              category.
            </Typography>

            <Button
              onClick={() => {
                setSearch("");
                setCategory("ALL");
              }}
              sx={{
                fontFamily:
                  "var(--font-montserrat)",

                fontSize: "10px",

                fontWeight: 800,

                letterSpacing:
                  "0.12em",

                backgroundColor:
                  "#1E2D4C",

                color: "#FFFFFF",

                borderRadius: 0,

                px: 4,

                py: 1.8,

                "&:hover": {
                  backgroundColor:
                    "#ACBDAA",

                  color: "#1E2D4C",
                },
              }}
            >
              CLEAR FILTERS
            </Button>

          </Box>
        )}

      </Box>

    </main>
  );
}