// lib/api.ts
import axios from "axios";

const BASE_URL = "https://real.ec2.alluvium.net";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if you're using cookies for auth
});

interface ApiResponse<T> {
  message: string;
  data: T;
  status: number;
  taskId?: string;
}

export async function getRequest<T>(
  url: string,
  params: Record<string, any> = {}
): Promise<ApiResponse<T>> {
  try {
    const res = await axiosInstance.get<ApiResponse<T>>(url, { params });
    return {
      data: res.data.data,
      message: res.data.message,
      status: res.status, // <- this is from the HTTP response, not the body
      taskId: res.data.taskId,
    };
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || `GET ${url} failed`);
  }
}

export async function postRequest<T>(
  url: string,
  body: Record<string, any>
): Promise<T> {
  try {
    const res = await axiosInstance.post<T>(url, body);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || `POST ${url} failed`);
  }
}
