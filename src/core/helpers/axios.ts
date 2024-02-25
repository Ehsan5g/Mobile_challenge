import axiosClient from 'core/config/axios';
import {AxiosRequestConfig, AxiosResponse} from 'axios';

export interface ApiResponse<data = unknown> {
  data: data;
}

export async function post<T>(
  url: string,
  body?: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return axiosClient.post<T>(url, body, config);
}

export async function get<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return axiosClient.get<T>(url, config);
}

export async function path<T>(
  url: string,
  body?: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return axiosClient.patch<T>(url, body, config);
}

export async function deleteApi<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return axiosClient.delete<T>(url, config);
}
