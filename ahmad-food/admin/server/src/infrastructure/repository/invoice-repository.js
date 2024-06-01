const CustomError = require("../../domain/model/custom-error");

class InvoiceRepository {
  constructor(mySqlProvider, config) {
    this.mySqlProvider = mySqlProvider;
    this.config = config;
  }

  async searchByText(searchCriteria) {
    console.log(searchCriteria);
  }

  async createInvoice(invoice) {
    console.log(invoice);
  }

  async deleteInvoice(id) {
    console.log(id);
  }
}

module.exports = InvoiceRepository;
