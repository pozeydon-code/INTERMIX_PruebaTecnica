export function mapCategoriesToProducts(categories = []) {
  return categories.flatMap((c) =>
    (c.catalogoProd || []).map((p) => ({
      id: p.cproId ?? p.id,
      code: p.cproCodigo ?? p.code,
      name: p.cproNombre ?? p.name,
      brand: p.cproMarca ?? p.brand ?? "Genérico",
      description: p.cproDescripcion ?? "",
      price: p.price ?? (p.cproCodigo % 50) + 9.99,
      imageUrl:
        p.imageUrl ??
        `https://picsum.photos/seed/${p.cproId || p.cproCodigo}/480/360`,
      categoryId: c.caprId ?? c.id,
    })),
  );
}
