import { AxiosError } from "axios";
import { CreditTransferReceipt } from "../types/CreditTransferReceipt";
import { promiseDelayed } from "../utils/promiseDelayed"
import { ApiResponse } from "../types/ApiResponse";

export interface PostCreditTransferPayload {
    fromAccount: string,
    toAccount: string,
    amount: number,
    note?: string,
}

export const postCreditTransfer = async (payload: PostCreditTransferPayload, balance: number): Promise<ApiResponse<CreditTransferReceipt>> => {
    try {
        // TODO: use actual API

        /** 
         * From here on, it is just to show how it works. 
         * Normally, every logic will be handled in the backend, calculations and all. 
        */
        const randomNum = Math.ceil((Math.random() * 100));
        const timestamp = new Date();
        const isValidAccount = /^[0-9]*$/.test(payload.toAccount) && payload.toAccount.trim().length > 8;
        const isValidAmount = payload.amount > 0;

        await promiseDelayed(Math.random() * 1000 + 350);

        // TODO: Emulate an unsuccessful response
        if (!isValidAccount || !isValidAmount) {
            return {
                success: false,
                status: 422,
                message: "Some field are invalid.",
                errors: {
                    toAccount: !isValidAccount ? ["Invalid account"] : undefined,
                    amount: !isValidAmount ? ["Amount needs to be greater than zero"] : undefined,
                },
            }
        } else if ((balance ?? 0) < payload.amount) {
            return {
                success: false,
                status: 422,
                message: "Insufficient balance",
                errors: {
                    amount: ["Insufficient balance"],
                },
            }
        }
        // TODO: Emulate a successful response
        else if (randomNum > 10) {
            return {
                success: true,
                status: 200,
                data: {
                    transactionId: `TX${payload.toAccount}${randomNum}`,
                    status: 'success',
                    amount: payload.amount,
                    toAccount: payload.toAccount,
                    fromAccount: payload.fromAccount,
                    timestamp: timestamp.toISOString(),
                }
            };
        }
        else {
            return {
                success: false,
                status: 500,
                message: "Something went wrong on our end. Please try again later."
            }
        }
    } catch (error) {
        throw new Error(`${error}`);
    }
}
