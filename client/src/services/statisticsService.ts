import api from "./api";

export const getTopDays = () => {
  return api.get("/statistics/top-days");
};

export const getMonthlyChange = () => {
  return api.get("/statistics/monthly-change");
};

export const getPredictions = () => {
  return api.get("/statistics/predictions");
};
