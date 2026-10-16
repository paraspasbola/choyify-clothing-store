"use client";

import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Button,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import { useCart } from "./CartContext";

export default function CartDrawer({
  open,
  onClose,
}) {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartSubtotal,
  } = useCart();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: {
              xs: "100%",
              sm: "440px",
            },
            backgroundColor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      {/* =========================================
          HEADER
      ========================================= */}

      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom:
            "1px solid rgba(30,45,76,0.1)",
          flexShrink: 0,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily:
                "var(--font-montserrat)",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: "#858585",
              mb: 0.5,
            }}
          >
            YOUR BAG
          </Typography>

          <Typography
            sx={{
              fontFamily:
                "var(--font-anton)",
              fontSize: "38px",
              lineHeight: 0.9,
              color: "#1E2D4C",
            }}
          >
            CART
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          aria-label="Close cart"
          sx={{
            color: "#1E2D4C",
            "&:hover": {
              backgroundColor: "#F5F5F2",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* =========================================
          CART CONTENT
      ========================================= */}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 3,
          py: 3,
        }}
      >
        {cartItems.length === 0 ? (
          /* =====================================
             EMPTY CART
          ===================================== */

          <Box
            sx={{
              minHeight: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily:
                    "var(--font-anton)",
                  fontSize: {
                    xs: "50px",
                    sm: "58px",
                  },
                  lineHeight: 0.9,
                  color: "#1E2D4C",
                  mb: 3,
                }}
              >
                YOUR BAG
                <br />
                IS EMPTY
              </Typography>

              <Button
                href="/shop"
                onClick={onClose}
                sx={{
                  backgroundColor:
                    "#1E2D4C",
                  color: "#FFFFFF",
                  borderRadius: 0,
                  px: 3,
                  py: 1.6,
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
                CONTINUE SHOPPING
              </Button>
            </Box>
          </Box>
        ) : (
          /* =====================================
             CART ITEMS
          ===================================== */

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {cartItems.map((item) => (
              <Box
                key={`${item.id}-${item.size || "default"}`}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "90px 1fr",
                    gap: 2,
                  }}
                >
                  {/* PRODUCT IMAGE */}

                  <Box
                    component="img"
                    src={
                      item.images?.[0] ||
                      item.image
                    }
                    alt={item.name}
                    sx={{
                      width: 90,
                      height: 115,
                      objectFit: "cover",
                      backgroundColor:
                        "#F5F5F2",
                      display: "block",
                    }}
                  />

                  {/* PRODUCT INFORMATION */}

                  <Box
                    sx={{
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily:
                          "var(--font-montserrat)",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#1E2D4C",
                        lineHeight: 1.4,
                        mb: 1,
                      }}
                    >
                      {item.name}
                    </Typography>

                    {/* SIZE */}

                    {item.size && (
                      <Typography
                        sx={{
                          fontFamily:
                            "var(--font-montserrat)",
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing:
                            "0.1em",
                          color: "#858585",
                          mb: 1,
                        }}
                      >
                        SIZE: {item.size}
                      </Typography>
                    )}

                    {/* PRICE */}

                    <Typography
                      sx={{
                        fontFamily:
                          "var(--font-montserrat)",
                        fontSize: "13px",
                        fontWeight: 800,
                        color: "#1E2D4C",
                        mb: 2,
                      }}
                    >
                      ₹
                      {Number(
                        item.price || 0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </Typography>

                    {/* QUANTITY + DELETE */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "space-between",
                        gap: 1,
                      }}
                    >
                      {/* QUANTITY */}

                      <Box
                        sx={{
                          display: "flex",
                          alignItems:
                            "center",
                          border:
                            "1px solid rgba(30,45,76,0.15)",
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            decreaseQuantity(
                              item.id,
                              item.size
                            )
                          }
                          size="small"
                          aria-label="Decrease quantity"
                          sx={{
                            width: 30,
                            height: 30,
                            borderRadius: 0,
                          }}
                        >
                          <RemoveIcon
                            sx={{
                              fontSize: 14,
                            }}
                          />
                        </IconButton>

                        <Typography
                          sx={{
                            width: 30,
                            textAlign:
                              "center",
                            fontFamily:
                              "var(--font-montserrat)",
                            fontSize: "11px",
                            fontWeight: 700,
                            color:
                              "#1E2D4C",
                          }}
                        >
                          {item.quantity}
                        </Typography>

                        <IconButton
                          onClick={() =>
                            increaseQuantity(
                              item.id,
                              item.size
                            )
                          }
                          size="small"
                          aria-label="Increase quantity"
                          sx={{
                            width: 30,
                            height: 30,
                            borderRadius: 0,
                          }}
                        >
                          <AddIcon
                            sx={{
                              fontSize: 14,
                            }}
                          />
                        </IconButton>
                      </Box>

                      {/* DELETE */}

                      <IconButton
                        onClick={() =>
                          removeFromCart(
                            item.id,
                            item.size
                          )
                        }
                        size="small"
                        aria-label="Remove product"
                        sx={{
                          color: "#858585",
                          "&:hover": {
                            color:
                              "#1E2D4C",
                            backgroundColor:
                              "#F5F5F2",
                          },
                        }}
                      >
                        <DeleteIcon
                          sx={{
                            fontSize: 20,
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>

                <Divider
                  sx={{
                    mt: 3,
                    borderColor:
                      "rgba(30,45,76,0.08)",
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* =========================================
          CART FOOTER
      ========================================= */}

      {cartItems.length > 0 && (
        <Box
          sx={{
            px: 3,
            py: 3,
            borderTop:
              "1px solid rgba(30,45,76,0.1)",
            flexShrink: 0,
            backgroundColor: "#FFFFFF",
          }}
        >
          {/* SUBTOTAL */}

          <Box
            sx={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              mb: 1.5,
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  "var(--font-montserrat)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing:
                  "0.1em",
                color: "#858585",
              }}
            >
              SUBTOTAL
            </Typography>

            <Typography
              sx={{
                fontFamily:
                  "var(--font-montserrat)",
                fontSize: "18px",
                fontWeight: 800,
                color: "#1E2D4C",
              }}
            >
              ₹
              {Number(
                cartSubtotal || 0
              ).toLocaleString(
                "en-IN"
              )}
            </Typography>
          </Box>

          {/* SHIPPING MESSAGE */}

          <Typography
            sx={{
              fontFamily:
                "var(--font-montserrat)",
              fontSize: "9px",
              lineHeight: 1.6,
              color: "#858585",
              mb: 2.5,
            }}
          >
            Shipping and taxes will be
            calculated at checkout.
          </Typography>

          {/* CHECKOUT BUTTON */}

          <Button
            fullWidth
            href="/checkout"
            onClick={onClose}
            sx={{
              height: 56,
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
      )}
    </Drawer>
  );
}