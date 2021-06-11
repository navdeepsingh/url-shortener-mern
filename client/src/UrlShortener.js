import React from "react";
import { Container, Typography } from "@material-ui/core";
import UrlAdd from "./components/UrlAdd";
import UrlListing from "./components/UrlListing";
import { useGetShortUrls } from "./hooks/use-get-short-urls";

const UrlShortener = () => {
  const { loading, error, setError, shortUrls, setShortUrls } =
    useGetShortUrls();
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        URL Shortener
      </Typography>
      <UrlAdd
        shortUrls={shortUrls}
        loading={loading}
        error={error}
        setError={setError}
        setShortUrls={setShortUrls}
      />
      <UrlListing
        shortUrls={shortUrls}
        loading={loading}
        error={error}
        setError={setError}
        setShortUrls={setShortUrls}
      />
    </Container>
  );
};

export default UrlShortener;
