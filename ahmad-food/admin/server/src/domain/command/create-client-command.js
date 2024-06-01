const Validator = require("../../application/handler/validator");
const CustomError = require("../model/custom-error");

class CreateClientCommand {
  constructor(user) {
    this.id = 0;
    this._email = user.email;
    this._hashedPsw = user.psw || "not-specified";
    this.accountStatus = 0;
    this._firstName = user.firstName;
    this._lastName = user.lastName;
    this._gender = user.gender;
    this._vatNumber = user.vatNumber;
    this._phoneNumber = user.phoneNumber;
    this._city = user.city;
    this._postcode = user.postcode;
    this._street = user.street;
    this._about = user.about;
  }
  set _email(value) {
    if (!value) throw new CustomError("Email is required field");
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w[a-zA-Z]{1,5})+$/.test(value);
    if (!isEmail) throw new CustomError("Invalid input Email");
    this.email = value.toLowerCase();
  }

  set _hashedPsw(value) {
    // const pswValidator = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!value) throw new CustomError("Password is required field");
    else if (typeof value !== "string") value += "";
    else if (value.length < 8) throw new CustomError("Password must be at least 8 Characters / Numbers");
    // else if (pswValidator.test(value)) throw new CustomError(pswError);
    this.hashedPsw = value;
  }
  set _firstName(value) {
    if (!Validator.isString(value, 1, 20)) throw new CustomError("Invalid input First Name");
    this.firstName = value;
  }
  set _lastName(value) {
    if (!Validator.isString(value, 4, 20)) throw new CustomError("Invalid input Last Name");
    this.lastName = value;
  }
  set _gender(value) {
    const valid = Validator.isString(value, 4, 6) && /male|female|other/gim.test(value);
    if (!valid) throw new CustomError("Invalid input Gender type");
    this.gender = value;
  }
  set _vatNumber(value) {
    if (!value) throw new CustomError("VAT-Number is required field");
    this.vatNumber = value.toLowerCase();
  }
  set _phoneNumber(value) {
    if (!value) throw new CustomError("Phone Number is required field");
    const isPhoneNumber = !Number.isNaN(Number.parseInt(value));
    if (!isPhoneNumber) throw new CustomError("Invalid input Phone Number");
    this.phoneNumber = value;
  }
  set _city(value) {
    if (!Validator.isString(value, 1, 30)) throw new CustomError("Invalid input City");
    this.city = value;
  }
  set _postcode(value) {
    const valid = Validator.isString((value + "").replace(/\s/gim, ""), 6, 6);
    if (!valid) throw new CustomError("Invalid input Postcode");
    this.postcode = value;
  }
  set _street(value) {
    if (!Validator.isString(value, 1, 50)) throw new CustomError("Invalid input Street");
    this.street = value;
  }
  set _about(value) {
    if (!Validator.isString(value)) throw new CustomError("About field should be type of text");
    this.about = value;
  }
}

module.exports = CreateClientCommand;
