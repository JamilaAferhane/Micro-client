/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */

import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { StarBorderOutlined } from "@mui/icons-material";
import { Product } from "../../common/types/@appTypes";
import ProductZoomer from "../../common/components/productPage/components/ProductZoomer";
import QuantityInput from "../../common/components/productPage/components/QuantityInput";
import Reviews from "../../common/components/productPage/components/reviews";
import SuggestionsSilder from "../../common/components/productPage/components/slider/SuggestionsSlider";

type Props = { product: Product };

const ProductDetails = ({ product }: Props) => {
  const [currentMainImage, setCurrentMainImage] = useState(
    product.image ? product.image[0] : ""
  );

  const dispatch = useDispatch()<any>;
  const isProductInStock = product.quantity !== 0;
  const increasedPrice = (price: string) => {
    const oldPrice = price.slice(1);
    return parseInt(oldPrice, 10) - 23;
  };
  //  image's src require a loader
  const imageLoader = (src: string) => src;
  // store fetched products to redux store when page loaded
  useEffect(() => {
    // dispatch(setCurrentProduct(product));
  }, [dispatch, product]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        bgcolor: "secondary.main",
        pt: 1,
        boxShadow: 3,
        mt: { md: 1, xs: -4 },
        zIndex: -1,
      }}
    >
      <Grid container>
        <Grid xs={12} md={0.4} item>
          <Grid direction={{ md: "column", xs: "row" }} container>
            {product.image
              ? product.image.map((imageSrc: string) => (
                  <Grid
                    key={imageSrc}
                    sx={{
                      border: "2px solid #000",
                      mb: { md: 1 },
                      ml: { xs: 1, md: 0 },
                      cursor: "pointer",
                    }}
                    xs={1.5}
                    md={12}
                    item
                  >
                    <Image
                      onMouseOver={() => setCurrentMainImage(imageSrc)}
                      loader={() => imageLoader(imageSrc)}
                      width="100%"
                      height="100%"
                      src={imageSrc}
                      alt="image"
                    />
                  </Grid>
                ))
              : ""}
          </Grid>
        </Grid>
        {/* 2----------------------- */}
        <Grid
          md={3.5}
          sx={{
            ml: 8,
            maxHeight: { md: 600 },
            minHeight: { md: 500 },
            p: 2,
          }}
          item
        >
          <Box
            sx={{
              backgroundColor: "red",
              width: "fit-content",
              blockSize: "fit-content",
            }}
          >
            <ProductZoomer productImage={currentMainImage} />
          </Box>
        </Grid>
        {/* 3--------------- */}
        <Grid md={6} sx={{ pt: { md: 10 } }} item>
          <Typography
            sx={{ fontSize: { xs: 25, md: 50 } }}
            component="h1"
            variant="h2"
          >
            {product.title}
          </Typography>
          <Box className="prod-price" sx={{ display: "flex", gap: 4, pt: 3 }}>
            <Typography component="h1"> {product.price} DH</Typography>
            <Typography component="h1" sx={{ textDecoration: "line-through" }}>
              {increasedPrice(product.price ? product.price.toString() : "0")}{" "}
              DH
            </Typography>
            <Typography component="h1">( 25% OFF )</Typography>
          </Box>
          <Typography
            component="h1"
            className="prod-taxes"
            sx={{ pt: 1, pb: 1 }}
          >
            inclusive of all taxes
          </Typography>
          <Typography variant="h6" color={isProductInStock ? "green" : "red"}>
            {isProductInStock
              ? `${product.quantity} units availble`
              : "out of stock"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 0.2,
              borderRadius: 20,
              backgroundColor: "#fe0",
              width: 70,
            }}
          >
            <Typography>{product.rating}</Typography> <StarBorderOutlined />
          </Box>
          {/* ---------- */}
          <Box
            sx={{
              display: "flex",
              mt: { xs: -3, md: -10 },
              justifyContent: "center",
              ml: 16,
            }}
          >
            <QuantityInput product={product} />
          </Box>
          {/* ----------------------------- */}
          <Box sx={{ pt: 3, mb: 3 }}>
            <Typography variant="h5">Product details</Typography>
            <Typography sx={{ p: 1 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ad vel
              architecto totam eum beatae eligendi dolores dolor, aliquam
              praesentium ratione, deserunt, omnis non aperiam expedita porro
              tenetur aspernatur asperiores. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Dolor, amet. Eveniet, eius iure
              pariatur consectetur fugiat asperiores et tempore eligendi facilis
              ab molestiae repudiandae debitis ex voluptatem unde, cupiditate
              architecto.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* reviews */}
      <Divider sx={{ mb: 1, mt: 1 }} />
      <Grid container sx={{ mt: 2, display: "flex", gap: 18 }}>
        <Grid item md={12}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Reviews
          </Typography>
          <Reviews reviews={product.review ? product.review : [""]} />
        </Grid>
        <a href="#reviews" />
      </Grid>
      <Box pb={4}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          You May Also Like ?
        </Typography>
        <SuggestionsSilder />
      </Box>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Call an external API endpoint to get products
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
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

export default ProductDetails;
