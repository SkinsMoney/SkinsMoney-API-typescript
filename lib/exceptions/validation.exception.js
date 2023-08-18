"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const exception_1 = require("./exception");
class ValidationException extends exception_1.Exception {
    constructor(errors) {
        super("Validation error", 422);
        this._errors = {};
        this._errors = errors;
    }
    getErrors() {
        return this._errors;
    }
}
exports.ValidationException = ValidationException;
