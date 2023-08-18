import { DepositCreatedResponse } from "../../responses/depositCreated.response";
import { Action } from "../action";
import { Client } from "../client";
export declare class CreateDeposit extends Action {
    private _serviceId;
    private _hash;
    private _minValue;
    private _currencyCode;
    private _custom;
    private _redirectUrl;
    private _tradeUrl;
    private _steamId;
    constructor(client: Client, serviceId: string, hash: string);
    setMinValue(minValue: number): CreateDeposit;
    setCurrencyCode(currencyCode: string): CreateDeposit;
    setCustom(custom: string): CreateDeposit;
    setRedirectUrl(redirectUrl: string): CreateDeposit;
    setTradeUrl(tradeUrl: string): CreateDeposit;
    setSteamId(steamId: string): CreateDeposit;
    make(): Promise<DepositCreatedResponse>;
    getSignature(payload: {
        [key: string]: any;
    }[]): string;
}
