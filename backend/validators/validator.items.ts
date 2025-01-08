import Joi from 'joi';

// Joi schema for user registration
export const itemsSchema = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(500).allow(null, ''),
  price: Joi.number().positive().precision(2).required()
});
