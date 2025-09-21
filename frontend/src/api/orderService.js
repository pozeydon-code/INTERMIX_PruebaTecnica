import { request } from "./transport";
import { ensureCart } from "./cartService";

export async function createOrder() {
  const cartId = await ensureCart();
  return request({ method: "post", url: "/orders", body: { cartId } });
}
