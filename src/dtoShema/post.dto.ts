import { checkSchema } from 'express-validator';
export const postDto = checkSchema({
  id: { optional: true },
  title: {
    isLength: {
      options: { min: 120 },
      errorMessage: 'Title should be at least max 120 chars',
    },
    notEmpty: true,
  },
  description: { notEmpty: true },
  categories: {},
  pubDate: { optional: true },
  authorId: { optional: true },
  link: { notEmpty: true },
  imageUrl: { notEmpty: true },
});
