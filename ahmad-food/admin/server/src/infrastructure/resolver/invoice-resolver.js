"use strict";
const CustomError = require("../../domain/model/custom-error");
const SearchCriteria = require("../../domain/model/search-criteria");
const CreateInvoiceCommand = require("../../domain/command/create-invoice-command");

class InvoiceResolver {
  constructor(server, firewall, invoiceRepository, config) {
    this.server = server;
    this.firewall = firewall;
    this.invoiceRepository = invoiceRepository;
    this.config = config;
  }

  resolve() {
    this.server.use("/invoice", this.firewall.authRequired);
    this.server.get("/invoice", this.onSearchForInvoice.bind(this));
    this.server.post("/invoice", this.onCreateInvoice.bind(this));
    this.server.delete("/invoice/", this.firewall.adminRequired, this.onDeleteInvoice.bind(this));
  }

  async onSearchForInvoice(request, response) {
    try {
      const searchCriteria = new SearchCriteria(request.query);
      const invoices = await this.invoiceRepository.searchByText(searchCriteria);
      response.json(invoices);
    } catch (error) {
      console.log(error);
      response.status(400).end(CustomError.toJson(error));
    }
  }
  async onCreateInvoice(request, response) {
    try {
      const pdfFile = request.body;
      console.log(pdfFile);
      // todo: convert the request.body to pdf file then send the create an invoice in the database,and then snd the pdfFile
      // await this.invoiceRepository.createInvoice(new CreateInvoiceCommand(request.body));
      response.json(pdfFile);
    } catch (error) {
      console.log(error);
      response.status(400).end(CustomError.toJson(error));
    }
  }

  async onDeleteInvoice(request, response) {
    try {
      const id = request.params.id.length < 15 ? request.params.id : "find-nothing";
      await this.invoiceRepository.deleteInvoice(id);
      response.json({ success: true });
    } catch (error) {
      console.log(error);
      response.status(400).end(CustomError.toJson(error));
    }
  }
}

module.exports = InvoiceResolver;
