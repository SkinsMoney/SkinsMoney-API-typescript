"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const deposit_exception_1 = require("./exceptions/deposit.exception");
const skinsmoney_exception_1 = require("./exceptions/skinsmoney.exception");
const action_1 = require("./lib/action");
const createDeposit_1 = require("./lib/deposit/createDeposit");
const sha256_1 = __importDefault(require("crypto-js/sha256"));
class Service extends action_1.Action {
    constructor(client, serviceId, hash) {
        super(client);
        this._serviceId = serviceId;
        this._hash = hash;
    }
    createDeposit() {
        return new createDeposit_1.CreateDeposit(this._client, this._serviceId, this._hash);
    }
    async getDepositInfo(depositId) {
        const response = await this._client.request(`deposits/${depositId}?${new URLSearchParams({
            signature: (0, sha256_1.default)(`${depositId}|${this._serviceId}|${this._hash}`).toString()
        })}`);
        if (!response) {
            throw new deposit_exception_1.DepositException(this._client.error(), this._client.errorCode());
        }
        const data = response.data;
        if (this._client.statusCode() !== 200) {
            throw new deposit_exception_1.DepositException(data.message, this._client.statusCode());
        }
        return data;
    }
    async getWithdrawValue() {
        const response = await this._client.request(`services/${this._serviceId}/withdraw?${new URLSearchParams({
            signature: (0, sha256_1.default)(`${this._serviceId}|${this._hash}`).toString()
        })}`);
        if (!response) {
            throw new skinsmoney_exception_1.SkinsMoneyException(this._client.error(), this._client.errorCode());
        }
        const data = response.data;
        if (this._client.statusCode() !== 200) {
            throw new skinsmoney_exception_1.SkinsMoneyException(data.message, this._client.statusCode());
        }
        return data.usd_value;
    }
}
exports.Service = Service;
