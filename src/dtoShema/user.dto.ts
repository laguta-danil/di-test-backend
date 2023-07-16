import { checkSchema } from 'express-validator';

export const userDto = checkSchema({
  id: { optional: true },
  username: { notEmpty: true, isLength: { options: { min: 3, max: 30 } } },
  password: { isLength: { options: { min: 6 } }, notEmpty: true },
});
