import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TransactionState } from './types';
import { addTransaction, loadTransactions } from './reducers';

const initialState: TransactionState = {
    transactions: [],
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: initialState,
    reducers: {
        addTransaction,
        loadTransactions,
    }
});

export const rehydrateTransactions = createAsyncThunk('transaction/rehydrate', (_, thunkApi) => {
    thunkApi.dispatch(transactionAction.loadTransactions());
});

export const transactionAction = transactionSlice.actions;
export default transactionSlice.reducer

