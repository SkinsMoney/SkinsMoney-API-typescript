import {Client} from "./client";

export abstract class Action {
    constructor(protected _client: Client) {};
}