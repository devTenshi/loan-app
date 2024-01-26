import joi from 'joi';

export const ValidateLoginUser = joi.object({
    body: joi.object({
      email: joi
        .string()
        .email("This is not a valid email.")
        .trim()
        .required()
        .min(8, { message: "Email length must be at least 8." }),
      password: joi
        .string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        .min(8, { message: "password must be at least 8 characters" })
        .max(50, {
          message: "The password can't accept more than 50 characters",
        }),
    }),
  });