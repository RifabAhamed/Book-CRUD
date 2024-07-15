import Joi from "joi";

export const bookValidationSchema = Joi.object({
  bookName: Joi.string().required().messages({
    "string.base": `"bookName" should be a type of 'text'`,
    "string.empty": `"bookName" cannot be an empty field`,
    "any.required": `"bookName" is a required field`,
  }),
  author: Joi.string().required().messages({
    "string.base": `"author" should be a type of 'text'`,
    "string.empty": `"author" cannot be an empty field`,
    "any.required": `"author" is a required field`,
  }),
  price: Joi.number().required().messages({
    "number.base": `"price" should be a type of 'number'`,
    "number.empty": `"price" cannot be an empty field`,
    "any.required": `"price" is a required field`,
  })
});

export const updatebookValidationSchema = Joi.object({
  bookName: Joi.string().required().messages({
    "string.base": `"bookName" should be a type of 'text'`,
    "string.empty": `"bookName" cannot be an empty field`,
    "any.required": `"bookName" is a required field`,
  }),
  author: Joi.string().required().messages({
    "string.base": `"author" should be a type of 'text'`,
    "string.empty": `"author" cannot be an empty field`,
    "any.required": `"author" is a required field`,
  }),
  price: Joi.number().required().messages({
    "number.base": `"price" should be a type of 'number'`,
    "number.empty": `"price" cannot be an empty field`,
    "any.required": `"price" is a required field`,
  }),
  bookId: Joi.string().required({
    "string.base": `"bookId" should be a type of 'text'`,
    "string.empty": `"bookId" cannot be an empty field`,
    "any.required": `"bookId" is a required field`,
  })
});
