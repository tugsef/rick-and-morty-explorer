import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export class ApiError extends Error {
  public path?: string;
  public timestamp?: string;
  public errors?: unknown[];

  public constructor(
    message?: string,
    path?: string,
    timestamp?: string,
    errors?: unknown[]
  ) {
    super(message);
    this.path = path;
    this.timestamp = timestamp;
    this.errors = errors;
  }
}


const instance = axios.create({
  baseURL: 'https://rickandmortyapi.com'
});

export const get = async <T>(
  url: string,
  params?: unknown,
  config?: AxiosRequestConfig<T>
) => {
  try {
    const response = await instance.get<T>(url, { ...config, params });
    return response.data; 
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ApiError(
        error.response?.data?.message || 'Request failed',
        error.response?.data?.path,
        error.response?.data?.timestamp,
        error.response?.data?.errors
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error');
  }
};

