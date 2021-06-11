import React from "react";
import { Container, Typography } from "@material-ui/core";
import UrlAdd from "./components/UrlAdd";

const UrlShortener = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        URL Shortener
      </Typography>
      <UrlAdd />
    </Container>
  );
};

export default UrlShortener;
