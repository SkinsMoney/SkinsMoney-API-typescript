import { Action } from "./lib/action";
import { Currency } from "./models/currencies.model";
export declare class Currencies extends Action {
    get(): Promise<Currency[]>;
}
