class CreateInvoiceCommand {
  constructor() {
    this.id = 0;
    this.clientId = clientId;
    this.userId = userId;
    this.total = total;
    this.tax = tax;
    this.receivable = receivable;
    this.date = date;
    this.note = note;
  }
}

module.exports = CreateInvoiceCommand;
