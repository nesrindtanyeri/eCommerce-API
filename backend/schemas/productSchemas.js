import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(255).required(),
  price: Joi.number().greater(0).required(),
  categoryId: Joi.number().integer().required()
});
