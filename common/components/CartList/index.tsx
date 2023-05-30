import { Grid } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Product } from "../../types/@appTypes";
import MyProductCard from "../ProductCard";
import ProductSkelton from "../ProductSkelton";

type Props = {
  products: Product[] | null | undefined;
};
const ProductsList: FC<Props> = ({ products }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  return (
    <Grid
      container
      sx={{
        width: { xs: "auto", md: "auto" },
        display: "center",
        justifyContent: "center",
        justi: "left",
      }}
      spacing={0}
    >
      {!loading && products
        ? products.map((product) => (
            <Grid
              key={product._id}
              xs={12}
              sm={5.9}
              md={4}
              lg={4}
              xl={2.4}
              item
            >
              <MyProductCard product={product} />
            </Grid>
          ))
        : [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21,
          ].map((num) => (
            <Grid key={num} xs={12} sm={5.9} md={3} lg={2.9} xl={2.4} item>
              <ProductSkelton />
            </Grid>
          ))}
    </Grid>
  );
};

export default ProductsList;
