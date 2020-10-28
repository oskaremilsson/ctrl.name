import axios from 'axios';
import config from 'config/config.json';

const base = () => {
  const req = axios.create({
    baseURL: config.API_BASE_URL
  });

  return req;
}

const post = (url, data) => {
  if (!data) {
    data = new FormData();
  }
  const api = base();

  if(!data.has('code')) {
    const my_tokens = JSON.parse(localStorage.getItem('my_tokens'));
    data.append("refresh_token", my_tokens.refresh_token);
  }

  api.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
  });

  return api.post(url, new URLSearchParams(data));
}

const api = {
  post: post
}

export default api;