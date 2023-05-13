import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { DefaultSeo } from "next-seo";
import ThemeProvider from "../common/layouts/ThemeProvider";
import defaultSeoInfo from "../common/config/default-seo-config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <DefaultSeo {...defaultSeoInfo} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
