import { useEffect, useState } from "react";
import { mockGetProducts } from "../api/apiClient";

export const useCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setError(null);
        setLoading(true);
        const request = await mockGetProducts();
        setProducts(request);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return { loading, products, error };
};
