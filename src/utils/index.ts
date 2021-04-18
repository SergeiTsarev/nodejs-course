import { Response } from 'express';

export const generateResponseError: (
  res: Response,
  errorMessage: string,
  statusCode?: number,
) => Response = (res, errorMessage, statusCode = 400) => {
  res.statusCode = statusCode;

  return res.json({ error: { message: errorMessage } });
};
