import axios from 'axios'

import store from './store.js'

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true
});

export default axiosClient

axiosClient.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  let err = error.toJSON()
  if (err.status != 401 && err.status != 403) {
    store.dispatch('addLogItem', {
      message: `http error on ${err.config.url} - status: ${err.status}`,
      error: true
    })
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});