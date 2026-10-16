"use client";

import { useState } from "react";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuIcon from "@mui/icons-material/Menu";

import { useCart } from "../cart/CartContext";
import { useWishlist } from "../wishlist/WishlistContext";

import CartDrawer from "../cart/CartDrawer";

export default function Navbar() {
  const { cartCount } = useCart();

  const { wishlistCount } = useWishlist();

  const [cartOpen, setCartOpen] = useState(false);

  const navItems = [
    {
      label: "NEW IN",
      href: "/shop",
    },
    {
      label: "WOMEN",
      href: "/women",
    },
    {
      label: "MEN",
      href: "/men",
    },
    {
      label: "ACCESSORIES",
      href: "/accessories",
    },
    {
      label: "SALE",
      href: "/sale",
    },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "#FFFFFF",
          color: "#1E2D4C",
          borderBottom:
            "1px solid rgba(30,45,76,0.08)",
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            minHeight: {
              xs: "68px",
              md: "86px",
            },

            px: {
              xs: 2,
              sm: 3,
              md: 5,
              lg: 7,
            },

            display: "flex",
            justifyContent: "space-between",

            position: "relative",
          }}
        >

          {/* MOBILE MENU */}

          <IconButton
            aria-label="Open menu"
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },

              color: "#1E2D4C",

              width: 42,
              height: 42,

              "&:hover": {
                backgroundColor:
                  "rgba(172,189,170,0.12)",
                color: "#ACBDAA",
              },
            }}
          >
            <MenuIcon />
          </IconButton>


          {/* LOGO */}

          <Box
            component="a"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",

              textDecoration: "none",

              position: {
                xs: "absolute",
                md: "static",
              },

              left: {
                xs: "50%",
                md: "auto",
              },

              transform: {
                xs: "translateX(-50%)",
                md: "none",
              },
            }}
          >
            <Typography
              component="span"
              sx={{
                fontFamily:
                  "var(--font-anton)",

                fontSize: {
                  xs: "32px",
                  sm: "36px",
                  md: "42px",
                  lg: "46px",
                },

                lineHeight: 0.9,

                letterSpacing: "-1.5px",

                fontWeight: 400,

                color: "#1E2D4C",

                whiteSpace: "nowrap",
              }}
            >
              CHŌYIFY
            </Typography>
          </Box>


          {/* DESKTOP NAVIGATION */}

          <Box
            component="nav"
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },

              alignItems: "center",

              gap: {
                md: 3,
                lg: 4.5,
              },

              ml: "auto",
              mr: 5,
            }}
          >
            {navItems.map((item) => (
              <Typography
                key={item.label}
                component="a"
                href={item.href}
                sx={{
                  fontFamily:
                    "var(--font-montserrat)",

                  fontSize: {
                    md: "12px",
                    lg: "13px",
                  },

                  fontWeight: 800,

                  letterSpacing: "0.08em",

                  color: "#1E2D4C",

                  textDecoration: "none",

                  position: "relative",

                  whiteSpace: "nowrap",

                  transition:
                    "color 0.3s ease",

                  "&::after": {
                    content: '""',

                    position: "absolute",

                    left: 0,

                    bottom: "-8px",

                    width: 0,

                    height: "2px",

                    backgroundColor:
                      "#ACBDAA",

                    transition:
                      "width 0.3s ease",
                  },

                  "&:hover": {
                    color: "#ACBDAA",
                  },

                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>


          {/* ACTIONS */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",

              gap: {
                xs: 0,
                md: 0.3,
              },
            }}
          >

            {/* SEARCH */}

            <IconButton
              aria-label="Search"
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },

                color: "#1E2D4C",

                "&:hover": {
                  color: "#ACBDAA",
                  backgroundColor:
                    "rgba(172,189,170,0.12)",
                },
              }}
            >
              <SearchIcon />
            </IconButton>


            {/* WISHLIST */}

            <IconButton
              component="a"
              href="/wishlist"
              aria-label="Wishlist"
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },

                color: "#1E2D4C",

                textDecoration: "none",

                "&:hover": {
                  color: "#ACBDAA",
                  backgroundColor:
                    "rgba(172,189,170,0.12)",
                },
              }}
            >
              <Badge
                badgeContent={wishlistCount}
                showZero={false}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor:
                      "#ACBDAA",

                    color: "#1E2D4C",

                    fontFamily:
                      "var(--font-montserrat)",

                    fontSize: "9px",

                    fontWeight: 800,

                    minWidth: "18px",

                    height: "18px",

                    border:
                      "2px solid #FFFFFF",

                    right: -4,

                    top: 2,
                  },
                }}
              >
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>


            {/* ACCOUNT */}

            <IconButton
              component="a"
              href="/account"
              aria-label="Account"
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },

                color: "#1E2D4C",

                "&:hover": {
                  color: "#ACBDAA",
                  backgroundColor:
                    "rgba(172,189,170,0.12)",
                },
              }}
            >
              <AccountCircleOutlinedIcon />
            </IconButton>


            {/* CART */}

            <IconButton
              onClick={() => setCartOpen(true)}
              aria-label="Shopping bag"
              sx={{
                color: "#1E2D4C",

                "&:hover": {
                  color: "#ACBDAA",
                  backgroundColor:
                    "rgba(172,189,170,0.12)",
                },
              }}
            >
              <Badge
                badgeContent={cartCount}
                showZero={false}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor:
                      "#ACBDAA",

                    color: "#1E2D4C",

                    fontFamily:
                      "var(--font-montserrat)",

                    fontSize: "9px",

                    fontWeight: 800,

                    minWidth: "18px",

                    height: "18px",

                    border:
                      "2px solid #FFFFFF",

                    right: -4,

                    top: 2,
                  },
                }}
              >
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>

          </Box>
        </Toolbar>
      </AppBar>


      {/* CART DRAWER */}

      <CartDrawer
        open={cartOpen}
        onClose={() =>
          setCartOpen(false)
        }
      />
    </>
  );
}