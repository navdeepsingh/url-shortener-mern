import React from "react";
import { API_URL } from "../constants";

const UrlListing = ({ shortUrls }) => {
  return (
    <div>
      {shortUrls.length > 0 && (
        <>
          {shortUrls.map((url) => {
            return (
              <div>
                <div>{url.full}</div>
                <div>
                  <a
                    target="_blank"
                    href={`${API_URL}${url.short}`}
                    rel="noreferrer"
                  >
                    {url.short}
                  </a>
                </div>
                <div>{url.expire}</div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default UrlListing;
