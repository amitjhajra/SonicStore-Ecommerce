import { createContext, useState, useEffect } from "react";

// Context API: makes the shopping cart available to every page
// (Navbar badge, Product page "Add to Cart", Cart page, Checkout page)
// without passing it down as props everywhere.
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load any saved cart from localStorage so it survives a page refresh
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Every time the cart changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item._id === product._id);

      if (existing) {
        // already in cart -> just bump the quantity
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + qty } : item
        );
      }

      // not in cart yet -> add it
      return [...prevItems, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const updateQty = (id, qty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, qty } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Price calculations - used on the Cart page and Checkout page
  const itemsCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.qty * item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        itemsCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
