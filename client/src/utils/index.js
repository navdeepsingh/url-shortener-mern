export const expiresIn = (expireDate) => {
  currentDate = moment();
  const duration = moment.duration(expireDate.diff(currentDate));
  return duration.asDays();
};
