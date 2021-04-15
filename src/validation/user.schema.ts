import Joi from 'joi';

export const userSchemas = {
  createUpdateUser: Joi.object({
    login: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{3,}$'))
      .required(),
    age: Joi.number().integer().min(4).max(130).required(),
  }),
  userId: Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
  }),
  autoSuggest: Joi.object({
    login: Joi.string().required(),
    limit: Joi.number().integer().min(1),
  }),
};
