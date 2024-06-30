"use strict";
// src/core/config/env.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    API_PREFIX: (0, env_var_1.get)('DEFAULT_API_PREFIX').default('/api/v1').asString(),
    NODE_ENV: (0, env_var_1.get)('NODE_ENV').default('development').asString()
};
//# sourceMappingURL=env.js.map