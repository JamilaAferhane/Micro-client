import { GetStaticProps } from "next";
import { FC } from "react";
import { Container } from "@mui/material";
import ProductList from "../../common/components/CartList";
import { Product } from "../../common/types/@appTypes";

interface ProductPageProps {
  products: Product[];
}

const products: FC<ProductPageProps> = ({ products }) => (
  <Container>
    <ProductList products={products} />
  </Container>
);

export default products;

export const getStaticProps: GetStaticProps<ProductPageProps> = async () => {
  // Fetch products from an API or database
  const response = await fetch(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL
        : "http://localhost:5005/api"
    }/products`
  );
  const products: Product[] = await response.json();

  return {
    props: {
      products,
    },
  };
};
