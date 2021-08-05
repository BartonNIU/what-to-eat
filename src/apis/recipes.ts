import { api } from "../services/api";


export const getRecipesByName = (name: string, number = 1) => {
  return api.get(`/recipe?keyword=${name}&num=${number}`);
};

