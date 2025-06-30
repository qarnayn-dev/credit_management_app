import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromLocal, localKeys, saveToLocal } from '../services/localStorage';
import { LoginPayload, postlLoginAuth } from '../services/authService';
import { UserCredentials } from 'react-native-keychain';
import Toast from 'react-native-toast-message';
import { ApiResponse } from '../types/ApiResponse';
import { UserAuth } from '../types/UserAuth';

interface AuthContextType {
    sessionToken?: string,
    refreshToken?: string,
    user?: UserCredentials,
    logIn: (payload: LoginPayload) => Promise<ApiResponse<UserAuth>>,
    signUp: () => Promise<void>,
    signOut: () => Promise<void>,
    refresh: () => Promise<void>,
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [sessionToken, setSessionToken] = useState<string>();
    const [refreshToken, setRefreshToken] = useState<string>();
    const [user, setUser] = useState<UserCredentials>();
    const [error, setError] = useState<string>();

    const logIn = async (payload: LoginPayload): Promise<ApiResponse<UserAuth>> => {
        try {
            const res = await postlLoginAuth(payload);
            if (res.success) {
                setSessionToken(res.data?.access_token);
                setRefreshToken(res.data?.refresh_token);
                setUser(res.data?.user as UserCredentials | undefined);
            } else if (res.message) {
                setError(res.message);
            }
            return res;
        } catch (error) {
            throw Promise.reject(error);
        }
    }

    const signUp = async () => {
        // 
    }

    const signOut = async () => {
        // TODO: call signout API
        setSessionToken(undefined);
        setRefreshToken(undefined);
        setUser(undefined);
    }

    const refresh = async () => {
        // 
    }

    useEffect(() => {
        const hydrate = async () => {
            await Promise.all([
                loadFromLocal<string>(localKeys.ACCESS_TOKEN).then((value) => {
                    setSessionToken(value ?? undefined);
                }),
                loadFromLocal<string>(localKeys.REFRESH_TOKEN).then((value) => {
                    setRefreshToken(value ?? undefined);
                }),
                loadFromLocal<UserCredentials | undefined>(localKeys.USER_CREDENTIALS).then((value) => {
                    setUser(value ?? undefined);
                })
            ]);
        }
        hydrate();
    }, []);

    useEffect(() => {
        saveToLocal<string | undefined>(localKeys.ACCESS_TOKEN, sessionToken);
    }, [sessionToken]);

    useEffect(() => {
        saveToLocal<string | undefined>(localKeys.REFRESH_TOKEN, refreshToken);
    }, [refreshToken]);

    useEffect(() => {
        saveToLocal<UserCredentials | undefined>(localKeys.USER_CREDENTIALS, user);
    }, [user]);

    useEffect(() => {
        if ((error?.length ?? 0) > 0 && error) {
            Toast.show({ type: 'error', position: 'bottom', text1: error });
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{
            sessionToken,
            refreshToken,
            user,
            logIn,
            signUp,
            signOut,
            refresh
        }}>{children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
