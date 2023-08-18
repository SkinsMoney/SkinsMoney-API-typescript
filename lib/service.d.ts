import { Action } from "./lib/action";
import { Client } from "./lib/client";
import { CreateDeposit } from "./lib/deposit/createDeposit";
export declare class Service extends Action {
    private _serviceId;
    private _hash;
    constructor(client: Client, serviceId: string, hash: string);
    createDeposit(): CreateDeposit;
    getDepositInfo(depositId: string): Promise<any>;
    getWithdrawValue(): Promise<number>;
}
