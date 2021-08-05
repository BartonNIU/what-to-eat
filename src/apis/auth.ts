import { api } from "../services/api";

export const login = (name: string, password: string) => {
  return api.post("/auth/login", { email: name, password });
};

export const registerRequest = (name: string, password: string) => {
  return api.post("/auth/register", { email: name, password });
};
 