import { useEffect, useState } from "react";

const useCart = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart
      ? JSON.parse(localStorageCart)
      : { id: crypto.randomUUID(), items: [], total: 0 };
  };

  const [cart, setCart] = useState(initialCart);

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const items = prev.items ?? [];
      const existingItem = items.some((item) => item.id === product.id);
      if (existingItem) {
        return {
          ...prev,
          items: items.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + quantity, MAX_ITEMS),
                }
              : item,
          ),
        };
      }
      return {
        ...prev,
        items: [...items, { ...product, quantity }],
      };
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: (prevCart.items ?? []).filter((item) => item.id !== id),
    }));
  };

  const decreaseQuantity = (id, quantity = 1) => {
    setCart((prev) => ({
      ...prev,
      items: (prev.items ?? []).map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(MIN_ITEMS, item.quantity - quantity) }
          : item,
      ),
    }));
  };

  const increaseQuantity = (id, quantity = 1) => {
    setCart((prev) => ({
      ...prev,
      items: (prev.items ?? []).map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(MAX_ITEMS, item.quantity + quantity) }
          : item,
      ),
    }));
  };

  const getItemQuantity = (id) => {
    const finded = cart.items.find((item) => item.id === id);
    return finded ? finded.quantity : 0;
  };

  const clearCart = () => {
    setCart({ id: crypto.randomUUID(), items: [], total: 0 });
  };

  const createOrder = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    getItemQuantity,
    clearCart,
    createOrder,
  };
};

export default useCart;
