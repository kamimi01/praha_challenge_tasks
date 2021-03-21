"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divide = exports.multiply = exports.subtract = exports.add = void 0;
var argsLengthCheck = function (args) {
    var argsLength = args.length;
    if (argsLength >= 31) {
        throw new Error("引数が31個以上指定されています");
    }
};
function add() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    argsLengthCheck(args);
    var result = args.reduce(function (previous, current) {
        return previous + current;
    });
    if (result > 1000) {
        return "too big";
    }
    return result;
}
exports.add = add;
function subtract() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    argsLengthCheck(args);
    return args.reduce(function (previous, current) {
        return previous - current;
    });
}
exports.subtract = subtract;
function multiply() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    argsLengthCheck(args);
    return args.reduce(function (previous, current) {
        return previous * current;
    });
}
exports.multiply = multiply;
function divide() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    argsLengthCheck(args);
    return args.reduce(function (previous, current) {
        return previous / current;
    });
}
exports.divide = divide;
