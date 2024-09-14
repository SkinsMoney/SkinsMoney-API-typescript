import axios, { type AxiosInstance, type Method } from 'axios';
import type { ClientResponse } from '../models/client.model.js';
import { type ValidationErrors, ValidationException } from '../exceptions/validation.exception.js';

export class Client {
    private _baseUrl = 'https://api.skinsmoney.gg/v1/';
    private _axios: AxiosInstance;
    private _errorCode: number | undefined;
    private _errorMessage: string | undefined;
    private _statusCode: number | undefined;

    constructor(url?: string) {
        if (url) {
            this._baseUrl = url;
        }

        this._axios = axios.create({
            baseURL: this._baseUrl,
            validateStatus: () => true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
    }

    async request<T>(
        url: string,
        method: Method = 'GET',
        data?: any,
    ): Promise<ClientResponse<T> | false> {
        try {
            const response = await this._axios.request<T>({
                url,
                method,
                data,
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
