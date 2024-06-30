"use strict";
/* eslint-disable @typescript-eslint/no-magic-numbers */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCode = exports.ONE_THOUSAND = exports.ONE_HUNDRED = exports.SIXTY = void 0;
exports.SIXTY = 60;
exports.ONE_HUNDRED = 100;
exports.ONE_THOUSAND = 1000;
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["OK"] = 200] = "OK";
    HttpCode[HttpCode["CREATED"] = 201] = "CREATED";
    HttpCode[HttpCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpCode || (exports.HttpCode = HttpCode = {}));
//# sourceMappingURL=index.js.map