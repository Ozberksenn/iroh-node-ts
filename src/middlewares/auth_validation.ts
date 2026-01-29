import joi from "joi";

class AuthValidation {
    constructor() { }
    static register = async (req: any, res: any, next: any) => {
        try {
            await joi.object({
                mail: joi.string().email().trim().min(6).max(36).required().messages({
                    "string.base": "Email alanı normal metin olmalıdır.",
                    "string.empty": "Email alanı boş olamaz",
                    "string.email": "Lütfen geçerli bir email giriniz.",
                    "string.min": "Email alanı en az üç karakter olmalıdır.",
                    "string.max": "Email alanı en fazla 100 karakterden oluşabilir.",
                    "string.required": "Email alanı zorunludur.",
                }),
                password: joi.string()
                    .trim()
                    .min(6)
                    .max(36)
                    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\":{}|<>\\-]).*$"))
                    .required()
                    .messages({
                        "string.base": "Şifre alanı normal metin olmalıdır.",
                        "string.empty": "Şifre alanı boş olamaz",
                        "string.min": "Şifre alanı en az 6 karakter olmalıdır.",
                        "string.max": "Şifre alanı en fazla 36 karakterden oluşabilir.",
                        "string.pattern.base": "Şifre en az bir büyük harf ve bir özel karakter (örn: !, -, $, vs.) içermelidir.",
                        "string.required": "Şifre alanı zorunludur.",
                    }),
            }).unknown(true).validateAsync(req.body);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error,
            });
        }
        next()
    }
    static login = async (req: any, res: any, next: any) => {
        try {
            await joi.object({
                mail: joi.string().email().trim().min(6).max(36).required().messages({
                    "string.base": "Email alanı normal metin olmalıdır.",
                    "string.empty": "Email alanı boş olamaz",
                    "string.email": "Lütfen geçerli bir email giriniz.",
                    "string.min": "Email alanı en az üç karakter olmalıdır.",
                    "string.max": "Email alanı en fazla 100 karakterden oluşabilir.",
                    "string.required": "Email alanı zorunludur.",
                }),
                password: joi.string()
                    .trim()
                    .min(6)
                    .max(36)
                    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\":{}|<>\\-]).*$"))
                    .required()
                    .messages({
                        "string.base": "Şifre alanı normal metin olmalıdır.",
                        "string.empty": "Şifre alanı boş olamaz",
                        "string.min": "Şifre alanı en az 6 karakter olmalıdır.",
                        "string.max": "Şifre alanı en fazla 36 karakterden oluşabilir.",
                        "string.pattern.base": "Şifre en az bir büyük harf ve bir özel karakter (örn: !, -, $, vs.) içermelidir.",
                        "string.required": "Şifre alanı zorunludur.",
                    })
            }).unknown(true).validateAsync(req.body)
            next()
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error,
            });
        }
    }

}

module.exports = { AuthValidation };