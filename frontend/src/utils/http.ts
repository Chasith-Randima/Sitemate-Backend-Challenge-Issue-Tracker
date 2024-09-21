// import axios from 'axios';

// const http = axios.create({
//   baseURL: 'http://localhost:3000/api/v1',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// export default http;














import axios from 'axios';

const http = axios.create({
  baseURL: 'http://127.0.0.1:3002/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

// Add a request interceptor to include Authorization token
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Or get your token from other sources
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default http;

// // Add a request interceptor to include Authorization token
// http.interceptors.request.use((config) => {
//   const token = localStorage.getItem('authToken'); // Or get your token from other sources
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });