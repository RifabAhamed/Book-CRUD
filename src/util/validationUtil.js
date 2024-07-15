import Joi from 'joi';

/**
 * Validates request data against a Joi schema.
 * @param {object} data - The request data to validate.
 * @param {Joi.Schema} schema - The Joi schema to validate against.
 * @returns {Promise<void>} - A Promise that resolves if validation succeeds, otherwise rejects with validation errors.
 */

export const validateRequest = async (data, schema) => {
  try {
    await schema.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw error;
  }
};