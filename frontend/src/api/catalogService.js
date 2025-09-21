import { request } from "./transport";
import { mapCategoriesToProducts } from "../utils/mapCategoriesToProducts";
import { mockGetProducts } from "./apiClient";

/**
 * Devuelve productos normalizados desde:
 *  - backend: GET /catalog  (espera array de categorías con catalogoProd[] o productos)
 *  - mock:    public/catalog.json (ya mapeado en mockGetProducts)
 */
export async function getProducts() {
  const data = await request({ method: "get", url: "/catalog/products" });
  if (!data) return mockGetProducts();

  const seemsFlatProducts =
    Array.isArray(data) &&
    data.length > 0 &&
    ("id" in data[0] || "cproId" in data[0]);

  if (seemsFlatProducts) return data;

  if (Array.isArray(data)) {
    return mapCategoriesToProducts(data);
  }

  return [];
}
