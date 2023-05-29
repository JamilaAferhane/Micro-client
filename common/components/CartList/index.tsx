import { Grid } from "@mui/material";
import { FC } from "react";
import { Product } from "../../types/@appTypes";
import ProductCard from "../ProductCard";

interface ProductListProps {
  products: Product[];
}
const ProductList: FC<ProductListProps> = ({ products }) => (
  <Grid container spacing={2}>
    {products.map((product) => (
      <Grid item xs={12} sm={6} md={3} key={product._id}>
        <ProductCard
          _id={product._id}
          title={product.title}
          description={product.description}
          image={product.image}
          price={product.price}
        />
      </Grid>
    ))}
  </Grid>
);

export default ProductList;
