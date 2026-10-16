"use client";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useCart } from "../../components/cart/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F5F2",
        px: {
          xs: 2,
          sm: 3,
          md: 5,
        },
        py: {
          xs: 6,
          md: 10,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        {/* HEADER */}

        <Typography
          sx={{
            fontFamily:
              "var(--font-montserrat)",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "0.25em",
            color: "#858585",
            mb: 2,
          }}
        >
          YOUR SHOPPING BAG
        </Typography>

        <Typography
          component="h1"
          sx={{
            fontFamily: "var(--font-anton)",
            fontSize: {
              xs: "60px",
              md: "90px",
            },
            lineHeight: 0.9,
            color: "#1E2D4C",
            mb: 7,
          }}
        >
          YOUR
          <br />
          <Box
            component="span"
            sx={{
              color: "#ACBDAA",
            }}
          >
            BAG.
          </Box>
        </Typography>

        {/* EMPTY CART */}

        {cartItems.length === 0 ? (
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              p: {
                xs: 4,
                md: 8,
              },
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  "var(--font-montserrat)",
                fontSize: "15px",
                fontWeight: 600,
                color: "#858585",
                mb: 3,
              }}
            >
              YOUR BAG IS EMPTY
            </Typography>

            <Button
              href="/"
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
          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                md: "1.5fr 0.5fr",
              },

              gap: 4,
            }}
          >
            {/* PRODUCTS */}

            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                p: {
                  xs: 2,
                  md: 4,
                },
              }}
            >
              {cartItems.map(
                (item, index) => (
                  <Box key={`${item.id}-${item.size}`}>
                    <Box
                      sx={{
                        display: "grid",

                        gridTemplateColumns: {
                          xs: "90px 1fr",
                          sm: "130px 1fr",
                        },

                        gap: 3,
                        py: 2,
                      }}
                    >
                      {/* IMAGE */}

                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{
                          width: "100%",
                          aspectRatio:
                            "3 / 4",
                          objectFit: "cover",
                        }}
                      />

                      {/* DETAILS */}

                      <Box>
                        <Typography
                          sx={{
                            fontFamily:
                              "var(--font-montserrat)",
                            fontSize: "10px",
                            fontWeight: 800,
                            letterSpacing:
                              "0.15em",
                            color: "#858585",
                            mb: 1,
                          }}
                        >
                          {item.size}
                        </Typography>

                        <Typography
                          sx={{
                            fontFamily:
                              "var(--font-montserrat)",
                            fontSize: {
                              xs: "14px",
                              md: "16px",
                            },
                            fontWeight: 700,
                            color: "#1E2D4C",
                            mb: 1,
                          }}
                        >
                          {item.name}
                        </Typography>

                        <Typography
                          sx={{
                            fontFamily:
                              "var(--font-montserrat)",
                            fontSize: "14px",
                            fontWeight: 800,
                            color: "#1E2D4C",
                            mb: 3,
                          }}
                        >
                          {item.price}
                        </Typography>

                        {/* QUANTITY */}

                        <Box
                          sx={{
                            display: "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems:
                                "center",
                              border:
                                "1px solid #D8D8D8",
                            }}
                          >
                            <Button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.quantity -
                                    1
                                )
                              }
                              sx={{
                                minWidth: 38,
                                height: 38,
                                borderRadius: 0,
                                color:
                                  "#1E2D4C",
                              }}
                            >
                              −
                            </Button>

                            <Typography
                              sx={{
                                width: 38,
                                textAlign:
                                  "center",
                                fontFamily:
                                  "var(--font-montserrat)",
                                fontSize:
                                  "12px",
                                fontWeight:
                                  800,
                              }}
                            >
                              {item.quantity}
                            </Typography>

                            <Button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.quantity +
                                    1
                                )
                              }
                              sx={{
                                minWidth: 38,
                                height: 38,
                                borderRadius: 0,
                                color:
                                  "#1E2D4C",
                              }}
                            >
                              +
                            </Button>
                          </Box>

                          {/* DELETE */}

                          <IconButton
                            onClick={() =>
                              removeFromCart(
                                item.id,
                                item.size
                              )
                            }
                            sx={{
                              color:
                                "#858585",

                              "&:hover": {
                                color:
                                  "#1E2D4C",
                                backgroundColor:
                                  "rgba(172,189,170,0.15)",
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>

                    {index <
                      cartItems.length -
                        1 && (
                      <Divider />
                    )}
                  </Box>
                )
              )}
            </Box>

            {/* SUMMARY */}

            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                p: {
                  xs: 3,
                  md: 4,
                },
                height: "fit-content",
              }}
            >
              <Typography
                sx={{
                  fontFamily:
                    "var(--font-montserrat)",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  color: "#1E2D4C",
                  mb: 4,
                }}
              >
                ORDER SUMMARY
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily:
                      "var(--font-montserrat)",
                    fontSize: "13px",
                    color: "#858585",
                  }}
                >
                  Subtotal
                </Typography>

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
                  {cartTotal.toLocaleString(
                    "en-IN"
                  )}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  mb: 4,
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
                  TOTAL
                </Typography>

                <Typography
                  sx={{
                    fontFamily:
                      "var(--font-montserrat)",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#1E2D4C",
                  }}
                >
                  ₹
                  {cartTotal.toLocaleString(
                    "en-IN"
                  )}
                </Typography>
              </Box>

              <Button
                fullWidth
                href="/checkout"
                sx={{
                  height: 56,
                  borderRadius: 0,
                  backgroundColor:
                    "#1E2D4C",
                  color: "#FFFFFF",

                  fontFamily:
                    "var(--font-montserrat)",

                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing:
                    "0.15em",

                  "&:hover": {
                    backgroundColor:
                      "#ACBDAA",
                    color: "#1E2D4C",
                  },
                }}
              >
                PROCEED TO CHECKOUT
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}