import Document, { Html, Head, Main, NextScript } from "next/document";
import CustomHead from "../common/components/CustomisedHead";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="eng">
        <CustomHead />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
