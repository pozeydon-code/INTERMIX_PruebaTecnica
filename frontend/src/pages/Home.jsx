import Header from "@/components/Header";

import { db } from "@/data/catalogo";

import { useMemo, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const catalogos = db;
    const productos = catalogos.flatMap((c) => c.catalogoProd);
    setProductos(productos);
  }, []);

  const gridCols = useMemo(
    () => "grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    [],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Header />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3 space-y-4"></div>

        <main className="col-span-12 md:col-span-9">
          {productos.length === 0 ? (
            <span className="text-red-500">No existen productos</span>
          ) : (
            <div className={`grid gap-4 ${gridCols}`}>
              {productos.map((p) => (
                <ProductCard key={p.cproId} product={p} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
