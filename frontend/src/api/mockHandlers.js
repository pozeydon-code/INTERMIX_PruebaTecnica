import { loadProducts, createCart, getCart, setCart } from "./mockDb";

function notFound() {
  const err = new Error("NotFound");
  err.status = 404;
  throw err;
}
function parseUrl(url) {
  return new URL(url, "http://x");
}

export async function route({ method = "get", url, body, params }) {
  const m = method.toUpperCase();
  const u = parseUrl(url);
  const path = u.pathname;

  if (
    m === "GET" &&
    (path === "/catalog/products" || path === "catalog/products")
  ) {
    const categoryId = Number(
      u.searchParams.get("categoryId") ?? params?.categoryId ?? NaN,
    );
    const all = await loadProducts();
    return Number.isNaN(categoryId)
      ? all
      : all.filter((p) => p.categoryId === categoryId);
  }
  if (m === "GET" && path.startsWith("/products/")) {
    const id = Number(path.split("/").pop());
    const all = await loadProducts();
    const p = all.find((x) => x.id === id);
    if (!p) notFound();
    return p;
  }

  // --- Carts ---
  if (m === "POST" && path === "/carts") {
    const c = createCart();
    return { cartId: c.id };
  }
  if (m === "GET" && path.startsWith("/carts/")) {
    const id = path.split("/")[2];
    const c = getCart();
    if (c.id !== id) notFound();
    const items = c.items.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
    }));
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
    return { id: c.id, items, total };
  }
  if (m === "POST" && path.endsWith("/items") && path.startsWith("/carts/")) {
    const id = path.split("/")[2];
    const { productId, quantity } = body ?? {};
    const c = getCart();
    if (c.id !== id) notFound();
    const products = await loadProducts();
    const p = products.find((x) => x.id === Number(productId));
    if (!p) notFound();
    const existing = c.items.find((x) => x.id === p.id);
    if (existing) existing.quantity += Number(quantity ?? 1);
    else
      c.items.push({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: Number(quantity ?? 1),
        imageUrl: 
      });
    setCart(c);
    return { ok: true };
  }
  if (m === "PATCH" && /\/carts\/[^/]+\/items\/\d+$/.test(path)) {
    const [, , cartId, , productId] = path.split("/");
    const { quantity } = body ?? {};
    const c = getCart();
    if (c.id !== cartId) notFound();
    const it = c.items.find((x) => x.id === Number(productId));
    if (!it) notFound();
    it.quantity = Number(quantity);
    if (it.quantity <= 0)
      c.items = c.items.filter((x) => x.id !== Number(productId));
    setCart(c);
    return { ok: true };
  }
  if (m === "DELETE" && /\/carts\/[^/]+\/items\/\d+$/.test(path)) {
    const [, , cartId, , productId] = path.split("/");
    const c = getCart();
    if (c.id !== cartId) notFound();
    c.items = c.items.filter((x) => x.id !== Number(productId));
    setCart(c);
    return {};
  }
  if (m === "DELETE" && path.endsWith("/items") && path.startsWith("/carts/")) {
    const cartId = path.split("/")[2];
    const c = getCart();
    if (c.id !== cartId) notFound();
    c.items = [];
    setCart(c);
    return {};
  }

  // --- Orders ---
  if (m === "POST" && path === "/orders") {
    const { cartId } = body ?? {};
    const c = getCart();
    if (c.id !== cartId) notFound();
    const total = c.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const orderNumber = `ORD-${new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, "")
      .slice(0, 14)}-${cartId.slice(0, 8)}`;
    // vaciamos carrito (comportamiento igual al backend de ejemplo)
    c.items = [];
    setCart(c);
    return { orderNumber, createdAt: new Date().toISOString(), total };
  }

  throw new Error(`No mock for ${m} ${path}`);
}
