"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
// Configurations de Middlewares
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_1 = require("./swagger");
const test_routes_1 = __importDefault(require("./routes/test.routes"));
const morgan_1 = __importDefault(require("morgan"));
const constants_1 = require("./core/constants");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
app.use((0, express_rate_limit_1.default)({
    max: constants_1.ONE_HUNDRED,
    windowMs: constants_1.SIXTY,
    message: 'Trop de Requete à partir de cette adresse IP '
}));
app.use((0, morgan_1.default)('combined'));
app.use(test_routes_1.default);
(0, swagger_1.setupSwagger)(app);
exports.default = app;
//# sourceMappingURL=server.js.map