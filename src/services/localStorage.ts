import AsyncStorage from '@react-native-async-storage/async-storage';

export const localKeys = {
    TOKEN: 'token',
    USER: 'user',
    TRANSACTIONS: 'transactions',
}

export const saveToLocal = async <T>(key: string, item: T): Promise<void> => {
    try {
        const json = JSON.stringify(item);
        await AsyncStorage.setItem(key, json);
    } catch (error) {
        throw Error(`${error}`);
    }
}

export const loadFromLocal = async <T>(key: string): Promise<T | null> => {
    try {
        const json = await AsyncStorage.getItem(key);
        return json ? JSON.parse(json) : null;
    } catch (error) {
        throw Error(`${error}`);
    }
}

export const deleteFromLocal = async <T>(key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        throw Error(`${error}`);
    }
}