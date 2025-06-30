import api from './api';
import { ApiResponse } from '../types/ApiResponse';
import { UserAuth } from '../types/UserAuth';
import { standardResponse } from './apiResponseHandler';

export interface LoginPayload {
    email?: string,
    password?: string,
}

export interface SignUpPayload {
    email?: string,
    password?: string,
    name?: string,
}

export const postlLoginAuth = async (payload: LoginPayload): Promise<ApiResponse<UserAuth>> => {
    return await standardResponse(async () => api.post('functions/v1/login', payload));
}

export const postlSignUp = async (payload: SignUpPayload) => {
    return await standardResponse(async () => api.post('functions/v1/sign-up', payload));
}