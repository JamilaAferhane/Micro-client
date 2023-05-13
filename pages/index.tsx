import type { NextPage } from "next";
// import Head from "next/head";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import LoginModal from "../common/components/Login";
// import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  // Handle login logic
  const handleLogin = () => {
    // Handle login logic
  };

  return (
    <div>
      <header>
        <Typography variant="h4" gutterBottom>
          Welcome to Our eCommerce App
        </Typography>
      </header>

      <Container component="main">
        <Typography variant="h5" gutterBottom>
          Explore our wide range of products!
        </Typography>

        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>

        <Link href="/product"> explore our products</Link>
        {/* <LoginModal open onClose={() => {}} /> */}
      </Container>
    </div>
  );
};

export default Home;
