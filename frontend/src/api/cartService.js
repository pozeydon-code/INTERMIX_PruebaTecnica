import { request } from "./transport";

const CART_ID_KEY = "cart_id";

function getCartId() {
  return localStorage.getItem(CART_ID_KEY);
}
function setCartId(id) {
  localStorage.setItem(CART_ID_KEY, id);
  return id;
}

export async function ensureCart() {
  let id = getCartId();
  if (!id) {
    const { cartId } = await request({ method: "post", url: "/carts" });
    id = setCartId(cartId);
  }
  return id;
}

export async function fetchCart() {
  const id = await ensureCart();
  return request({ method: "get", url: `/carts/${id}` });
}

export async function addItem(productId, quantity = 1) {
  const id = await ensureCart();
  await request({
    method: "post",
    url: `/carts/${id}/items`,
    body: { productId, quantity },
  });
  return fetchCart();
}

export async function updateQty(productId, quantity) {
  const id = await ensureCart();
  await request({
    method: "patch",
    url: `/carts/${id}/items/${productId}`,
    body: { quantity },
  });
  return fetchCart();
}

export async function removeItem(productId) {
  const id = await ensureCart();
  await request({ method: "delete", url: `/carts/${id}/items/${productId}` });
  return fetchCart();
}

export async function clearCart() {
  const id = await ensureCart();
  await request({ method: "delete", url: `/carts/${id}/items` });
  return fetchCart();
}
