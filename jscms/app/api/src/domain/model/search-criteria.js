const CustomError = require("./custom-error");
class SearchCriteria {
  constructor(search) {
    this._searchText = search.text;
    this._limit = search.limit; // Limit per page
    this._offset = search.offset; // the start of the limit
    this._order = search.order;
  }

  set _offset(value) {
    const number = Number.parseInt(value);
    this.offset = typeof number === "number" ? number : 0;
  }
  set _limit(value) {
    const number = Number.parseInt(value);
    this.limit = typeof number === "number" ? number : 20;
  }
}
module.exports = SearchCriteria;
