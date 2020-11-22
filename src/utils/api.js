import axios from "axios";

const base = () => {
  const req = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

  return req;
};

const ping = () => {
  const api = base();
  return api.get("/");
};

const post = (url, data = new FormData()) => {
  const api = base();

  if (!data.has("code")) {
    const refresh_token = localStorage.getItem("refresh_token");
    if (refresh_token) {
      data.append("refresh_token", refresh_token);
    }
  }

  api.interceptors.request.use(function (config) {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return config;
  });

  return api.post(url, new URLSearchParams(data));
};

const api = {
  post: post,
  ping: ping,
};

export default api;
