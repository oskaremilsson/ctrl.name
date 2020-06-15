import axios from 'axios';
import config from '../config/config.json';

const spotify = (access_token) => {
  const req = axios.create({
    baseURL: config.SPOTIFY_BASE_URL
  });

  req.interceptors.request.use(function (config) {
    config.headers['Authorization'] = 'Bearer ' + access_token;
    return config;
  });

  return req;
}

export default spotify;