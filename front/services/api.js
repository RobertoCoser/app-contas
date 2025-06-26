import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // seu IP local
});

export default api;
npx nodemon src/app.js