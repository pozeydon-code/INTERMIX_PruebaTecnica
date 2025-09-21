import { useEffect, useState } from "react";
import { getProducts } from "../api/catalogService";

export const useCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        setLoading(true);
        const request = await getProducts();
        setProducts(request);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { loading, products, error };
};
