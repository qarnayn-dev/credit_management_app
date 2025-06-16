export interface CreditTransferReceipt {
    transactionId: string;
    status: 'success' | 'failed' | 'processing';
    amount: number;
    toAccount: string;
    fromAccount: string;
    timestamp: string;
}