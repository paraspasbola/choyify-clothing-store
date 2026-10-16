"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "choyify-cart";

/* =========================================================
   CART PROVIDER
========================================================= */

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /* =======================================================
     LOAD CART FROM LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    try {
      const savedCart =
        window.localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /* =======================================================
     SAVE CART TO LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    if (!isLoaded) return;

    try {
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems, isLoaded]);

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      /*
       * Use variantId as the unique identifier.
       *
       * Example:
       * Same shirt + M + Green
       * Same shirt + M + Black
       *
       * These must be two different cart items.
       */

      const existingItemIndex = currentItems.findIndex(
        (item) => {
          if (product.variantId && item.variantId) {
            return item.variantId === product.variantId;
          }

          /*
           * Fallback for older cart items
           */
          return (
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
          );
        }
      );

      /* ===================================================
         PRODUCT ALREADY EXISTS
      =================================================== */

      if (existingItemIndex !== -1) {
        return currentItems.map((item, index) => {
          if (index !== existingItemIndex) {
            return item;
          }

          return {
            ...item,
            quantity:
              Number(item.quantity || 0) +
              Number(product.quantity || 1),
          };
        });
      }

      /* ===================================================
         NEW PRODUCT
      =================================================== */

      return [
        ...currentItems,
        {
          ...product,

          quantity: Number(
            product.quantity || 1
          ),
        },
      ];
    });
  };

  /* =======================================================
     REMOVE FROM CART
  ======================================================= */

  const removeFromCart = (
    productId,
    size,
    variantId
  ) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => {
        if (variantId) {
          return item.variantId !== variantId;
        }

        return !(
          item.id === productId &&
          item.size === size
        );
      })
    );
  };

  /* =======================================================
     INCREASE QUANTITY
  ======================================================= */

  const increaseQuantity = (
    productId,
    size,
    variantId
  ) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        const isSameItem = variantId
          ? item.variantId === variantId
          : item.id === productId &&
            item.size === size;

        if (isSameItem) {
          return {
            ...item,
            quantity:
              Number(item.quantity || 0) + 1,
          };
        }

        return item;
      })
    );
  };

  /* =======================================================
     DECREASE QUANTITY
  ======================================================= */

  const decreaseQuantity = (
    productId,
    size,
    variantId
  ) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => {
          const isSameItem = variantId
            ? item.variantId === variantId
            : item.id === productId &&
              item.size === size;

          if (isSameItem) {
            return {
              ...item,
              quantity: Math.max(
                1,
                Number(item.quantity || 1) - 1
              ),
            };
          }

          return item;
        })
        .filter(
          (item) =>
            Number(item.quantity || 0) > 0
        )
    );
  };

  /* =======================================================
     UPDATE QUANTITY
  ======================================================= */

  const updateQuantity = (
    productId,
    size,
    quantity,
    variantId
  ) => {
    const newQuantity = Math.max(
      1,
      Number(quantity || 1)
    );

    setCartItems((currentItems) =>
      currentItems.map((item) => {
        const isSameItem = variantId
          ? item.variantId === variantId
          : item.id === productId &&
            item.size === size;

        if (isSameItem) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }

        return item;
      })
    );
  };

  /* =======================================================
     CLEAR CART
  ======================================================= */

  const clearCart = () => {
    setCartItems([]);
  };

  /* =======================================================
     PRICE HELPER
  ======================================================= */

  const getNumericPrice = (price) => {
    if (typeof price === "number") {
      return price;
    }

    if (typeof price === "string") {
      return Number(
        price.replace(/[₹,\s]/g, "")
      );
    }

    return 0;
  };

  /* =======================================================
     CART COUNT
  ======================================================= */

  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );
  }, [cartItems]);

  /* =======================================================
     CART SUBTOTAL
  ======================================================= */

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => {
        const price = getNumericPrice(
          item.price
        );

        const quantity = Number(
          item.quantity || 0
        );

        return total + price * quantity;
      },
      0
    );
  }, [cartItems]);

  /* =======================================================
     CART TOTAL
  ======================================================= */

  const cartTotal = cartSubtotal;

  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const value = {
    cartItems,

    cartCount,

    cartSubtotal,

    cartTotal,

    addToCart,

    removeFromCart,

    increaseQuantity,

    decreaseQuantity,

    updateQuantity,

    clearCart,

    isLoaded,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/* =========================================================
   USE CART
========================================================= */

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}