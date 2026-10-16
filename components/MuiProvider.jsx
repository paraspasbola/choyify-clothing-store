"use client";

import { ThemeProvider } from "@mui/material/styles";

import theme from "../theme/theme";

import { CartProvider } from "./cart/CartContext";
import { WishlistProvider } from "./wishlist/WishlistContext";
import { AuthProvider } from "./auth/AuthContext";

export default function MuiProvider({
  children,
}) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}