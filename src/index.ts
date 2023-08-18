import {Currencies} from "./currencies";
import {Client} from "./lib/client";
import {Service} from "./service";

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
export {ValidationException} from "./exceptions/validation.exception";
export {DepositException} from "./exceptions/deposit.exception";
export {SkinsMoneyException} from "./exceptions/skinsmoney.exception";