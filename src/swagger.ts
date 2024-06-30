// Fichier de configuration pour la doc
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { Express } from 'express';
import { envs } from './core/config/env';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Projet Worketyamo',
		version: '1.0.0',
		description: 'Documentation '
	},
	servers: [
		{
			url: `http://localhost:${envs.PORT}` // Change this to the URL of your API
		}
	]
};

const options = {
	swaggerDefinition,
	apis: ['./src/routes/*.ts'] // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
