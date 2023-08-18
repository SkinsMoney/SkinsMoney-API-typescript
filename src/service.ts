import { DepositException } from "./exceptions/deposit.exception";
import { SkinsMoneyException } from "./exceptions/skinsmoney.exception";
import {Action} from "./lib/action";
import {Client} from "./lib/client";
import {CreateDeposit} from "./lib/deposit/createDeposit";
import sha256 from "crypto-js/sha256";

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
        const response = await this._client.request<any>(`deposits/${depositId}?${new URLSearchParams({
            signature: sha256(`${depositId}|${this._serviceId}|${this._hash}`).toString()
        })}`);

        if (!response) {
            throw new DepositException(this._client.error(), this._client.errorCode());
        }

        const data = response.data;

        if (this._client.statusCode() !== 200) {
            throw new DepositException(data.message, this._client.statusCode());
        }

        return data;
    }

    async getWithdrawValue(): Promise<number> {
        const response = await this._client.request<any>(`services/${this._serviceId}/withdraw?${new URLSearchParams({
            signature: sha256(`${this._serviceId}|${this._hash}`).toString()
        })}`);

        if (!response) {
            throw new SkinsMoneyException(this._client.error(), this._client.errorCode());
        }

        const data = response.data;

        if (this._client.statusCode() !== 200) {
            throw new SkinsMoneyException(data.message, this._client.statusCode());
        }

        return data.usd_value;
    }
}