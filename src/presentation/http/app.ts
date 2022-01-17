import http from 'http';
import express, { Response, NextFunction } from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import logger from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { authenticateEndpoint } from './middleware/authentication';
import { authRouter } from './routes/auth/routes';
import { usersRouter } from './routes/users/routes';
import { errorHandler } from './routes/errors/routes';
import { asyncWrapper } from './utils/asyncWrapper';
import { IServices } from '../../common/interfaces/IServices';
import { IExpressRequest } from '../../common/interfaces/IExpressRequest';

const compress = compression();
const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(compress);
app.use(logger('dev'));
app.use(cors());

export const appServerFactory = {
  init(services: IServices): http.Server {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/auth', authRouter.init(services));
    app.all('*', asyncWrapper(authenticateEndpoint()), (_req: IExpressRequest, _res: Response, next: NextFunction) => {
      next();
    });
    app.use('/users', usersRouter.init(services));
    app.use(errorHandler);
    return http.createServer(app);
  },
};
