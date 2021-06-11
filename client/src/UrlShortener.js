import React from "react";
import { Container, Typography } from "@material-ui/core";
import UrlAdd from "./components/UrlAdd";
import UrlListing from "./components/UrlListing";
import { useGetShortUrls } from "./hooks/use-get-short-urls";

const UrlShortener = () => {
  const { loading, error, shortUrls, setShortUrls } = useGetShortUrls();
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        URL Shortener
      </Typography>
      <UrlAdd />
      <UrlListing shortUrls={shortUrls} />
    </Container>
  );
};

export default UrlShortener;
