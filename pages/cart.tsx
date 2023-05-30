/* eslint-disable react/no-unescaped-entities */
import { Container, Grid, Typography } from "@mui/material";
import { NextPage } from "next";
import CartItemsList from "../common/components/cartPage/CartItemsList";
import CheckoutCard from "../common/components/cartPage/CheckoutCard";

const cart: NextPage = () => (
  <Container maxWidth="xl" sx={{ pt: 5 }}>
    <Typography variant="h4" fontSize={16} p={4}>
      Shopping Cart
    </Typography>
    <Grid spacing={5} container>
      <Grid item md={7} xs={12}>
        <CartItemsList />
      </Grid>
      <Grid item md={3} xs={12}>
        <CheckoutCard />
      </Grid>
    </Grid>
    <Grid pt={2} pb={4} item>
      <Typography variant="body2">
        The price and availability of items at Hysubi are subject to change. The
        Cart is a temporary place to store a list of your items and reflects
        each item's most recent price.
      </Typography>
    </Grid>
  </Container>
);

export default cart;
