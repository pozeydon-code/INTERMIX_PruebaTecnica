import { Button, Card, CardContent, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { formatCurrency } from "../utils/formatCurrency";
import { useState } from "react";

const CheckoutModal = ({ isOpen, onClose, products, total, clearCart }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsSuccess(true);

    // Limpiar carrito después de 2 segundos
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <>
        <Dialog open={isOpen} onClose={onClose}>
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">¡Pago exitoso!</h3>
            <p className="text-muted-foreground">
              Tu pedido ha sido procesado correctamente
            </p>
          </div>
        </Dialog>
      </>
    );
  }

  return (
    <Dialog open={isOpen}>
      <Card className="w-full min-w-xl flex flex-col  bg-background">
        <div className="flex items-center justify-between p-6 border-b border-muted-foreground/30">
          <h2 className="text-xl  font-semibold">Finalizar Compra</h2>
          <IconButton
            onClick={onClose}
            className="absolute top-4 right-4 hover:bg-accent p-2 rounded hover:text-white transition-colors"
          >
            <CloseIcon className="h-5 w-5" />
          </IconButton>
        </div>

        <CardContent className="w-full p-6 ">
          <div className="mb-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <CreditCardIcon />
              Resumen del pedido
            </h3>
          </div>

          <div className="bg-muted-foreground/10 rounded-2xl p-4 space-y-2 mb-6">
            {products.map((product) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span>
                  {product.name} <strong>x {product.quantity}</strong>
                </span>
                <span>{formatCurrency(product.quantity * product.price)}</span>
              </div>
            ))}
            <div className="border-t border-muted-foreground/50 flex justify-between pt-2  font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full mt-6 bg-primary border-1 border-primary rounded-2xl text-white text-[9pt] p-3 hover:bg-primary/80"
          >
            {isProcessing ? "Procesando..." : `Pagar ${formatCurrency(total)}`}
          </Button>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default CheckoutModal;
