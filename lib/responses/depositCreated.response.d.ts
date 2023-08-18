import { Maybe } from "../lib/functional";
export declare class DepositCreatedResponse {
    private _transactionId;
    private _redirectUrl;
    constructor(payload: {
        [key: string]: any;
    });
    getTransactionId(): Maybe<string>;
    getRedirectUrl(): Maybe<string>;
}
