import { formatCurrency } from "../utils/formatCurrency";
import ButtonIcon from "./ButtonIcon";
import { Button } from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CartItem = ({
  item,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
}) => {
  return (
    <div className="flex gap-4 py-4 border-b border-primary/25 last:border-b-0">
      <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm leading-tight mb-1">{item.name}</h4>
        <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ButtonIcon onClick={() => decreaseQuantity(item.id)}>
              <RemoveIcon className="h-4 w-4" />
            </ButtonIcon>
            <span className="text-sm font-medium w-8 text-center">
              {item.quantity}
            </span>
            <ButtonIcon onClick={() => increaseQuantity(item.id)}>
              <AddIcon className="h-4 w-4" />
            </ButtonIcon>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              {formatCurrency(item.price * item.quantity)}
            </p>
            <Button
              onClick={() => removeFromCart(item.id)}
              size="sm"
              className="hover:bg-accent/60 rounded text-xs text-muted-foreground h-auto p-0 hover:text-destructive/80"
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
