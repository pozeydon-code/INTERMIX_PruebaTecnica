import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import { useDialogContext } from "../context/DialogContext";
import { formatCurrency } from "../utils/formatCurrency";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ButtonIcon from "./ButtonIcon";

const ProductModal = ({ product, getItemQuantity, addItem, closeModal }) => {
  const { isModalOpen } = useDialogContext();
  const [quantity, setQuantity] = useState(1);

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  if (!isModalOpen || !product) return null;

  const currentQuantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setQuantity(1);
  };

  return (
    <Dialog open={isModalOpen} onClose={handleCloseModal}>
      <Card className="w-full min-w-xl flex flex-col justify-center items-center bg-background">
        <IconButton
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-white hover:bg-accent p-2 rounded hover:text-white transition-colors"
        >
          <CloseIcon className="h-5 w-5" />
        </IconButton>

        <div className="w-full aspect-video overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <CardContent className="w-full p-6 ">
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {product.description}
          </Typography>
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-medium">
                {formatCurrency(product.price)}
              </span>
              {currentQuantity > 0 && (
                <span className="text-sm text-muted-foreground">
                  {currentQuantity} en el carrito
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-medium">Cantidad:</span>
              <div className="flex items-center gap-2">
                <ButtonIcon
                  onClick={() => setQuantity(Math.max(MIN_ITEMS, quantity - 1))}
                >
                  <RemoveIcon className="h-4 w-4" />
                </ButtonIcon>
                <span className="w-8 text-center text-sm">{quantity}</span>
                <ButtonIcon
                  onClick={() => setQuantity(Math.min(MAX_ITEMS, quantity + 1))}
                >
                  <AddIcon className="h-4 w-4" />
                </ButtonIcon>
              </div>
            </div>
          </div>
        </CardContent>
        <CardActions className="w-full justify-between p-5 mb-2">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-primary border-1 border-primary rounded-2xl text-white text-[9pt] p-3 hover:bg-primary/80"
          >
            Agregar al carrito - ${formatCurrency(product.price * quantity)}
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default ProductModal;
