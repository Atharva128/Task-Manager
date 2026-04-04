import axios from 'axios';

const API = axios.create({
  baseURL: 'http://my-backend-service:5000/api'
});

export default API;
