import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { Button, Container } from "@mui/material";
import { FC } from "react";
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

      <Button color="primary">Pay the order</Button>
      <SuccessfulPayment state />
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const products: Product[] = await res.json();

  // Get the paths we want to pre-render based on products
  const paths = products.map((product) => ({
    params: { productId: product._id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const productId = params?.productId;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
  );
  const product: Product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;