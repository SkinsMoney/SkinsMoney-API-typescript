import {Maybe} from "../lib/functional";

export class DepositCreatedResponse {
    private _transactionId: Maybe<string> = null;
    private _redirectUrl: Maybe<string> = null;

    constructor(payload: {[key: string]: any}) {
        this._transactionId = payload['id'];
        this._redirectUrl = payload['url'];
    }

    getTransactionId(): Maybe<string> {
        return this._transactionId;
    }

    getRedirectUrl(): Maybe<string> {
        return this._redirectUrl;
    }
}