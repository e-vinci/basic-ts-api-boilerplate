"use strict";
/**
 * This file contains type guards for typescript
 * @param value
 * @returns
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isString = void 0;
/**
 * Check if the value is a string and inform typescript of this
 * @param value
 * @returns
 */
const isString = (value) => {
    return typeof value === 'string' || value instanceof String;
};
exports.isString = isString;
/* Check if the value is a number and inform typescript of this */
const isNumber = (value) => {
    return typeof value === 'number' && isFinite(value);
};
exports.isNumber = isNumber;
