import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
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

    // Add CSRF token to requests
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf="))
      ?.split("=")[1];

    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403) {
      // Show a toast notification for permission denied
      if (typeof window !== "undefined") {
        // Import toast dynamically to avoid SSR issues
        return;
      }
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/account/login/token"
    ) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(
          `${API_BASE_URL}/account/login/token/refresh`,
          {
            refresh: refreshToken,
          }
        );

        const { access } = response.data;
        localStorage.setItem("access", access);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, trigger logout
        // Clear all auth data
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        window.dispatchEvent(new CustomEvent("sessionConflict"));
        // Redirect to login page
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// const refreshToken = async () => {
//   try {
//     const response = await axios.post("/refresh-token", {
//       refresh: refreshToken,
//     });

//     // Store new tokens
//     const { access, refresh } = response.data;
//     localStorage.setItem("access", access);
//     localStorage.setItem("refresh", refresh); // New refresh token

//     return access;
//   } catch (error) {
//     window.dispatchEvent(new CustomEvent("tokenExpired"));
//     throw error;
//   }
// };

export default axiosInstance;
