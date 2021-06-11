import * as React from "react";
import { client } from "../utils";
import { API_URL } from "../constants";

export function useGetShortUrls() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [shortUrls, setShortUrls] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    setError(false);
    client(`${API_URL}urls`)
      .then((shortUrls) => {
        setShortUrls(shortUrls);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return { loading, error, shortUrls, setShortUrls };
}
