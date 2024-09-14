import { DepositException } from './exceptions/deposit.exception.js';
import { SkinsMoneyException } from './exceptions/skinsmoney.exception.js';
import { Action } from './lib/action.js';
import type { Client } from './lib/client.js';
import { CreateDeposit } from './lib/deposit/createDeposit.js';
import sha256 from 'crypto-js/sha256.js';

export class Service extends Action {
    private _serviceId: string;
    private _hash: string;

    constructor(client: Client, serviceId: string, hash: string) {
        super(client);
        this._serviceId = serviceId;
        this._hash = hash;
    }

    createDeposit(): CreateDeposit {
        return new CreateDeposit(this._client, this._serviceId, this._hash);
    }

    async getDepositInfo(depositId: string) {
        const response = await this._client.request<any>(
            `deposits/${depositId}?${new URLSearchParams({
                signature: sha256(`${depositId}|${this._serviceId}|${this._hash}`).toString(),
            })}`,
        );

        if (!response) {
            const error = this._client.error();
            const errorCode = this._client.errorCode();

            if (!error || !errorCode) {
                throw new DepositException('Unknown error', 0);
            }

            throw new DepositException(error, errorCode);
        }

        const data = response.data;

        if (this._client.statusCode() !== 200) {
            const statusCode = this._client.statusCode();

            if (!statusCode) {
                throw new DepositException('Unknown error', 0);
            }

            throw new DepositException(data.message, statusCode);
        }

        return data;
    }

    async getWithdrawValue(): Promise<number> {
        const response = await this._client.request<any>(
            `services/${this._serviceId}/withdraw?${new URLSearchParams({
                signature: sha256(`${this._serviceId}|${this._hash}`).toString(),
            })}`,
        );

        if (!response) {
            const error = this._client.error();
            const errorCode = this._client.errorCode();

            if (!error || !errorCode) {
                throw new SkinsMoneyException('Unknown error', 0);
            }

            throw new SkinsMoneyException(error, errorCode);
        }

        const data = response.data;

        if (this._client.statusCode() !== 200) {
            const statusCode = this._client.statusCode();

            if (!statusCode) {
                throw new SkinsMoneyException('Unknown error', 0);
            }

            throw new SkinsMoneyException(data.message, statusCode);
        }

        return data.usd_value;
    }
}
