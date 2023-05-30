/* eslint-disable jsx-a11y/anchor-is-valid */
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import {
  AddShoppingCartOutlined,
  ShoppingBasketOutlined,
  StarOutlineOutlined,
} from "@mui/icons-material";
import { Badge, Button, Grid, Skeleton } from "@mui/material";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store/types";
import { Product } from "../../types/@appTypes";

type Props = { product: Product };

const MyProductCard: FC<Props> = ({ product }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const isProductInStock = product.quantity !== 0;
  const { image } = product || { image: ["", "", ""] };
  const shoppingCart = useSelector(
    (state: RootState) => state.products.shoppingCart
  );
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_SHOPPING_CART",
      payload: { ...product, quantity: 1 },
    });
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 3500);
    console.log(shoppingCart);
  };

  const productUnitsInCart =
    shoppingCart.filter((prod) => prod._id === product._id)[0]?.quantity || 0;

  return product ? (
    <Card
      sx={{
        backgroundColor: "rgba(255,255,255,1)",
        p: { xs: 1.2, md: 2 },
        pb: { xs: 0, md: 0 },
        position: "relative",
        border: "1px solid rgba(0,0,0,0.3)",

        overflow: "hidden",
        "&:hover": {
          boxShadow: "5px 12px 10px 10px rgba(0,0,0,0.5)",
        },
      }}
    >
      <NextLink href={`/product/${encodeURIComponent(product._id)}`} passHref>
        <a>
          <CardMedia
            component="img"
            height="194"
            image={`${image ? image[0] : ""}`}
            alt="Paella dish"
          />

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              color: "#000",
              lineHeight: 1.3,
              fontSize: { xs: 14, md: 17 },
              height: { md: 47, xs: 34 },
              // whiteSpace: 'wrap',
              overflow: "hidden",
              // whiteSpace: 'noWrap',

              textOverflow: "ellipsis",
            }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            color="rgba(0,0,0)"
            sx={{
              // width: '290px',
              height: { md: 35, xs: 35 },
              whiteSpace: "norap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product?.description}
          </Typography>
        </a>
      </NextLink>
      <Typography variant="body2" color="rgba(2,0,75)" fontWeight="bold">
        {product?.categories}
      </Typography>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        p={1}
        container
      >
        <Grid xs={6} sx={{ display: "flex", alignItems: "center" }} item>
          <Typography>{product?.rating}</Typography>

          <StarOutlineOutlined />
        </Grid>

        <Grid xs={4} item>
          <Typography color="rgb(250,200,0)">{product?.price} DH</Typography>
        </Grid>

        <Grid xs={12} p={1} pl={6} pr={6} item>
          {/* -------------------------- add to cart and order -------------------------------------- */}

          <Button
            variant="contained"
            fullWidth
            onClick={handleAddToCart}
            disabled={!isProductInStock}
            sx={{
              // backgroundColor: '#ef5350',
              backgroundColor: "#f68b1e",

              "&:hover": {
                backgroundColor: "#ef5350",
              },
            }}
          >
            {isAddedToCart ? (
              <Badge color="primary" badgeContent={productUnitsInCart} showZero>
                <ShoppingBasketOutlined />
              </Badge>
            ) : (
              <AddShoppingCartOutlined />
            )}
          </Button>

          {/* here miising  */}
          {/* ---------------------------------------------------------- */}
        </Grid>
      </Grid>
    </Card>
  ) : (
    <Skeleton variant="rectangular" />
  );
};

export default MyProductCard;
