import { Exception } from "./exception";
export type ValidationErrors = {
    [key: string]: string[];
};
export declare class ValidationException extends Exception {
    private _errors;
    constructor(errors: ValidationErrors);
    getErrors(): ValidationErrors;
}
