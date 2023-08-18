import { Client } from "./client";
export declare abstract class Action {
    protected _client: Client;
    constructor(_client: Client);
}
