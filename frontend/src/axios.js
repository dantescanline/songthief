import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
});

// custom error handling here