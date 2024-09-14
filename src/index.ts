import { Currencies } from './currencies.js';
import { Client } from './lib/client.js';
import { Service } from './service.js';

class SkinsMoney {
    private _client: Client;

    constructor(url?: string) {
        this._client = new Client(url);
    }

    service(serviceId: string, hash: string): Service {
        return new Service(this._client, serviceId, hash);
    }

    currencies(): Currencies {
        return new Currencies(this._client);
    }
}

export default SkinsMoney;
export { ValidationException } from './exceptions/validation.exception.js';
export { DepositException } from './exceptions/deposit.exception.js';
export { SkinsMoneyException } from './exceptions/skinsmoney.exception.js';
