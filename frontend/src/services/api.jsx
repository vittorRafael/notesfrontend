import axios from 'axios';

const api = axios.create({
  baseURL: 'https://notesbackend-nhdv.onrender.com',
});

export default api;
