import type { NextPage } from "next";
// import Head from "next/head";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import HomeImage from "../public/images/home.jpg";

const Home: NextPage = () => {
  // Handle login logic
  const handleLogin = () => {
    // Handle login logic
  };

  return (
    <Container sx={{ pt: 9 }}>
      <header />

      <Container component="main">
        <Typography variant="h5" gutterBottom>
          Explore our wide range of products!
        </Typography>
        <Image src={HomeImage} />

        <Link href="/product"> explore our products</Link>
        {/* <LoginModal open onClose={() => {}} /> */}
      </Container>
    </Container>
  );
};

export default Home;
