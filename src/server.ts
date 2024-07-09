// src/server.ts
// Configurations de Middlewares
import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from './swagger';
import morgan from 'morgan';
import { ONE_HUNDRED, SIXTY } from './core/constants';
import routerProject from './routes/projets.routes';
import routerUser from './routes/user.routes';
import routerStudent from './routes/students.routes';
import routerCertification from './routes/certifications.routes';
import cookieParser from 'cookie-parser';
import helmet from 'helmet'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(
	rateLimit({
		max: ONE_HUNDRED,
		windowMs: SIXTY,
		message: 'Trop de Requete à partir de cette adresse IP '
	})
);
app.use(morgan('combined'));
app.use(cookieParser());
app.use(helmet())

// middleware tables
app.use('/users', routerUser)
app.use('/students', routerStudent)
app.use('/projets', routerProject)
app.use('/certifications', routerCertification)
// app.use('/course',routerCourse)
// app.use('/quiz',routerQuiz)
// app.use('/exercices',routerExercice)
// app.use('/facture',routerFacture)


setupSwagger(app);
export default app;
