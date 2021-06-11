// export const expiresIn = (expireDate) => {
//   currentDate = moment();
//   const duration = moment.duration(expireDate.diff(currentDate));
//   return duration.asDays();
// };

export const client = async (
  endpoint,
  { data, headers: customHeaders, ...customConfig } = {}
) => {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };
  return window.fetch(endpoint, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data || true;
    } else {
      return Promise.reject(data);
    }
  });
};
