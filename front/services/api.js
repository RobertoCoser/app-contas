import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.x.x:3000', // seu IP local
});

export default api;
