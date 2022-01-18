import { Request } from 'express';
import { IRequestUser } from './IRequestUser';

export type IExpressRequest = Request & IRequestUser;
