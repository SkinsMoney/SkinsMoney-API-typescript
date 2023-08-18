"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkinsMoneyException = exports.DepositException = exports.ValidationException = void 0;
const currencies_1 = require("./currencies");
const client_1 = require("./lib/client");
const service_1 = require("./service");
class SkinsMoney {
    constructor(url) {
        this._client = new client_1.Client(url);
    }
    service(serviceId, hash) {
        return new service_1.Service(this._client, serviceId, hash);
    }
    currencies() {
        return new currencies_1.Currencies(this._client);
    }
}
exports.default = SkinsMoney;
var validation_exception_1 = require("./exceptions/validation.exception");
Object.defineProperty(exports, "ValidationException", { enumerable: true, get: function () { return validation_exception_1.ValidationException; } });
var deposit_exception_1 = require("./exceptions/deposit.exception");
Object.defineProperty(exports, "DepositException", { enumerable: true, get: function () { return deposit_exception_1.DepositException; } });
var skinsmoney_exception_1 = require("./exceptions/skinsmoney.exception");
Object.defineProperty(exports, "SkinsMoneyException", { enumerable: true, get: function () { return skinsmoney_exception_1.SkinsMoneyException; } });
