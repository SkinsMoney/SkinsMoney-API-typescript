import { Method } from "axios";
import { ClientResponse } from "../models/client.model";
export declare class Client {
    private _baseUrl;
    private _axios;
    private _errorCode;
    private _errorMessage;
    private _statusCode;
    constructor(url?: string);
    request<T>(url: string, method?: Method, data?: any): Promise<ClientResponse<T> | false>;
    errorCode(): number;
    error(): string;
    statusCode(): number;
}
