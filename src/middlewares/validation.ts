import { Schema } from 'joi';
import { NextFunction, Request, Response } from 'express';

export const validate = (schema: Schema, prop: 'body' | 'params' | 'query') => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const result = schema.validate(req[prop]);
  if (result.error) {
    res.statusCode = 400;
    res.json({ error: { message: result.error.details.map((detail) => detail.message) } });
  } else {
    next();
  }
};
