import {DepositException} from "../../exceptions/deposit.exception";
import {DepositCreatedResponse} from "../../responses/depositCreated.response";
import {Action} from "../action";
import {Client} from "../client";
import sha256 from "crypto-js/sha256";

export class CreateDeposit extends Action {
    private _serviceId: string;
    private _hash: string;
    private _minValue: number;
    private _currencyCode: string = "USD";
    private _custom: string;
    private _redirectUrl: string;
    private _tradeUrl: string;
    private _steamId: string;

    constructor(client: Client, serviceId: string, hash: string) {
        super(client);
        this._serviceId = serviceId;
        this._hash = hash;
    }

    setMinValue(minValue: number): CreateDeposit {
        this._minValue = minValue;
        return this;
    }

    setCurrencyCode(currencyCode: string): CreateDeposit {
        this._currencyCode = currencyCode;
        return this;
    }

    setCustom(custom: string): CreateDeposit {
        this._custom = custom;
        return this;
    }

    setRedirectUrl(redirectUrl: string): CreateDeposit {
        this._redirectUrl = redirectUrl;
        return this;
    }

    setTradeUrl(tradeUrl: string): CreateDeposit {
        this._tradeUrl = tradeUrl;
        return this;
    }

    setSteamId(steamId: string): CreateDeposit {
        this._steamId = steamId;
        return this;
    }

    async make() {
        let payload: {[key: string]: any} = {};

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
        const response = await this._client.request<any>("deposits", "POST", payload);
        if (!response) {
            throw new DepositException(this._client.error(), this._client.errorCode());
        }

        const data = response.data;
        if (this._client.statusCode() !== 201) {
            throw new DepositException(data.message, this._client.statusCode());
        }

        return new DepositCreatedResponse(data);
    }

    getSignature(payload: {[key: string]: any}[]): string {
        return sha256([
            ...payload,
            this._hash
        ].join('|')).toString();
    }
}