import { GetServerSideProps, GetStaticProps } from "next";
import { FC, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../common/components/CartList";
import { Product } from "../../common/types/@appTypes";
import { RootState } from "../../store/types";

interface ProductPageProps {
  products: Product[];
}

const products: FC<ProductPageProps> = ({ products }) => {
  const productList = useSelector(
    (state: RootState) => state.products.products
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SET_PRODUCTS", payload: products });
  }, []);
  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 10 }}>
      {products.length > 0 ? (
        <ProductList products={productList} />
      ) : (
        <Typography>No products</Typography>
      )}
    </Container>
  );
};

export default products;

// export const getStaticProps: GetStaticProps<ProductPageProps> = async () => {
//   // Fetch products from an API or database
//   const response = await fetch(
//     `${
//       process.env.NODE_ENV === "production"
//         ? process.env.NEXT_PUBLIC_API_URL
//         : "http://localhost:5005/api"
//     }/products`
//   );
//   const products: Product[] = await response.json();

//   return {
//     props: {
//       products,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps<
  ProductPageProps
> = async () => {
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
