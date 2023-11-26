import axios from "axios";

const url = process.env.REACT_APP_URL;

const login = axios.create({
  baseURL: `${url}/auth/login`,
});
login.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const users = axios.create({
  baseURL: `${url}/users`,
});
users.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const searchuser = axios.create({
  baseURL: `${url}/users/search`,
});
searchuser.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
const posts = axios.create({
  baseURL: `${url}/posts`,
});
posts.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { login, users, searchuser, posts };
