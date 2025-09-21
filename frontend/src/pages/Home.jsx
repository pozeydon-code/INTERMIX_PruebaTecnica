import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import CartSideBar from "../components/CartSideBar";
import { CircularProgress } from "@mui/material";
import ErrorModal from "../components/ErrorModal";
import ProductModal from "../components/ProductModal";
// import useCart from "../hooks/useCart";
import useCart from "@cartHook";
import { useDialogContext } from "../context/DialogContext";
import { useState } from "react";
import { useEffect } from "react";
import { getProducts } from "../api/catalogService";

const Hero = () => {
  return (
    <section className="py-16 px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
          Obten cualquier producto desde la comodidad de tu casa con solo unos
          clics.
        </p>
      </div>
    </section>
  );
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { setIsModalOpen } = useDialogContext();
  const {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    getItemQuantity,
    clearCart,
    createOrder,
  } = useCart();

  const handleProductClick = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    (async () => setProducts(await getProducts()))();
    console.log(products);
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} />

      <Hero />

      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl font-medium mb-2">
                Productos destacados
              </h2>
              <p className="text-muted-foreground">
                Descubre nuestra colección
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                openModal={handleProductClick}
              />
            ))}
          </div>
        </div>
      </section>

      <CartSideBar
        products={cart?.items}
        clearCart={clearCart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        createOrder={createOrder}
      />

      <ProductModal
        product={selectedProduct}
        getItemQuantity={getItemQuantity}
        addItem={addToCart}
        closeModal={handleCloseModal}
      />

      <ErrorModal isOpen={error} onClose={true} error={error} />
    </div>
  );
};

export default Home;
