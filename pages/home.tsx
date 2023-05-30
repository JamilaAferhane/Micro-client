import type { NextPage } from "next";
// import Head from "next/head";
import { Container, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import HomeImage from "../public/images/home.jpg";

const Home: NextPage = () => (
  <Container sx={{ pt: 9 }}>
    <header />

    <Container component="main">
      <Typography variant="h5" gutterBottom>
        Explore our wide range of products!
      </Typography>
      <Image src={HomeImage} />

      <Link href="/product"> explore our products</Link>
    </Container>
  </Container>
);

export default Home;
