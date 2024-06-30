"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
// Fichier de configuration pour la doc
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const env_1 = require("./core/config/env");
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Projet Worketyamo',
        version: '1.0.0',
        description: 'Documentation '
    },
    servers: [
        {
            url: `http://localhost:${env_1.envs.PORT}` // Change this to the URL of your API
        }
    ]
};
const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'] // Path to the API docs
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map