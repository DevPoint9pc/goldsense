import axios from "axios";

export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = typeof window === "undefined" ? process.env.STRAPI_API_TOKEN : undefined;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (axios.isAxiosError(error)) {
      const reason = (error.response?.data as { error?: { message?: string } } | undefined)?.error?.message;
      console.error(
        `[api] ${error.config?.method?.toUpperCase()} ${error.config?.url} -> ${error.response?.status ?? error.code}${reason ? ` (${reason})` : ""}`
      );
    }
    return Promise.reject(error);
  }
);
