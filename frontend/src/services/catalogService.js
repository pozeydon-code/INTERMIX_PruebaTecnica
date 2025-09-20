export async function fetchCatalog() {
  const res = await fetch("/data/catalog.json");
  if (!res.ok) throw new Error("No se pudo cargar catalog.json");
  const raw = await res.json();
  // El JSON es un array que mezcla categorías con/ sin productos
  return raw;
}

/** Flatea todos los productos de todas las categorías */
export async function fetchAllProducts() {
  const cats = await fetchCatalog();
  return cats.flatMap((c) =>
    c.productos.map((p) => ({ ...p, categoryName: c.nombre })),
  );
}
