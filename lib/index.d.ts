import { Currencies } from "./currencies";
import { Service } from "./service";
declare class SkinsMoney {
    private _client;
    constructor(url?: string);
    service(serviceId: string, hash: string): Service;
    currencies(): Currencies;
}
export default SkinsMoney;
export { ValidationException } from "./exceptions/validation.exception";
export { DepositException } from "./exceptions/deposit.exception";
export { SkinsMoneyException } from "./exceptions/skinsmoney.exception";
