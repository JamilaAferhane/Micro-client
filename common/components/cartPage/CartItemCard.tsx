/* eslint-disable jsx-a11y/anchor-is-valid */
import { Close } from "@mui/icons-material";
import { Button, Grid, Link, Typography } from "@mui/material";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../../types/@appTypes";
import { RootState } from "../../../store/types";

type PropTypes = {
  product: CartItem;
  // eslint-disable-next-line no-unused-vars
  remove: (product: CartItem) => void;
};

const CartItemCard: FC<PropTypes> = ({ product, remove }) => {
  const [quantity, setQuantity] = useState<number>(product.quantity);
  const [, setItemInCart] = useState<boolean | null>(null);
  const shoppingCart = useSelector(
    (state: RootState) => state.products.shoppingCart
  );

  const dispatch = useDispatch<any>();
  const isProductInStock = product?.quantity !== 0;
  const handleAddItemToCart = () => {
    dispatch({
      type: "ADD_TO_SHOPPING_CART",
      payload: { ...product, quantity: 1 },
    });
    setItemInCart(true);
  };
  const handleIncrement = () => {
    // if (quantity < product.quantity)
    setQuantity(quantity + 1);
    handleAddItemToCart();
  };

  const handleDecrement = () => {
    if (quantity > 0) setQuantity(quantity - 1);
    handleAddItemToCart();
  };

  useEffect(() => {
    let isExistInCart = false;
    // eslint-disable-next-line array-callback-return
    shoppingCart.map((item) => {
      if (item._id === product._id) isExistInCart = true;
    });
    setItemInCart(isExistInCart);
  }, [shoppingCart, product._id]);

  return (
    <Grid
      sx={{ p: 1, border: "1px solid #eee", position: "relative" }}
      container
    >
      <Grid xs={4} sm={2} display="flex" alignItems="center" item>
        <Image
          src={`${product.image ? product.image[0] : ""}`}
          loader={() => (product.image ? product.image[0] : "")}
          width="100%"
          height={150}
          alt={product.title}
        />
      </Grid>

      <Grid
        xs={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        item
      >
        <NextLink href={`product/${product._id}`}>
          <Link
            sx={{
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: { lg: "flex-end", xs: "flex-start" },
                height: { xs: 61 },
                width: "100%",
                whiteSpace: "wrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product.title}
            </Typography>
          </Link>
        </NextLink>
        <Typography
          sx={{
            color: "#fb0",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          {(product.price as unknown as number) * quantity}
          {" DH"}
        </Typography>
      </Grid>
      <Grid
        xs={12}
        sm={3}
        item
        sx={{
          display: "flex",
          width: 30,
          alignItems: "center",
          justifyContent: { xs: "flex-end", sm: "center" },
          flexDirection: { xs: "row", sm: "column-reverse" },
        }}
      >
        <Button
          variant="contained"
          disabled={!isProductInStock}
          onClick={handleDecrement}
        >
          -
        </Button>
        <Button type="button" disabled={!isProductInStock}>
          {quantity}
        </Button>
        <Button
          variant="contained"
          disabled={!isProductInStock}
          onClick={handleIncrement}
        >
          +
        </Button>
      </Grid>

      <Button
        sx={{ position: "absolute", right: 0, top: "40%" }}
        onClick={() => remove(product)}
      >
        <Close color="primary" />
      </Button>
    </Grid>
  );
};
export default CartItemCard;
