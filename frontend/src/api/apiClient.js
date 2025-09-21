import { mapCategoriesToProducts } from "../utils/mapCategoriesToProducts.js";

export const mockGetProducts = async () => {
  const res = await fetch("catalog.json");
  if (!res.ok) throw new Error("No se pudo cargar catalog.json");
  const raw = await res.json();
  return mapCategoriesToProducts(raw);
};
