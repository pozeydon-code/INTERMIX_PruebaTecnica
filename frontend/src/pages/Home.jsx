import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import CartSideBar from "../components/CartSideBar";
import { useCatalog } from "../hooks/useCatalog";
import { useCart } from "../hooks/useCart";
import { useDialogContext } from "../context/DialogContext";
import ProductModal from "../components/ProductModal";
import { useState } from "react";

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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, loading, error } = useCatalog();
  const { setIsModalOpen } = useDialogContext();
  const {
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    getItemQuantity,
    clearCart,
  } = useCart();

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const handleProductClick = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

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
        products={cart}
        clearCart={clearCart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
      />

      <ProductModal
        product={selectedProduct}
        getItemQuantity={getItemQuantity}
        addItem={addToCart}
        closeModal={handleCloseModal}
      />
    </div>
  );
};

export default Home;
