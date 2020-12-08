import axios from "axios";

const spotify = (access_token, fullUrl) => {
  const req = axios.create({
    baseURL: fullUrl ? "" : process.env.REACT_APP_SPOTIFY_BASE_URL,
  });

  req.interceptors.request.use(function (config) {
    config.headers["Authorization"] = "Bearer " + access_token;
    return config;
  });

  return req;
};

export default spotify;
