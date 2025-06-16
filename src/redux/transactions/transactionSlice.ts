import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TransactionState } from './types';
import { addTransaction, loadTransactions, updateTransactions } from './reducers';
import { loadFromLocal, localKeys } from '../../services/localStorage';
import { CreditTransferReceipt } from '../../types/CreditTransferReceipt';

const initialState: TransactionState = {
    transactions: [],
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: initialState,
    reducers: {
        addTransaction,
        loadTransactions,
        updateTransactions,
    }
});

export const rehydrateTransactions = createAsyncThunk('transaction/rehydrate', async (_, thunkApi) => {
    const savedTransactions = await loadFromLocal<CreditTransferReceipt[]>(localKeys.TRANSACTIONS);
    thunkApi.dispatch(transactionAction.updateTransactions(savedTransactions ?? []));
});

export const transactionAction = transactionSlice.actions;
export default transactionSlice.reducer

