import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../user/userSlice";
import transactionReducer from "../transactions/transactionSlice";

export const store = configureStore({
    'reducer': {
        userState: userReducer,
        transactionState: transactionReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;