"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsLengthCheck = void 0;
var argsLengthCheck = function (args) {
    var argsLength = args.length;
    if (argsLength >= 31) {
        throw new Error("引数が31個以上指定されています");
    }
};
exports.argsLengthCheck = argsLengthCheck;
