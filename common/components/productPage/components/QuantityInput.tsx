/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, ButtonGroup, Divider, Paper, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import NextLink from "next/link";
import {
  AddShoppingCartOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../../types/@appTypes";
import { RootState } from "../../../../store/types";
import { ButtonColors } from "../../../config/colors";

type PropTypes = { product: Product };

const QuantityInput: FC<PropTypes> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isItemInCart, setItemInCart] = useState<boolean | null>(null);
  const { shoppingCart } = useSelector((state: RootState) => state.products);

  const dispatch = useDispatch<any>();
  const isProductInStock = product.quantity !== 0;
  const handleBuyProduct = () => null;

  const handleAddItemToCart = () => {
    dispatch({
      type: "ADD_TO_SHOPPING_CART",
      payload: { ...product, quantity },
    });
    setItemInCart(true);
  };

  const handleIncrement = () => {
    if (product.quantity && quantity < product.quantity)
      setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) setQuantity(quantity - 1);
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
    <Paper
      sx={{
        p: 2,
        width: 300,
        height: 190,
        border: "1px solid #ddd",
        zIndex: 0,
      }}
    >
      <Typography
        sx={{ color: "#fb0", fontWeight: "bold", fontSize: 23, pb: 2 }}
      >
        {" "}
        {(product.price as unknown as number) * quantity}
        {" DH"}
        <Divider />
      </Typography>
      <ButtonGroup
        sx={{ display: "block", mb: 1, ml: 3 }}
        disabled={!isProductInStock}
      >
        <Button variant="contained" onClick={handleDecrement}>
          -
        </Button>
        <Button type="button">{quantity}</Button>
        <Button variant="contained" onClick={handleIncrement}>
          +
        </Button>
      </ButtonGroup>
      <ButtonGroup
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 0.3,
          mt: 3,
          mb: 3,
        }}
        color="primary"
        disabled={isItemInCart === null || !isProductInStock}
      >
        <Button variant="contained" onClick={handleAddItemToCart}>
          <AddShoppingCartOutlined />
        </Button>

        <Button variant="contained">
          <FavoriteBorderOutlined />
        </Button>

        <Button
          sx={{
            ml: 20,
            color: "#000",
            backgroundColor: ButtonColors.buyProductButton,
            pl: 3,
            pr: 3,
            fontWeight: "bold",
            fontSize: { xs: 13, md: "auto" },
            "&:hover": { color: "#000", backgroundColor: "#f80" },
            borderRadius: 0,
          }}
          variant="contained"
          onClick={handleBuyProduct}
        >
          <NextLink href="/cart">
            <a> Buy Now</a>
          </NextLink>
        </Button>
      </ButtonGroup>
    </Paper>
  );
};

export default QuantityInput;
