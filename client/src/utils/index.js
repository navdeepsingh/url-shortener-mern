import moment from "moment";

export const expiresIn = (expireDate) => {
  const currentDate = moment();
  const duration = moment(
    moment.duration(moment(expireDate).diff(currentDate))
  ).format("hh:mm");
  return duration;
};

export const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  return dateObject;
};

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
