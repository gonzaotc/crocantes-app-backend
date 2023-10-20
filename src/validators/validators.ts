import { body } from "express-validator";

const currenciesDataValidation = [
  body("currenciesData").isArray().withMessage("currenciesData should be an array"),
  body("currenciesData.*.currencyTypeId")
    .isString()
    .withMessage("Each currencyTypeId should be a string"),
  body("currenciesData.*.amount").isNumeric().withMessage("Each amount should be a number"),
];

export const Validator = {
  User: {
    register: [body("email").isEmail(), body("password").isLength({ min: 8 })],
    signin: [body("email").isEmail(), body("password").isLength({ min: 8 })],
  },
  Source: {
    create: [body("sourceTypeId").isString(), ...currenciesDataValidation],
  },
  SourceType: {
    read: [body("id").isString()],
    create: [body("name").isString(), body("symbol").isString(), body("url").optional().isString()],
  },

  CurrencyType: {
    read: [body("symbol").optional().isString(), body("id").optional().isString()],
    create: [
      body("symbol").isString(),
      body("name").isString(),
      body("price").optional().isNumeric(),
    ],
  },
};
