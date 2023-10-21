import { body } from "express-validator";

const currenciesDataValidation = [
  body("currenciesData").exists().isArray(),
  body("currenciesData.*.currencyTypeId").exists().isString(),
  body("currenciesData.*.amount").exists().isNumeric(),
];

export const Validator = {
  User: {
    register: [body("email").exists().isEmail(), body("password").exists().isLength({ min: 7 })],
    signin: [body("email").exists().isEmail(), body("password").exists().isLength({ min: 7 })],
  },
  Source: {
    create: [body("sourceTypeId").exists().isString(), ...currenciesDataValidation],
  },
  SourceType: {
    read: [body("id").exists().isString()],
    create: [
      body("name").exists().isString(),
      body("symbol").exists().isString(),
      body("url").optional().isString(),
    ],
  },

  CurrencyType: {
    read: [body("symbol").optional().isString(), body("id").optional().isString()],
    create: [
      body("symbol").exists().isString(),
      body("name").exists().isString(),
      body("price").exists().optional().isNumeric(),
    ],
  },
};
