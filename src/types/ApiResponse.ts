import { ValidationErrors } from "./ValidationErrors";

export interface ApiResponse<T>{
    status: number,
    message?: string,
    data?: T,
    errors?: ValidationErrors,
}