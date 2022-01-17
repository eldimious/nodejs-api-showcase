import { Request } from 'express';
import { IRequestId } from './IRequestUser';

export type IExpressRequest = Request & IRequestId;
