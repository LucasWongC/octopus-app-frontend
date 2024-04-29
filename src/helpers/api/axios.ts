import { BACKEND_URL } from "@/config";
import axios from "axios";

const instance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
