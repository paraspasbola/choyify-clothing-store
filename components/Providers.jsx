"use client";

import { CartProvider } from "./cart/CartContext";
import { WishlistProvider } from "./wishlist/WishlistContext";

export default function Providers({ children }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
      </WishlistProvider>
    </CartProvider>
  );
}