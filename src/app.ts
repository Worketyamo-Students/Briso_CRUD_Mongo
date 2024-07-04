// src/app.ts
// Lancement du serveur
import { envs } from './core/config/env';
import chalk from 'chalk';
import app from './server';

app.listen(envs.PORT, () => {
	console.log(chalk.greenBright(`Server running on port http://localhost:${envs.PORT}/`));
	console.log(chalk.whiteBright(`Documentation  : http://localhost:${envs.PORT}/api-docs`));
});


