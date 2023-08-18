import axios, {AxiosInstance, Method} from "axios";
import {ClientResponse} from "../models/client.model";
import {ValidationErrors, ValidationException} from "../exceptions/validation.exception";

export class Client {
    private _baseUrl: string = "https://api.skinsmoney.gg/v1/";
    private _axios: AxiosInstance;
    private _errorCode: number;
    private _errorMessage: string;
    private _statusCode: number;

    constructor(url?: string) {
        if (url) {
            this._baseUrl = url;
        }

        this._axios = axios.create({
            baseURL: this._baseUrl,
            validateStatus: () => true,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
    }

    async request<T>(url: string, method: Method = "GET", data?: any): Promise<ClientResponse<T> | false> {
        try {
            const response = await this._axios.request<T>({
                url,
                method,
                data
            });

            if (response.status === 422) {
                const payload = response.data as ClientResponse<T>;
                throw new ValidationException(payload.data as ValidationErrors);
            }

            this._statusCode = response.status;
            return response.data as ClientResponse<T>;
        } catch (error: any) {
            this._errorCode = error.response.status;
            this._errorMessage = error.response.data.message;

            return false;
        }
    }

    errorCode(): number {
        return this._errorCode;
    }

    error(): string {
        return this._errorMessage;
    }

    statusCode(): number {
        return this._statusCode;
    }
}