import React from "react";

const UrlListing = ({ urls }) => {
  return (
    <div>
      {urls.length > 0 && (
        <>
          {urls.map((url) => {
            return (
              <div>
                <div>{url.full}</div>
                <div>
                  <a target="_blank" href={url.short}>
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
