import React, { createContext, useContext, useEffect, useState } from 'react'
import { deleteFromLocal, loadFromLocal, localKeys, saveToLocal } from '../services/localStorage';
import { LoginPayload, postLoginAuth, postSignUp, SignUpPayload } from '../services/authService';
import { UserCredentials } from 'react-native-keychain';
import Toast from 'react-native-toast-message';
import { ApiResponse } from '../types/ApiResponse';
import { UserAuth } from '../types/UserAuth';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { resolver } from '../../metro.config';

interface AuthContextType {
    sessionToken?: string,
    refreshToken?: string,
    user?: UserCredentials,
    logIn: (payload: LoginPayload) => Promise<ApiResponse<UserAuth>>,
    signUp: (payload: SignUpPayload) => Promise<ApiResponse<UserAuth>>,
    signOut: () => Promise<void>,
    refresh: () => Promise<void>,
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [sessionToken, setSessionToken] = useState<string>();
    const [refreshToken, setRefreshToken] = useState<string>();
    const [user, setUser] = useState<UserCredentials>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const logIn = async (payload: LoginPayload): Promise<ApiResponse<UserAuth>> => {
        setIsLoading(true);
        try {
            const res = await postLoginAuth(payload);
            setIsLoading(false);
            if (res.success) {
                setSessionToken(res.data?.access_token);
                setRefreshToken(res.data?.refresh_token);
                setUser(res.data?.user as UserCredentials | undefined);
            }
            return res;
        } catch (error) {
            throw Promise.reject(error);
        }
    }

    const signUp = async (payload: SignUpPayload): Promise<ApiResponse<UserAuth>> => {
        setIsLoading(true);
        try {
            const res = await postSignUp(payload);
            setIsLoading(false);
            if (res.success) {
                setSessionToken(res.data?.access_token);
                setRefreshToken(res.data?.refresh_token);
                setUser(res.data?.user as UserCredentials | undefined);
            }
            return res;
        } catch (error) {
            throw Promise.reject(error);
        }
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
        if (sessionToken)
            saveToLocal<string | undefined>(localKeys.ACCESS_TOKEN, sessionToken);
        else
            deleteFromLocal(localKeys.ACCESS_TOKEN);
    }, [sessionToken]);

    useEffect(() => {
        if (refreshToken)
            saveToLocal<string | undefined>(localKeys.REFRESH_TOKEN, refreshToken);
        else
            deleteFromLocal(localKeys.REFRESH_TOKEN);

    }, [refreshToken]);

    useEffect(() => {
        if (user)
            saveToLocal<UserCredentials | undefined>(localKeys.USER_CREDENTIALS, user);
        else
            deleteFromLocal(localKeys.USER_CREDENTIALS);
    }, [user]);

    return (
        <AuthContext.Provider value={{
            sessionToken,
            refreshToken,
            user,
            logIn,
            signUp,
            signOut,
            refresh
        }}>
            {children}
            {isLoading &&
                (<View style={{
                    ...StyleSheet.absoluteFillObject,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                }}>
                    <ActivityIndicator size="large" color="#0EA5E9" />
                </View>)}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
