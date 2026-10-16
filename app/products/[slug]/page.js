"use client";

import { use, useEffect, useState } from "react";

import {
  Box,
  Button,
  IconButton,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StarIcon from "@mui/icons-material/Star";

import { useCart } from "../../../components/cart/CartContext";
import { supabase } from "../../../lib/supabase";

export default function ProductPage({ params }) {
  const { slug } = use(params);

  /*
   * =========================================================
   * PRODUCT STATE
   * =========================================================
   */

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
   * =========================================================
   * CART
   * =========================================================
   */

  const { addToCart } = useCart();

  /*
   * =========================================================
   * PRODUCT OPTIONS
   * =========================================================
   */

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  /*
   * =========================================================
   * TOAST
   * =========================================================
   */

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  /*
   * =========================================================
   * FETCH PRODUCT FROM SUPABASE
   * =========================================================
   */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        /*
         * -----------------------------------------------------
         * GET PRODUCT
         * -----------------------------------------------------
         */

        const {
          data: productData,
          error: productError,
        } = await supabase
          .from("products")
          .select("*")
          .eq("slug", slug)
          .single();

        if (productError) {
          console.error("PRODUCT FETCH ERROR", {
            message: productError?.message,
            details: productError?.details,
            hint: productError?.hint,
            code: productError?.code,
          });

          setProduct(null);
          return;
        }

        /*
         * -----------------------------------------------------
         * GET PRODUCT IMAGES
         * -----------------------------------------------------
         */

        const {
          data: imageData,
          error: imageError,
        } = await supabase
          .from("product_images")
          .select("*")
          .eq("product_id", productData.id)
          .order("sort_order", {
            ascending: true,
          });

        if (imageError) {
          console.error(
            "Product images fetch error:",
            imageError
          );
        }

        /*
         * -----------------------------------------------------
         * GET PRODUCT VARIANTS
         * -----------------------------------------------------
         */

        const {
          data: variantData,
          error: variantError,
        } = await supabase
          .from("product_variants")
          .select("*")
          .eq("product_id", productData.id)
          .order("created_at", {
            ascending: true,
          });

        if (variantError) {
          console.error(
            "Product variants fetch error:",
            variantError
          );
        }

        /*
         * -----------------------------------------------------
         * FORMAT IMAGES
         * -----------------------------------------------------
         */

        const images =
          imageData
            ?.map((image) => image.image_url)
            .filter(Boolean) || [];

        /*
         * -----------------------------------------------------
         * FORMAT VARIANTS
         * -----------------------------------------------------
         */

        const variants = variantData || [];

        /*
         * -----------------------------------------------------
         * FORMAT PRODUCT
         * -----------------------------------------------------
         */

        const formattedProduct = {
          id: productData.id,

          name: productData.name,

          slug: productData.slug,

          description: productData.description || "",

          price: productData.price,

          oldPrice: productData.old_price,

          discount: productData.discount,

          badge: productData.badge,

          category: productData.category || "",

          images,

          variants,
        };

        setProduct(formattedProduct);

        /*
         * Automatically select first image
         */

        if (images.length > 0) {
          setSelectedImage(images[0]);
        }

        /*
         * Automatically select first available size
         */

        if (variants.length > 0) {
          const availableVariant = variants.find(
            (variant) => Number(variant.stock) > 0
          );

          if (availableVariant?.size) {
            setSelectedSize(availableVariant.size);
          }
        }
      } catch (error) {
        console.error(
          "Unexpected product fetch error:",
          error
        );

        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  /*
   * =========================================================
   * AVAILABLE SIZES
   * =========================================================
   */

  const availableSizes = product?.variants
    ? [
      ...new Set(
        product.variants
          .map((variant) => variant.size)
          .filter(Boolean)
      ),
    ]
    : [];

  /*
   * =========================================================
   * SELECTED VARIANT
   * =========================================================
   */

  const selectedVariant = product?.variants?.find(
    (variant) =>
      variant.size === selectedSize &&
      Number(variant.stock) > 0
  );

  /*
   * =========================================================
   * CHECK SIZE AVAILABILITY
   * =========================================================
   */

  const isSizeAvailable = (size) => {
    return product?.variants?.some(
      (variant) =>
        variant.size === size &&
        Number(variant.stock) > 0
    );
  };

  /*
   * =========================================================
   * ADD TO BAG
   * =========================================================
   */

  const handleAddToBag = () => {
    /*
     * No size selected
     */

    if (!selectedSize) {
      setToastMessage("Please select a size first.");
      setToastOpen(true);
      return;
    }

    /*
     * Size selected but no stock
     */

    if (!selectedVariant) {
      setToastMessage(
        "Sorry, this size is currently out of stock."
      );
      setToastOpen(true);
      return;
    }

    /*
     * Create cart item
     */

    const cartItem = {
      id: product.id,

      productId: product.id,

      variantId: selectedVariant.id,

      sku: selectedVariant.sku,

      name: product.name,

      price: product.price,

      image: product.images?.[0] || "",

      images: product.images || [],

      size: selectedVariant.size,

      color: selectedVariant.color || "",

      quantity,
    };

    /*
     * Add to CartContext
     */

    addToCart(cartItem);

    /*
     * Success message
     */

    setToastMessage(
      `${product.name} added to your bag.`
    );

    setToastOpen(true);
  };

  /*
   * =========================================================
   * LOADING STATE
   * =========================================================
   */

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.15em",
            color: "#1E2D4C",
          }}
        >
          LOADING PRODUCT...
        </Typography>
      </Box>
    );
  }

  /*
   * =========================================================
   * PRODUCT NOT FOUND
   * =========================================================
   */

  if (!product) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 3,
          px: 3,
          textAlign: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-anton)",
            fontSize: {
              xs: "50px",
              md: "70px",
            },
            lineHeight: 0.9,
            color: "#1E2D4C",
          }}
        >
          PRODUCT
          <br />
          NOT FOUND
        </Typography>

        <Button
          href="/shop"
          sx={{
            backgroundColor: "#1E2D4C",
            color: "#FFFFFF",
            borderRadius: 0,
            px: 4,
            py: 1.5,
            fontFamily: "var(--font-montserrat)",
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: "0.12em",

            "&:hover": {
              backgroundColor: "#ACBDAA",
              color: "#1E2D4C",
            },
          }}
        >
          BACK TO SHOP
        </Button>
      </Box>
    );
  }

  /*
   * =========================================================
   * MAIN PRODUCT PAGE
   * =========================================================
   */

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: "#FFFFFF",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            maxWidth: "1500px",
            mx: "auto",

            px: {
              xs: 2,
              sm: 3,
              md: 5,
            },

            py: {
              xs: 4,
              md: 7,
            },

            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "1.15fr 0.85fr",
            },

            gap: {
              xs: 5,
              md: 7,
              lg: 10,
            },
          }}
        >
          {/* =================================================
              LEFT — PRODUCT IMAGES
          ================================================= */}

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "90px 1fr",
              },

              gap: 2,
            }}
          >
            {/* =================================================
                THUMBNAILS
            ================================================= */}

            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },

                flexDirection: "column",
                gap: 2,
              }}
            >
              {product.images?.map((image, index) => (
                <Box
                  key={`${image}-${index}`}
                  component="button"
                  onClick={() =>
                    setSelectedImage(image)
                  }
                  sx={{
                    padding: 0,

                    border:
                      selectedImage === image
                        ? "2px solid #1E2D4C"
                        : "2px solid transparent",

                    backgroundColor: "transparent",

                    cursor: "pointer",

                    width: "90px",
                    height: "110px",

                    overflow: "hidden",

                    transition:
                      "all 0.25s ease",

                    "&:hover": {
                      borderColor: "#ACBDAA",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    alt={`${product.name} ${index + 1
                      }`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* =================================================
                MAIN IMAGE
            ================================================= */}

            <Box
              sx={{
                position: "relative",

                width: "100%",

                aspectRatio: "3 / 4",

                overflow: "hidden",

                backgroundColor: "#F5F5F2",
              }}
            >
              {selectedImage ? (
                <Box
                  component="img"
                  src={selectedImage}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
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
                    backgroundColor: "#F5F5F2",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily:
                        "var(--font-montserrat)",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#858585",
                    }}
                  >
                    NO IMAGE
                  </Typography>
                </Box>
              )}

              {/* BADGE */}

              {product.badge && (
                <Box
                  sx={{
                    position: "absolute",

                    top: {
                      xs: 15,
                      md: 24,
                    },

                    left: {
                      xs: 15,
                      md: 24,
                    },

                    backgroundColor: "#FFFFFF",

                    px: 2,
                    py: 1.2,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily:
                        "var(--font-montserrat)",

                      fontSize: "10px",

                      fontWeight: 800,

                      letterSpacing: "0.15em",

                      color: "#1E2D4C",
                    }}
                  >
                    {product.badge}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* =================================================
              RIGHT — PRODUCT DETAILS
          ================================================= */}

          <Box
            sx={{
              pt: {
                md: 1,
              },
            }}
          >
            {/* =================================================
                CATEGORY
            ================================================= */}

            <Typography
              sx={{
                fontFamily:
                  "var(--font-montserrat)",

                fontSize: "11px",

                fontWeight: 800,

                letterSpacing: "0.25em",

                color: "#858585",

                mb: 3,
              }}
            >
              {product.category}
            </Typography>

            {/* =================================================
                PRODUCT NAME
            ================================================= */}

            <Typography
              component="h1"
              sx={{
                fontFamily:
                  "var(--font-anton)",

                fontSize: {
                  xs: "58px",
                  sm: "72px",
                  md: "70px",
                  lg: "86px",
                },

                lineHeight: 0.9,

                letterSpacing: "-1px",

                fontWeight: 400,

                color: "#1E2D4C",

                mb: 4,
              }}
            >
              {product.name}
            </Typography>

            {/* =================================================
                RATING
            ================================================= */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 0.3,

                mb: 4,

                flexWrap: "wrap",
              }}
            >
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <StarIcon
                    key={star}
                    sx={{
                      fontSize: 20,

                      color:
                        star === 5
                          ? "#858585"
                          : "#1E2D4C",
                    }}
                  />
                )
              )}

              <Typography
                sx={{
                  ml: 1.5,

                  fontFamily:
                    "var(--font-montserrat)",

                  fontSize: "12px",

                  fontWeight: 700,

                  color: "#858585",
                }}
              >
                4.5 / 5 · Customer Reviews
              </Typography>
            </Box>

            {/* =================================================
                PRICE
            ================================================= */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 2,

                flexWrap: "wrap",

                mb: 5,
              }}
            >
              <Typography
                sx={{
                  fontFamily:
                    "var(--font-montserrat)",

                  fontSize: {
                    xs: "28px",
                    md: "32px",
                  },

                  fontWeight: 800,

                  color: "#1E2D4C",
                }}
              >
                ₹{Number(product.price).toLocaleString(
                  "en-IN"
                )}
              </Typography>

              {product.oldPrice && (
                <Typography
                  sx={{
                    fontFamily:
                      "var(--font-montserrat)",

                    fontSize: "17px",

                    color: "#999999",

                    textDecoration:
                      "line-through",
                  }}
                >
                  ₹
                  {Number(
                    product.oldPrice
                  ).toLocaleString("en-IN")}
                </Typography>
              )}

              {product.discount && (
                <Typography
                  sx={{
                    fontFamily:
                      "var(--font-montserrat)",

                    fontSize: "12px",

                    fontWeight: 800,

                    color: "#ACBDAA",
                  }}
                >
                  {product.discount}
                </Typography>
              )}
            </Box>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <Typography
              sx={{
                fontFamily:
                  "var(--font-montserrat)",

                fontSize: "14px",

                lineHeight: 1.9,

                fontWeight: 500,

                color: "#858585",

                mb: 5,
              }}
            >
              {product.description}
            </Typography>

            {/* =================================================
                PRODUCT OPTIONS
            ================================================= */}

            <Box
              sx={{
                borderTop:
                  "1px solid #E5E5E5",

                pt: 4,
              }}
            >
              {/* =================================================
                  SIZE HEADER
              ================================================= */}

              <Box
                sx={{
                  display: "flex",

                  justifyContent:
                    "space-between",

                  alignItems: "center",

                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily:
                      "var(--font-montserrat)",

                    fontSize: "12px",

                    fontWeight: 800,

                    letterSpacing: "0.12em",

                    color: "#1E2D4C",
                  }}
                >
                  SELECT SIZE
                </Typography>

                <Typography
                  sx={{
                    fontFamily:
                      "var(--font-montserrat)",

                    fontSize: "11px",

                    fontWeight: 700,

                    textDecoration:
                      "underline",

                    color: "#858585",

                    cursor: "pointer",
                  }}
                >
                  SIZE GUIDE
                </Typography>
              </Box>

              {/* =================================================
                  SIZE BUTTONS
              ================================================= */}

              {availableSizes.length > 0 ? (
                <Box
                  sx={{
                    display: "grid",

                    gridTemplateColumns:
                      "repeat(5, 1fr)",

                    gap: 1,

                    mb: 4,
                  }}
                >
                  {availableSizes.map(
                    (size) => {
                      const available =
                        isSizeAvailable(size);

                      return (
                        <Button
                          key={size}
                          disabled={!available}
                          onClick={() =>
                            setSelectedSize(size)
                          }
                          sx={{
                            minWidth: 0,

                            height: 58,

                            border:
                              selectedSize === size
                                ? "2px solid #1E2D4C"
                                : "1px solid #D8D8D8",

                            backgroundColor:
                              selectedSize === size
                                ? "#ACBDAA"
                                : "#FFFFFF",

                            borderRadius: 0,

                            color: "#1E2D4C",

                            fontFamily:
                              "var(--font-montserrat)",

                            fontSize: "12px",

                            fontWeight: 800,

                            opacity: available
                              ? 1
                              : 0.4,

                            "&:hover": {
                              backgroundColor:
                                available
                                  ? "#ACBDAA"
                                  : "#FFFFFF",

                              borderColor:
                                available
                                  ? "#ACBDAA"
                                  : "#D8D8D8",
                            },

                            "&.Mui-disabled": {
                              color: "#999999",
                              borderColor:
                                "#D8D8D8",
                            },
                          }}
                        >
                          {size}
                        </Button>
                      );
                    }
                  )}
                </Box>
              ) : (
                <Typography
                  sx={{
                    fontFamily:
                      "var(--font-montserrat)",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#858585",
                    mb: 4,
                  }}
                >
                  Size information is not
                  available.
                </Typography>
              )}

              {/* =================================================
                  SELECTED STOCK
              ================================================= */}

              {selectedVariant && (
                <Typography
                  sx={{
                    fontFamily:
                      "var(--font-montserrat)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color:
                      Number(
                        selectedVariant.stock
                      ) <= 5
                        ? "#B26A00"
                        : "#858585",
                    mb: 3,
                  }}
                >
                  {Number(
                    selectedVariant.stock
                  ) <= 5
                    ? `Only ${selectedVariant.stock} left in stock`
                    : "In stock"}
                </Typography>
              )}

              {/* =================================================
                  QUANTITY
              ================================================= */}

              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  justifyContent:
                    "space-between",

                  mb: 4,
                }}
              >
                <Typography
                  sx={{
                    fontFamily:
                      "var(--font-montserrat)",

                    fontSize: "12px",

                    fontWeight: 800,

                    letterSpacing: "0.12em",

                    color: "#1E2D4C",
                  }}
                >
                  QUANTITY
                </Typography>

                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",

                    border:
                      "1px solid #D8D8D8",
                  }}
                >
                  <Button
                    onClick={() =>
                      setQuantity(
                        (current) =>
                          Math.max(
                            1,
                            current - 1
                          )
                      )
                    }
                    sx={{
                      minWidth: 42,

                      height: 42,

                      borderRadius: 0,

                      color: "#1E2D4C",

                      fontSize: "18px",

                      "&:hover": {
                        backgroundColor:
                          "#ACBDAA",
                      },
                    }}
                  >
                    −
                  </Button>

                  <Typography
                    sx={{
                      width: 45,

                      textAlign: "center",

                      fontFamily:
                        "var(--font-montserrat)",

                      fontSize: "13px",

                      fontWeight: 800,

                      color: "#1E2D4C",
                    }}
                  >
                    {quantity}
                  </Typography>

                  <Button
                    onClick={() =>
                      setQuantity(
                        (current) =>
                          Math.min(
                            selectedVariant
                              ? Number(
                                selectedVariant.stock
                              )
                              : 10,
                            current + 1
                          )
                      )
                    }
                    disabled={
                      selectedVariant
                        ? quantity >=
                        Number(
                          selectedVariant.stock
                        )
                        : false
                    }
                    sx={{
                      minWidth: 42,

                      height: 42,

                      borderRadius: 0,

                      color: "#1E2D4C",

                      fontSize: "18px",

                      "&:hover": {
                        backgroundColor:
                          "#ACBDAA",
                      },
                    }}
                  >
                    +
                  </Button>
                </Box>
              </Box>

              {/* =================================================
                  ACTION BUTTONS
              ================================================= */}

              <Box
                sx={{
                  display: "flex",

                  gap: 1.5,
                }}
              >
                <Button
                  fullWidth
                  onClick={
                    handleAddToBag
                  }
                  startIcon={
                    <ShoppingBagOutlinedIcon />
                  }
                  sx={{
                    height: 58,

                    borderRadius: 0,

                    backgroundColor:
                      "#1E2D4C",

                    color: "#FFFFFF",

                    fontFamily:
                      "var(--font-montserrat)",

                    fontSize: "11px",

                    fontWeight: 800,

                    letterSpacing: "0.12em",

                    "&:hover": {
                      backgroundColor:
                        "#ACBDAA",

                      color: "#1E2D4C",
                    },
                  }}
                >
                  ADD TO BAG
                </Button>

                <IconButton
                  aria-label="Add to wishlist"
                  sx={{
                    width: 58,

                    height: 58,

                    border:
                      "1px solid #D8D8D8",

                    borderRadius: 0,

                    color: "#1E2D4C",

                    "&:hover": {
                      backgroundColor:
                        "#ACBDAA",

                      borderColor:
                        "#ACBDAA",
                    },
                  }}
                >
                  <FavoriteBorderIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* =====================================================
          SUCCESS / ERROR MESSAGE
      ===================================================== */}

      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() =>
          setToastOpen(false)
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() =>
            setToastOpen(false)
          }
          severity={
            selectedSize
              ? "success"
              : "warning"
          }
          variant="filled"
          sx={{
            fontFamily:
              "var(--font-montserrat)",

            fontSize: "11px",

            fontWeight: 700,
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}