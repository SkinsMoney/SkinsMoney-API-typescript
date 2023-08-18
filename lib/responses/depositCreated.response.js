"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositCreatedResponse = void 0;
class DepositCreatedResponse {
    constructor(payload) {
        this._transactionId = null;
        this._redirectUrl = null;
        this._transactionId = payload['id'];
        this._redirectUrl = payload['url'];
    }
    getTransactionId() {
        return this._transactionId;
    }
    getRedirectUrl() {
        return this._redirectUrl;
    }
}
exports.DepositCreatedResponse = DepositCreatedResponse;
