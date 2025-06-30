import { ValidationErrors } from "./ValidationErrors";

export interface ApiResponse<T> {
    success: boolean,
    status: number,
    message?: string,
    data?: T,
    errors?: ValidationErrors,
}