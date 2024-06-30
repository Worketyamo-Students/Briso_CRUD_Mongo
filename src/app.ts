// src/app.ts
// Lancement du serveur
import { envs } from './core/config/env';
import app from './server';
app.listen(envs.PORT, () => {
	console.log(`Server running on port http://localhost:${envs.PORT}/`);
	console.log(`Documentation  : http://localhost:${envs.PORT}/api-docs`);
});


