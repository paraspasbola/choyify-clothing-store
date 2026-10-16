"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext(null);

const WISHLIST_STORAGE_KEY = "choyify_wishlist";

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // =========================================================
  // LOAD WISHLIST FROM LOCAL STORAGE
  // =========================================================

  useEffect(() => {
    try {
      const savedWishlist =
        localStorage.getItem(WISHLIST_STORAGE_KEY);

      if (savedWishlist) {
        const parsedWishlist =
          JSON.parse(savedWishlist);

        if (Array.isArray(parsedWishlist)) {
          setWishlist(parsedWishlist);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load wishlist:",
        error
      );
    }

    setIsLoaded(true);
  }, []);

  // =========================================================
  // SAVE WISHLIST TO LOCAL STORAGE
  // =========================================================

  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error(
        "Failed to save wishlist:",
        error
      );
    }
  }, [wishlist, isLoaded]);

  // =========================================================
  // ADD TO WISHLIST
  // =========================================================

  const addToWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const alreadyExists =
        currentWishlist.some(
          (item) => item.id === product.id
        );

      if (alreadyExists) {
        return currentWishlist;
      }

      return [
        ...currentWishlist,
        product,
      ];
    });
  };

  // =========================================================
  // REMOVE FROM WISHLIST
  // =========================================================

  const removeFromWishlist = (productId) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) => item.id !== productId
      )
    );
  };

  // =========================================================
  // TOGGLE WISHLIST
  // =========================================================

  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [
        ...currentWishlist,
        product,
      ];
    });
  };

  // =========================================================
  // CHECK IF PRODUCT IS IN WISHLIST
  // =========================================================

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  // =========================================================
  // CLEAR WISHLIST
  // =========================================================

  const clearWishlist = () => {
    setWishlist([]);
  };

  // =========================================================
  // WISHLIST COUNT
  // =========================================================

  const wishlistCount = wishlist.length;

  // =========================================================
  // CONTEXT
  // =========================================================

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,

        addToWishlist,
        removeFromWishlist,
        toggleWishlist,

        isInWishlist,

        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// =========================================================
// USE WISHLIST
// =========================================================

export function useWishlist() {
  const context =
    useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}