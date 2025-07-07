import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Assuming your backend is running on this URL
  //timeout: 10000, // Timeout of 5 seconds
});

export default instance;