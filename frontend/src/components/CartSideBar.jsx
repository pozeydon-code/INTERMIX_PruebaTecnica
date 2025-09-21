import { Button, Drawer, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { formatCurrency } from "../utils/formatCurrency";
import { useDialogContext } from "../context/DialogContext";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";
import CartItem from "./CartItem";

const CartSideBar = ({
  products = [],
  clearCart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
}) => {
  const { isOpen, setIsOpen } = useDialogContext();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const total = () =>
    products.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col w-sm h-full bg-background">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <ShoppingCartIcon fontSize="small" />
              <h2 className="text-lg font-medium">Carrito de compras</h2>
            </div>
            <IconButton
              onClick={() => setIsOpen(false)}
              className="hover:bg-accent p-2 rounded hover:text-white transition-colors"
            >
              <CloseIcon className="h-5 w-5" />
            </IconButton>
          </div>

          <div className="flex-1 overflow-y-auto">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <ShoppingCartIcon fontSize="small" />
                <h3 className="text-lg font-medium mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-muted-foreground text-sm">
                  Agrega algunos productos para comenzar
                </p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {products.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </div>
            )}
          </div>

          {products.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="flex items-center justify-between text-lg font-medium">
                <Typography variant="body" sx={{ color: "text.primary" }}>
                  Total
                </Typography>

                <Typography variant="body" sx={{ color: "text.primary" }}>
                  {formatCurrency(total())}
                </Typography>
              </div>
              <div className="space-y-2">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary border-1 border-primary rounded text-white text-[9pt] p-3 hover:bg-primary/80"
                >
                  Proceder al pago
                </Button>
                <Button
                  onClick={clearCart}
                  className="w-full bg-transparent border-primary/40 border-1 rounded text-primary text-[9pt] p-3 hover:bg-accent/80 hover:border-accent/80 hover:text-white"
                >
                  Vaciar carrito
                </Button>
              </div>
            </div>
          )}
        </div>
      </Drawer>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        products={products}
        total={total()}
        clearCart={clearCart}
      />
    </>
  );
};

export default CartSideBar;
