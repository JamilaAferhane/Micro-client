/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Box,
  Button,
  createTheme,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../../store/types";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fcba03",
    },
  },
});

const CheckoutCard = () => {
  const { shoppingCart } = useSelector((state: RootState) => state.products);
  const customer = useSelector(
    (state: RootState) => state.user.authenticatedUser
  );
  const dispatch = useDispatch();
  const total = shoppingCart.reduce(
    (a, b) =>
      a + (b.price as unknown as number) * (b.quantity as unknown as number),
    0
  );

  const makeOrder = () => {
    console.log("making an order");
    if (total > 0) {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
          price: total,
          customer: customer?.email,
          orderPayed: false,
        })
        .then((resp: any) => {
          const { order } = resp.data;
          dispatch({ type: "SET_ORDER", payload: order });
        })
        .catch((err: Error) => {
          console.log("Order processing failed", err);
        });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ border: "1px solid #ddd", p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
          <Typography>Total :</Typography>
          <Typography
            sx={{
              color: "#fb0",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            {total}
            {" DH"}
          </Typography>
        </Box>

        <Button
          disabled={total === 0}
          onClick={makeOrder}
          fullWidth
          variant="contained"
        >
          <NextLink href="/payment">
            <a> Order Products </a>
          </NextLink>
        </Button>
      </Paper>
    </ThemeProvider>
  );
};

export default CheckoutCard;
