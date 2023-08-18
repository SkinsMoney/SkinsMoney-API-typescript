import {Action} from "./lib/action";
import {Currency} from "./models/currencies.model";

export class Currencies extends Action {
    public async get(): Promise<Currency[]> {
        const response = await this._client.request<Currency[]>("currencies");
        if (!response) {
            return [];
        }

        return [
            ...response.data.map((currency: Currency) => ({
                rate: currency.rate,
                short_name: currency.short_name,
                code: currency.code,
                updated_at: new Date(currency.updated_at)
            }))
        ];
    }
}