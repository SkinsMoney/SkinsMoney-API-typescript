"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeposit = void 0;
const deposit_exception_1 = require("../../exceptions/deposit.exception");
const depositCreated_response_1 = require("../../responses/depositCreated.response");
const action_1 = require("../action");
const sha256_1 = __importDefault(require("crypto-js/sha256"));
class CreateDeposit extends action_1.Action {
    constructor(client, serviceId, hash) {
        super(client);
        this._currencyCode = "USD";
        this._serviceId = serviceId;
        this._hash = hash;
    }
    setMinValue(minValue) {
        this._minValue = minValue;
        return this;
    }
    setCurrencyCode(currencyCode) {
        this._currencyCode = currencyCode;
        return this;
    }
    setCustom(custom) {
        this._custom = custom;
        return this;
    }
    setRedirectUrl(redirectUrl) {
        this._redirectUrl = redirectUrl;
        return this;
    }
    setTradeUrl(tradeUrl) {
        this._tradeUrl = tradeUrl;
        return this;
    }
    setSteamId(steamId) {
        this._steamId = steamId;
        return this;
    }
    async make() {
        let payload = {};
        payload['serviceId'] = this._serviceId;
        payload['minValue'] = this._minValue;
        if (this._currencyCode) {
            payload['currencyCode'] = this._currencyCode;
        }
        if (this._custom) {
            payload['custom'] = this._custom;
        }
        if (this._redirectUrl) {
            payload['redirectUrl'] = this._redirectUrl;
        }
        if (this._tradeUrl) {
            payload['tradeUrl'] = this._tradeUrl;
        }
        if (this._steamId) {
            payload['steamId'] = this._steamId;
        }
        payload['signature'] = this.getSignature(Object.values(payload));
        const response = await this._client.request("deposits", "POST", payload);
        if (!response) {
            throw new deposit_exception_1.DepositException(this._client.error(), this._client.errorCode());
        }
        const data = response.data;
        if (this._client.statusCode() !== 201) {
            throw new deposit_exception_1.DepositException(data.message, this._client.statusCode());
        }
        return new depositCreated_response_1.DepositCreatedResponse(data);
    }
    getSignature(payload) {
        return (0, sha256_1.default)([
            ...payload,
            this._hash
        ].join('|')).toString();
    }
}
exports.CreateDeposit = CreateDeposit;
