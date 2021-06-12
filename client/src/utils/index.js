import moment from "moment";

export const expiresIn = (expireDate) => {
  const currentTime = moment();
  const isExpire = moment(expireDate).diff(currentTime, "minutes") <= 0;
  const duration = moment.duration(moment(expireDate).diff(currentTime));
  return !isExpire ? (
    `${duration.get("days")} days ${duration.get("hours")} hours ${duration.get(
      "minutes"
    )} mins`
  ) : (
    <span className="expired">Expired</span>
  );
};

export const convertDate = (dateString) => {
  const dateObject = new Date(dateString);
  return dateObject;
};

export const formatDate = (dateString) => {
  const dateObject = moment(dateString).format("YYYY-MM-DD HH:mm:ss");
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
