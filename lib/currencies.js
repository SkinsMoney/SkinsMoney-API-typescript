"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currencies = void 0;
const action_1 = require("./lib/action");
class Currencies extends action_1.Action {
    async get() {
        const response = await this._client.request("currencies");
        if (!response) {
            return [];
        }
        return [
            ...response.data.map((currency) => ({
                rate: currency.rate,
                short_name: currency.short_name,
                code: currency.code,
                updated_at: new Date(currency.updated_at)
            }))
        ];
    }
}
exports.Currencies = Currencies;
