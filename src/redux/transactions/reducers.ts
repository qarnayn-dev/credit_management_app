import { loadFromLocal, localKeys, saveToLocal } from '../../services/localStorage';
import { CreditTransferReceipt } from '../../types/CreditTransferReceipt'
import { TransactionState } from './types'
import { PayloadAction } from '@reduxjs/toolkit'

export const addTransaction = (state: TransactionState, action: PayloadAction<CreditTransferReceipt>) => {
    state.transactions.push(action.payload);
    saveToLocal<CreditTransferReceipt[]>(localKeys.TRANSACTIONS, state.transactions);
}

export const loadTransactions = (state: TransactionState) => {
    loadFromLocal<CreditTransferReceipt[]>(localKeys.TRANSACTIONS).then((transactions) => {
        state.transactions = transactions ?? [];
    })
}
