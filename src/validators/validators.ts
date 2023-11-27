import { body, param } from "express-validator";

export const Validator = {
  User: {
    register: [body("email").exists().isEmail(), body("password").exists().isLength({ min: 7 })],
    signin: [body("email").exists().isEmail(), body("password").exists().isLength({ min: 7 })],
  },
  Source: {
    create: [
      body("sourceTypeId").exists().isString(),

      body("currenciesData").exists().isArray(),
      body("currenciesData.*.currencyTypeId").exists().isString(),
      body("currenciesData.*.amount").exists().isNumeric(),
    ],
    update: [
      param("id").exists().isString(),

      body("newCurrencies").optional().isArray(),
      body("newCurrencies.*.currencyTypeId").exists().isString(),
      body("newCurrencies.*.amount").exists().isNumeric(),

      body("updatedCurrencies").optional().isArray(),
      body("updatedCurrencies.*.id").exists().isString(),
      body("updatedCurrencies.*.amount").exists().isNumeric(),

      body("deletedCurrencies").optional().isArray(),
      body("deletedCurrencies.*").exists().isString(),

      body().custom(body => {
        if (!body.newCurrencies && !body.updatedCurrencies && !body.deletedCurrencies) {
          throw new Error(
            "At least one of newCurrencies, updatedCurrencies, or deletedCurrencies must be provided"
          );
        }
        return true;
      }),
    ],
    delete: [param("id").exists().isString()],
  },
  SourceType: {
    read: [param("id").exists().isString()],
    create: [
      body("name").exists().isString(),
      body("symbol").exists().isString(),
      body("url").optional().isString(),
    ],
    delete: [param("id").exists().isString()],
  },

  CurrencyType: {
    read: [param("id").optional().isString()],
    create: [
      body("symbol").exists().isString(),
      body("name").exists().isString(),
      body("price").exists().optional().isNumeric(),
    ],
    delete: [param("id").exists().isString()],
  },
};
