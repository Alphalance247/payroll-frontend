import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "https://real.ec2.alluvium.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access"); // ⬅️ Use your Access Token key here
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If the error is 401 and we haven't retried yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Try to refresh the token
//         const refreshToken = localStorage.getItem("refresh");
//         if (!refreshToken) {
//           throw new Error("No refresh token available");
//         }

//         const response = await axios.post(
//           "https://real.ec2.alluvium.net/api/account/login/token/refresh",
//           {
//             refresh: refreshToken,
//           }
//         );

//         const { access } = response.data;
//         localStorage.setItem("access", access);

//         // Retry the original request with new token
//         originalRequest.headers.Authorization = `Bearer ${access}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // If refresh token fails, trigger logout
//         window.dispatchEvent(new CustomEvent("tokenExpired"));
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
