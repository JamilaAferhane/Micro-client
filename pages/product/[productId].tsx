import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { Button, Container } from "@mui/material";
import { FC } from "react";
import Link from "next/link";
import { Product } from "../../common/types/@appTypes";
import SuccessfulPayment from "../../common/components/payment/SuccessfulPayment";

interface ProductPageProps {
  product: Product | null;
}

const ProductPage: FC<ProductPageProps> = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container sx={{ p: 12 }}>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>

      <Link href="/payment">Pay the order</Link>
      <SuccessfulPayment state />
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Call an external API endpoint to get products
    const res = await fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_API_URL
          : "http://localhost:5005/api"
      }/products`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const products: Product[] = await res.json();

    // Get the paths we want to pre-render based on products
    const paths = products.map((product) => ({
      params: { productId: product._id },
    }));

    return { paths, fallback: false };
  } catch (error) {
    // Handle the error gracefully, e.g., log the error or return a fallback value
    console.error("Error in getStaticPaths:", error);
    return { paths: [], fallback: false };
  }
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   // Call an external API endpoint to get posts
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
//   const products: Product[] = await res.json();

//   // Get the paths we want to pre-render based on products
//   const paths = products.map((product) => ({
//     params: { productId: product._id },
//   }));

//   return { paths, fallback: false };
// };

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const productId = params?.productId;
  const res = await fetch(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL
        : "http://localhost:5005/api"
    }/products/${productId}`
  );
  const product: Product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
