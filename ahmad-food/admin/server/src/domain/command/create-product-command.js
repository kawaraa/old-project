const CustomError = require("../model/custom-error");
const Validator = require("../../application/handler/validator");

class CreateProductCommand {
  constructor(product) {
    this._number = product.number;
    this._name = product.name;
    this._type = product.type;
    this._amount = product.amount;
    this._unit = product.unit;
    this._costPrice = product.costPrice;
    this._wholesalePrice = product.wholesalePrice;
    this._retailPrice = product.retailPrice;
    this._inStock = product.inStock;
    this._description = product.description;
  }
  set _number(value) {
    if (!Validator.isString(value, 6, 30)) throw new CustomError("Invalid input Product Number");
    this.number = value;
  }
  set _name(value) {
    if (!Validator.isString(value, 2, 30)) throw new CustomError("Invalid input Product Name");
    this.name = value;
  }
  set _type(value) {
    if (!Validator.isString(value, 1, 20)) throw new CustomError("Invalid input Product type");
    this.type = value;
  }
  set _amount(value) {
    if (!Validator.isNumber(value, 1, 9000)) throw new CustomError("Invalid input Product amount");
    this.amount = value;
  }
  set _unit(value) {
    value += "";
    this.unit = value === "kg" || value === "pcs" ? value : "kg";
  }
  set _costPrice(value) {
    if (!Validator.isNumber(value, 0.1, 900)) throw new CustomError("Invalid input Product Cost price");
    this.costPrice = value;
  }
  set _wholesalePrice(value) {
    if (!Validator.isNumber(value, 0.1, 900)) throw new CustomError("Invalid input Product  Wholesale Price");
    this.wholesalePrice = value;
  }
  set _retailPrice(value) {
    if (!Validator.isNumber(value, 0.1, 900)) throw new CustomError("Invalid input Product Retail Price");
    this.retailPrice = value;
  }
  set _inStock(value) {
    if (!Validator.isNumber(value, 1)) throw new CustomError("Invalid input Product Quantity");
    this.inStock = value;
  }
  set _description(value) {
    if (!Validator.isString(value, 0, 250)) throw new CustomError("Invalid input Product Description");
    this.description = value;
  }
}

module.exports = CreateProductCommand;
