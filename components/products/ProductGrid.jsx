"use client";

import { useEffect, useState } from "react";

import {
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { supabase } from "../../lib/supabase";
import { useWishlist } from "../wishlist/WishlistContext";

export default function ProductGrid({
  category = "ALL",
}) {
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================================
     FETCH PRODUCTS FROM SUPABASE
  ========================================= */

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        // Fetch products
        const { data: productData, error: productError } =
          await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (productError) {
          console.error("Products fetch error:", productError);
          setProducts([]);
          return;
        }

        if (!productData || productData.length === 0) {
          setProducts([]);
          return;
        }

        // Fetch categories
        const { data: categoryData, error: categoryError } =
          await supabase
            .from("categories")
            .select("id, name");

        if (categoryError) {
          console.error("Categories fetch error:", categoryError);
        }

        // Fetch product images
        const { data: imageData, error: imageError } =
          await supabase
            .from("product_images")
            .select(
              "id, product_id, image_url, alt_text, sort_order"
            )
            .order("sort_order", {
              ascending: true,
            });

        if (imageError) {
          console.error("Product images fetch error:", imageError);
        }

        /* =========================================
           CREATE LOOKUP MAPS
        ========================================= */

        const categoryMap = {};

        (categoryData || []).forEach((categoryItem) => {
          categoryMap[categoryItem.id] =
            categoryItem.name;
        });

        const imageMap = {};

        (imageData || []).forEach((image) => {
          if (!imageMap[image.product_id]) {
            imageMap[image.product_id] = [];
          }

          imageMap[image.product_id].push(
            image.image_url
          );
        });

        /* =========================================
           FORMAT PRODUCTS
        ========================================= */

        const formattedProducts = productData.map(
          (product) => {
            const oldPrice =
              product.old_price ?? null;

            const price =
              product.price ?? 0;

            let discount = null;

            if (
              oldPrice &&
              Number(oldPrice) > Number(price)
            ) {
              const percentage = Math.round(
                ((Number(oldPrice) -
                  Number(price)) /
                  Number(oldPrice)) *
                  100
              );

              discount = `${percentage}% OFF`;
            }

            return {
              id: product.id,

              name: product.name,

              slug: product.slug,

              description:
                product.description || "",

              price: Number(price),

              oldPrice: oldPrice
                ? Number(oldPrice)
                : null,

              discount,

              badge: product.badge || null,

              category:
                categoryMap[product.category_id] ||
                "",

              images:
                imageMap[product.id] || [],

              // Keep the database ID available
              // for future variants/cart work.
              categoryId:
                product.category_id || null,
            };
          }
        );

        setProducts(formattedProducts);
      } catch (error) {
        console.error(
          "Unexpected product fetch error:",
          error
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* =========================================
     FILTER PRODUCTS
  ========================================= */

  const filteredProducts =
    category === "ALL"
      ? products
      : category === "SALE"
        ? products.filter(
            (product) =>
              product.oldPrice &&
              product.oldPrice > product.price
          )
        : products.filter(
            (product) =>
              product.category?.toUpperCase() ===
              category.toUpperCase()
          );

  /* =========================================
     WISHLIST
  ========================================= */

  const handleWishlist = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  /* =========================================
     LOADING STATE
  ========================================= */

  if (loading) {
    return (
      <Box
        component="section"
        sx={{
          backgroundColor: "#FFFFFF",
          px: {
            xs: 2,
            sm: 3,
            md: 5,
          },
          py: {
            xs: 10,
            md: 14,
          },
        }}
      >
        <Box
          sx={{
            maxWidth: "1500px",
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily:
                "var(--font-montserrat)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "#858585",
            }}
          >
            LOADING PRODUCTS...
          </Typography>
        </Box>
      </Box>
    );
  }

  /* =========================================
     PRODUCT GRID
  ========================================= */

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#FFFFFF",

        px: {
          xs: 2,
          sm: 3,
          md: 5,
        },

        pb: {
          xs: 9,
          md: 14,
        },
      }}
    >
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
        {filteredProducts.map((product) => {
          const wished = isInWishlist(
            product.id
          );

          return (
            <Box
              key={product.id}
              sx={{
                minWidth: 0,
              }}
            >
              {/* =========================================
                  PRODUCT IMAGE
              ========================================= */}

              <Box
                component="a"
                href={`/products/${product.slug}`}
                sx={{
                  position: "relative",
                  overflow: "hidden",

                  backgroundColor: "#EAEAEA",

                  aspectRatio: "3 / 4",

                  display: "block",

                  textDecoration: "none",

                  "&:hover .product-image": {
                    transform: "scale(1.05)",
                  },

                  "&:hover .add-bag": {
                    transform: "translateY(0)",
                    opacity: 1,
                  },
                }}
              >
                {/* PRODUCT IMAGE */}

                {product.images?.[0] ? (
                  <Box
                    component="img"
                    className="product-image"
                    src={product.images[0]}
                    alt={
                      product.name
                    }
                    sx={{
                      width: "100%",
                      height: "100%",

                      objectFit: "cover",

                      display: "block",

                      transition:
                        "transform 0.6s cubic-bezier(.2,.7,.2,1)",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor:
                        "#EAE7DD",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily:
                          "var(--font-montserrat)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing:
                          "0.12em",
                        color: "#858585",
                      }}
                    >
                      IMAGE COMING SOON
                    </Typography>
                  </Box>
                )}

                {/* BADGE */}

                {product.badge && (
                  <Box
                    sx={{
                      position: "absolute",

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

                        color: "#1E2D4C",
                      }}
                    >
                      {product.badge}
                    </Typography>
                  </Box>
                )}

                {/* WISHLIST */}

                <IconButton
                  onClick={(event) =>
                    handleWishlist(
                      event,
                      product
                    )
                  }
                  aria-label={
                    wished
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  sx={{
                    position: "absolute",

                    top: 8,
                    right: 8,

                    width: 42,
                    height: 42,

                    backgroundColor:
                      "rgba(255,255,255,0.94)",

                    color: "#1E2D4C",

                    "&:hover": {
                      backgroundColor:
                        "#FFFFFF",
                      color: "#ACBDAA",
                    },
                  }}
                >
                  {wished ? (
                    <FavoriteIcon
                      sx={{
                        fontSize: 21,
                      }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      sx={{
                        fontSize: 21,
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
                    position: "absolute",

                    bottom: 0,
                    left: 0,

                    height: 52,

                    backgroundColor:
                      "#1E2D4C",

                    color: "#FFFFFF",

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
                      xs: "translateY(0)",
                      md: "translateY(100%)",
                    },

                    transition:
                      "all 0.35s cubic-bezier(.2,.7,.2,1)",

                    "&:hover": {
                      backgroundColor:
                        "#ACBDAA",
                      color: "#1E2D4C",
                    },
                  }}
                >
                  ADD TO BAG
                </Button>
              </Box>

              {/* =========================================
                  PRODUCT INFORMATION
              ========================================= */}

              <Box
                sx={{
                  pt: 2,
                }}
              >
                {/* CATEGORY */}

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
                  {product.category}
                </Typography>

                {/* PRODUCT NAME */}

                <Typography
                  component="a"
                  href={`/products/${product.slug}`}
                  sx={{
                    fontFamily:
                      "var(--font-montserrat)",

                    fontSize: "13px",

                    fontWeight: 700,

                    color: "#1E2D4C",

                    mb: 1,

                    display: "block",

                    textDecoration: "none",

                    "&:hover": {
                      color: "#ACBDAA",
                    },
                  }}
                >
                  {product.name}
                </Typography>

                {/* PRICE */}

                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: 1,

                    flexWrap: "wrap",
                  }}
                >
                  {/* CURRENT PRICE */}

                  <Typography
                    sx={{
                      fontFamily:
                        "var(--font-montserrat)",

                      fontSize: "13px",

                      fontWeight: 800,

                      color: "#1E2D4C",
                    }}
                  >
                    ₹
                    {product.price.toLocaleString(
                      "en-IN"
                    )}
                  </Typography>

                  {/* OLD PRICE */}

                  {product.oldPrice && (
                    <Typography
                      sx={{
                        fontFamily:
                          "var(--font-montserrat)",

                        fontSize: "11px",

                        fontWeight: 500,

                        color: "#999999",

                        textDecoration:
                          "line-through",
                      }}
                    >
                      ₹
                      {product.oldPrice.toLocaleString(
                        "en-IN"
                      )}
                    </Typography>
                  )}

                  {/* DISCOUNT */}

                  {product.discount && (
                    <Typography
                      sx={{
                        fontFamily:
                          "var(--font-montserrat)",

                        fontSize: "9px",

                        fontWeight: 800,

                        color: "#ACBDAA",

                        letterSpacing:
                          "0.05em",
                      }}
                    >
                      {product.discount}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* =========================================
          EMPTY STATE
      ========================================= */}

      {filteredProducts.length === 0 && (
        <Box
          sx={{
            maxWidth: "1500px",
            mx: "auto",

            py: {
              xs: 8,
              md: 12,
            },

            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily:
                "var(--font-montserrat)",

              fontSize: "13px",

              fontWeight: 600,

              color: "#858585",
            }}
          >
            NO PRODUCTS FOUND
          </Typography>
        </Box>
      )}
    </Box>
  );
}