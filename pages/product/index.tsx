import { GetServerSideProps } from "next";
import { FC, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ErrorOutline } from "@mui/icons-material";
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

  const router = useRouter();

  if (router.isFallback) {
    return (
      <Container maxWidth="xl" sx={{ pt: 5, pb: 10 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }
  return (
    <Container maxWidth="xl" sx={{ pt: 5, pb: 10 }}>
      {products.length > 0 ? (
        <ProductList products={productList} />
      ) : (
        <>
          <Typography>No products</Typography>
          <ErrorOutline />
          <Typography>
            make sure you are connected to api gateway
          </Typography>{" "}
        </>
      )}
    </Container>
  );
};

export default products;

export const getServerSideProps: GetServerSideProps<
  ProductPageProps
> = async () => {
  try {
    // Fetch products from an API or database
    const response = await fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_API_URL
          : "http://localhost:5005/api"
      }/products`
    );

    // Handle non-successful HTTP response
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products: Product[] = await response.json();

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [], // Return an empty array or any default value for products
      },
    };
  }
};
