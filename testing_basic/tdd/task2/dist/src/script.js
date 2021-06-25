"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divide = exports.multiply = exports.subtract = exports.add = void 0;
var util_1 = require("../src/util");
var add = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    util_1.argsLengthCheck(args);
    var result = args.reduce(function (previous, current) {
        return previous + current;
    });
    if (result > 1000) {
        return "too big";
    }
    return result;
};
exports.add = add;
var subtract = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    util_1.argsLengthCheck(args);
    var result = args.reduce(function (previous, current) {
        return previous - current;
    });
    if (result < 0) {
        return "negative number";
    }
    return result;
};
exports.subtract = subtract;
var multiply = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    util_1.argsLengthCheck(args);
    var result = args.reduce(function (previous, current) {
        return previous * current;
    });
    if (result > 1000) {
        return "big big number";
    }
    return result;
};
exports.multiply = multiply;
var divide = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    util_1.argsLengthCheck(args);
    var result = args.reduce(function (previous, current) {
        return previous / current;
    });
    if (Number.isInteger(result)) {
        return result;
    }
    return Math.floor(result);
};
exports.divide = divide;
