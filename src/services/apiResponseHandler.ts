import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponse } from "../types/ApiResponse";

export function apiResponse<T>(response: AxiosResponse) {
  return response.data as T;
}

export function apiError(error: AxiosError) {
  let message = 'Unexpected error occurred';

  if (error.response) {
    const { status, data } = error.response;

    if (status === 401) {
      // TODO: handle 401 here
      message = 'Unauthorized';
    } else if (status === 500) {
      message = 'Server error. Try again later.';
    }
  } else if (error.request) {
    message = 'No response from server. Check your network.';
  }

  return Promise.reject(error);
}

export const standardResponse = async <T>(api: () => Promise<AxiosResponse>, transform?: (data: AxiosResponse<any, any>) => T): Promise<ApiResponse<T>> => {
  try {
    const response = await api();
    return {
      success: true,
      status: 200,
      data: transform?.(response) ?? response.data,
    };
  } catch (error) {
    let message = "Something went wrong!";
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status ?? 400;
      message = error.response?.data?.message ?? error.message ?? message;
      return {
        success: false,
        status: statusCode,
        message: message,
        errors: error?.response?.data.fieldErrors,
      };
    } else {
      throw Promise.reject(message);
    }
  }
}