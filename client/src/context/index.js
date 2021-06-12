import * as React from "react";
import { useGetShortUrls } from "../hooks/use-get-short-urls";

const UrlsContext = React.createContext();
UrlsContext.displayName = "UrlsContext";

function UrlsProvider(props) {
  const { loading, error, setError, shortUrls, setShortUrls } =
    useGetShortUrls();

  const value = {
    loading,
    error,
    setError,
    shortUrls,
    setShortUrls,
  };
  return <UrlsContext.Provider value={value} {...props} />;
}

function useUrls() {
  const context = React.useContext(UrlsContext);
  if (context === undefined) {
    throw new Error(`useUrls must be used within a UrlsProvider`);
  }
  return context;
}

export { UrlsProvider, useUrls };
