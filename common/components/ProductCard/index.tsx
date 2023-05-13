import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { FC } from "react";
import Link from "next/link";
import { Product } from "../../types/@appTypes";

const ProductCard: FC<Product> = ({
  _id,
  title,
  description,
  image,
  price,
}) => {
  const handleBuy = () => {
    // Handle buy action
  };

  return (
    <Card>
      <CardMedia component="img" height="240" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="h6" component="div">
          Price: ${price.toFixed(2)}
        </Typography>
        {/* <Button variant="contained" color="primary" onClick={handleBuy}>
          Buy Now
        </Button> */}
        <Link href={`/product/${_id}`}>Order the product</Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
