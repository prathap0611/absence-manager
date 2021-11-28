import { Joi } from 'express-validation';

export const getAbsenteesValidation = {
    query: Joi.object({
        offset: Joi.number(),
        limit: Joi.number(),
        type: Joi.string().valid(...['vacation', 'sickness']),
        date: Joi.date(),
    }),
};
