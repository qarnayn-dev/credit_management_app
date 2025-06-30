export interface UserAuth {
    access_token: string,
    refresh_token: string,
    user: UserCredentials,
}

export interface UserCredentials {
    id: string,
    email?: string,
}

