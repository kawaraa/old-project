const Validator = require("../../application/handler/validator");

class SearchCriteria {
  constructor(criteria) {
    this._text = criteria.searchText;
    this._orderBy = criteria.sortBy;
    // this._limit = criteria.limit; // Limit per page
    // this._offset = criteria.offset; // the start of the limit
  }

  set _text(value) {
    this.text = Validator.isString(value, 0, 20) ? value : "find-nothing";
  }
  set _orderBy(value) {
    if (value === "quantityLeft") this.orderBy = "inStock";
    else if (value === "mostSold") this.orderBy = "totalSold";
    else if (value === "costPrice") this.orderBy = "costPrice";
    else if (value === "retailPrice") this.orderBy = "retailPrice";
    else if (value === "date") this.orderBy = "date";
    else if (value === "total") this.orderBy = "total";
    else this.orderBy = "";
  }
  // set _offset(value) {
  //   const number = Number.parseInt(value);
  //   this.offset = typeof number === "number" ? number : 0;
  // }
  // set _limit(value) {
  //   const number = Number.parseInt(value);
  //   this.limit = typeof number === "number" ? number : 20;
  // }
}
module.exports = SearchCriteria;
