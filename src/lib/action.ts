import type { Client } from './client.js';

export abstract class Action {
    constructor(protected _client: Client) {}
}
