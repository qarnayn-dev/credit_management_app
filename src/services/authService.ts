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
    full_name?: string,
}

export const postLoginAuth = async (payload: LoginPayload): Promise<ApiResponse<UserAuth>> => {
    return await standardResponse<UserAuth>(async () => api.post('functions/v1/login', payload));
}

export const postSignUp = async (payload: SignUpPayload): Promise<ApiResponse<UserAuth>> => {
    return await standardResponse<UserAuth>(async () => api.post('functions/v1/sign-up', payload), (res) => res.data.session);
}