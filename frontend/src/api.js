import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-type': 'application/json',
  },
});

Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.jwtToken}`;

export default Axios;
