import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { requestEncrypt, responseDecrypt } from "@loki/fpo-ui/utils/helper";
import { HttpResponse } from "./index";
import whiteList from "./whiteList";

// @ts-ignore
const isDev = import.meta.env.MODE === "dev";
// @ts-ignore
const baseURL = import.meta.env.VITE_API_URL;

// Helper function to check if encryption is needed
const isNeedEncrypt = (url: string) => !whiteList.includes(url) && !isDev;

// Create Axios instance
export const instance = axios.create({
  baseURL,
  timeout: 60000, // Request timeout
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("_token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
  (response) => (response.status === 200 ? Promise.resolve(response) : Promise.reject(response)),
  (error) => {
    if(!error.response) {
      window.location.href = "/network-error";
      return Promise.reject({ message: "Network error" });
    }
    const { status } = error.response || {};
    if (status) {
      handleErrorResponse(status);
    }
    return Promise.reject(error);
  }
);

// Handle specific HTTP error codes
const handleErrorResponse = (status: number) => {
  switch (status) {
    case 401:
      localStorage.clear();
      window.location.href = "/login";
      break;
    case 403:
      console.warn("Permission denied");
      break;
    case 404:
      console.warn("Resource not found");
      break;
    default:
      console.warn("An unexpected error occurred");
  }
};

// GET request
export function get<T>(url: string, params?: unknown): Promise<HttpResponse<T>> {
  return instance
    .get<HttpResponse<T>>(url, { params })
    .then((response) => handleResponse(url, response))
    .catch((err) => Promise.reject({ message: err.message }));
}

// POST request
export function post<T>(url: string, data: object): Promise<HttpResponse<T>> {
  const requestData = isNeedEncrypt(url) ? requestEncrypt(data) : data;

  return instance
    .post<HttpResponse<T>>(url, requestData)
    .then((response) => handleResponse(url, response))
    .catch((err) => Promise.reject({ message: err.response?.data?.msg || err.message }));
}

// Generic request
export default function request<T>(config: AxiosRequestConfig): Promise<HttpResponse<T>> {
  return instance
    .request<HttpResponse<T>>(config)
    .then((response) => response.data)
    .catch((err) => Promise.reject({ message: err.message }));
}

// Handle response with optional decryption
const handleResponse = <T>(url: string, response: AxiosResponse<HttpResponse<T>>): HttpResponse<T> => {
  const { key, data } = response.data as unknown as { key: string; data: string };

  if (isNeedEncrypt(url) && key && data) {
    const decryptedData = responseDecrypt({ key, data });
    return decryptedData;
  }
  return response.data;
};
