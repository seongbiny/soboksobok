import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTION',
    'Access-Control-Allow-Headers':
      'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization',
    'Access-Control-Expose-Headers': 'Content-Length,Content-Range',
  },
});

export default function getAxios() {
  const token = localStorage.getItem('jwtToken');
  Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return Axios;
}
