import Joi from "joi";

export const registerValidationSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        "string.empty": "Full name is required",
    }),
    email: Joi.string().email().trim().required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
    }),
    password: Joi.string().min(6).trim().required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
    }),
    confirm_password: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .label("Confirm password")
        .messages({
            "any.only": "{{#label}} does not match password",
            "string.empty": "Confirm password is required",
        }),
});