"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
// Lancement du serveur
const env_1 = require("./core/config/env");
const server_1 = __importDefault(require("./server"));
server_1.default.listen(env_1.envs.PORT, () => {
    console.log(`Server running on port http://localhost:${env_1.envs.PORT}/`);
    console.log(`Documentation  : http://localhost:${env_1.envs.PORT}/api-docs`);
});
//# sourceMappingURL=app.js.map