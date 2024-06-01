const Validator = require("../../application/handler/validator");
const CustomError = require("../model/custom-error");

class CreateProductQuantityCommand {
  constructor(product) {
    this._number = product.number;
    this._quantity = Number.parseInt(product.quantity);
  }
  set _number(value) {
    if (!Validator.isString(productNumber, 6, 30)) throw new CustomError("Invalid input Product Number");
    this.number = value;
  }
  set _quantity(value) {
    if (!Validator.isNumber(value)) throw new CustomError("Invalid input Product Quantity");
    this.quantity = Number.parseInt(value);
  }
}

module.exports = CreateProductQuantityCommand;
