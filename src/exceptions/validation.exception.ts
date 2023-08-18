import {Exception} from "./exception";

export type ValidationErrors = {[key: string]: string[]};

export class ValidationException extends Exception {
    private _errors: ValidationErrors = {};

    constructor(errors: ValidationErrors) {
        super("Validation error", 422);
        this._errors = errors;
    }

    getErrors(): ValidationErrors {
        return this._errors;
    }
}