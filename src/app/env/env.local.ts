const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const environment = {
  production: API_BASE_URL,
  baseUrl: API_BASE_URL,
  forgotPassword: "/account/request-password-reset-link",
  setPassword: "/account/set-new-password",
};
