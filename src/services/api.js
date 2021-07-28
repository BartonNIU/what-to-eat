import axios from "axios";


export const URL = process.env.NODE_ENV === "production" ? "https://api-express.vercel.app" : "http://localhost:5300";
export const baseURL = `${URL}/api/v1`

export const api = axios.create({
  baseURL: baseURL,
})
