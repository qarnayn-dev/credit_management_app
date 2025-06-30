import { PostCreditTransferPayload } from "../services/creditTransferService";
import { CreditTransferReceipt } from "../types/CreditTransferReceipt";

export type RootStackParamList = {
    Home: undefined;
    CreditTransfer: PostCreditTransferPayload | undefined;
    Receipt: CreditTransferReceipt;
    Login: undefined,
    SignUp: undefined,
};