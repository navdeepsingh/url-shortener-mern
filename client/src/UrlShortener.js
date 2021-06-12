import React from "react";
import { Container, Typography } from "@material-ui/core";
import UrlAdd from "./components/UrlAdd";
import UrlListing from "./components/UrlListing";
import { UrlsProvider } from "./context";

import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

const UrlShortener = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom>
          URL Shortener
        </Typography>
        <UrlsProvider>
          <UrlAdd />
          <UrlListing />
        </UrlsProvider>
      </Container>
    </ErrorBoundary>
  );
};

export default UrlShortener;
