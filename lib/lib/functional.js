"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotNil = exports.isNil = void 0;
const isNil = (v) => v === null || v === undefined;
exports.isNil = isNil;
const isNotNil = (v) => v !== null && v !== undefined;
exports.isNotNil = isNotNil;
