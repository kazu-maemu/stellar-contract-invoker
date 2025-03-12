import { default as Axios } from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
});

export default axios;
