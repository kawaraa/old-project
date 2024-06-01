const Validator = require("../model/validator");
const CustomError = require("../model/custom-error");

class CreateCssStyleCommand {
  constructor(element) {
    this.id = element.id;
    this._parent = element.parent;
    this._type = element.type;
    this._text = element.text;
    this._order = element.order;
  }

  set _parent(value) {
    if (Validator.isString(value, 1, 250)) throw new CustomError("Invalid input parent id");
    this.parent = value;
  }
  set _type(value) {
    if (!tags.find((tag) => tag === value)) throw new CustomError("Invalid input tag name");
    this.type = value;
  }
  set _text(value) {
    if (typeof value !== "string") throw new CustomError("Invalid input Description field must be text");
    this.text = value;
  }
  set _order(value) {
    this.order = value;
  }
}

module.exports = CreateCssStyleCommand;
