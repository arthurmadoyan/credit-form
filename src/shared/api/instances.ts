import axios from 'axios';

export const apiBase = axios.create({
  baseURL: 'https://dummyjson.com',
});
