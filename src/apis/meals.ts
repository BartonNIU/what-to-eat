import { api } from "../services/api";

export const getMealsByUser = (email: string) => {
  const accessToken = localStorage.getItem("accessToken");
  return api.get(`/meals`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const postMealsByUser = (email: string, meals: any) => {
  const accessToken = localStorage.getItem("accessToken");
  return api.post(`/meals`, meals, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
