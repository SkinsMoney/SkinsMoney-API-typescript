"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const axios_1 = __importDefault(require("axios"));
const validation_exception_1 = require("../exceptions/validation.exception");
class Client {
    constructor(url) {
        this._baseUrl = "https://api.skinsmoney.gg/v1/";
        if (url) {
            this._baseUrl = url;
        }
        this._axios = axios_1.default.create({
            baseURL: this._baseUrl,
            validateStatus: () => true,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
    }
    async request(url, method = "GET", data) {
        try {
            const response = await this._axios.request({
                url,
                method,
                data
            });
            if (response.status === 422) {
                const payload = response.data;
                throw new validation_exception_1.ValidationException(payload.data);
            }
            this._statusCode = response.status;
            return response.data;
        }
        catch (error) {
            this._errorCode = error.response.status;
            this._errorMessage = error.response.data.message;
            return false;
        }
    }
    errorCode() {
        return this._errorCode;
    }
    error() {
        return this._errorMessage;
    }
    statusCode() {
        return this._statusCode;
    }
}
exports.Client = Client;
