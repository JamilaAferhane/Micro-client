import React from "react";
import { Container, Typography } from "@mui/material";

const ErrorPage = () => (
  <Container>
    <Typography variant="h4" gutterBottom>
      Error
    </Typography>
    <Typography variant="body1">
      There was a problem fetching the data.
    </Typography>
  </Container>
);

export default ErrorPage;
