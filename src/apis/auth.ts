import { api } from "../services/api";

export const login = (name: string, password: string) => {
  return api.post("/login", { name, password });
};

export const register = (name: string, password: string) => {
  return api.post("/register", { name, password });
};
