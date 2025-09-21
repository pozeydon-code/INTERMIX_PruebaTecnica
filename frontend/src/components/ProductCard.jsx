import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { formatCurrency } from "../utils/formatCurrency";

const ProductCard = ({ product, addToCart, openModal }) => {
  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;

    openModal(product);
  };
  return (
    <Card
      sx={{ maxWidth: 345, borderRadius: 4 }}
      className="cursor-pointer hover:scale-103 shadow-sm transition-all hover:shadow-lg bg-card"
      onClick={handleCardClick}
    >
      <CardMedia
        className="min-h-[200px]  transition-transform"
        image={product.imageUrl}
        title={product.name}
      />
      <CardContent className="min-h-[150px] p-5">
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions className="justify-between p-5 mb-2">
        {formatCurrency(product.price)}
        <IconButton onClick={() => addToCart(product)} aria-label="share">
          <AddIcon className="bg-primary hover:bg-primary/80 text-white rounded text-md" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
