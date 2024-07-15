import { errorResponse } from "../util/responseUtil.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message).join(', ');
      return errorResponse(res, `Validation error: ${errorMessages}`, 400);
    }

    next();
  };
};
