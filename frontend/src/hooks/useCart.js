import { useEffect, useState } from "react";
import * as cartSvc from "../api/cartService";
import * as orderSvc from "../api/orderService";
import { useCallback } from "react";
import CartSideBar from "../components/CartSideBar";

const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

const useCart = () => {
  const [cart, setCart] = useState({ id: null, items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const c = await cartSvc.fetchCart();
      setCart(c);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addToCart = async (product, quantity = 1) => {
    await cartSvc.addItem(product.id ?? product.id, quantity);
    await refresh();
  };

  const removeFromCart = async (id) => {
    await cartSvc.removeItem(id);
    await refresh();
  };

  const decreaseQuantity = async (id) => {
    const it = cart.items.find((i) => i.id === id);
    if (!it) return;
    const newQty = Math.max(MIN_ITEMS, it.quantity - 1);
    await cartSvc.updateQty(id, newQty);
    await refresh();
  };

  const increaseQuantity = async (id) => {
    const it = cart.items.find((i) => i.id === id);
    console.log(it);
    if (!it) return;
    const newQty = Math.min(MAX_ITEMS, it.quantity + 1);
    console.log(newQty);
    await cartSvc.updateQty(id, newQty);
    await refresh();
  };

  const getItemQuantity = (id) =>
    cart.items.find((i) => i.id === id)?.quantity ?? 0;

  const clearCart = async () => {
    await cartSvc.clearCart();
    await refresh();
  };

  const createOrder = async () => {
    await orderSvc.createOrder();
  };

  return {
    cart,
    loading,
    error,
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
