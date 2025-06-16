import { AxiosError, AxiosResponse } from "axios";

export function apiResponse<T>(response: AxiosResponse) {
    return response.data as T;
  }

export function apiError(error: AxiosError) {
    let message = 'Unexpected error occurred';
  
    if (error.response) {
      const { status, data } = error.response;
  
      if (status === 422) {
        const errors = (data as { errors?: any; message?: any })?.errors || (data as { message?: any })?.message;
        message = Array.isArray(errors)
          ? errors.join('\n')
          : typeof errors === 'object'
          ? Object.values(errors).flat().join('\n')
          : errors;
      } else if (status === 401) {
        message = 'Unauthorized';
      } else if (status === 500) {
        message = 'Server error. Try again later.';
      } else {
        message = (data as any)?.message || 'Something went wrong';
      }
    } else if (error.request) {
      message = 'No response from server. Check your network.';
    }
  
    return Promise.reject(new Error(message));
  }