import axios from 'axios';

const api = axios.create({
 baseURL: 'https://fake--api.vercel.app' //descomentar  para usar base de datos fake de vercel
 //baseURL: 'http://localhost:3000' // descomentar para usar base de datos local
});

export default api;