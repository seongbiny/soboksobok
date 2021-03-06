import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://j6c205.p.ssafy.io:8080',
  // baseURL: 'http://localhost:8080',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTION',
    'Access-Control-Allow-Headers':
      'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization',
    'Access-Control-Expose-Headers': 'Content-Length,Content-Range',
  },
});

function getAxios() {
  const token = localStorage.getItem('token');
  Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return Axios;
}

const AxiosDjango = axios.create({
  baseURL: 'http://j6c205.p.ssafy.io:8000',
  // baseURL: 'http://localhost:8000',
});

function getAxiosDjango() {
  return AxiosDjango;
}

export { getAxios, getAxiosDjango };
