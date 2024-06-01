"use strict";
const CustomError = require("../../domain/model/custom-error");
const CreateProductCommand = require("../../domain/command/create-product-command");
const SearchCriteria = require("../../domain/model/search-criteria");
const CreateProductQuantityCommand = require("../../domain/command/update-product-quantity-command");
const Validator = require("../../application/handler/validator");

class ProductResolver {
  constructor(server, firewall, productRepository, config) {
    this.server = server;
    this.firewall = firewall;
    this.productRepository = productRepository;
    this.config = config;
  }

  resolve() {
    this.server.use("/product", this.firewall.authRequired);
    this.server.get("/product", this.onSearchForProduct.bind(this));
    this.server.post("/product", this.onCreateProduct.bind(this));
    this.server.put("/product/quantity", this.onUpdateProductQuantity.bind(this));
    this.server.delete("/product/:number", this.onDeleteProduct.bind(this));
  }

  async onSearchForProduct(request, response) {
    try {
      const searchCriteria = new SearchCriteria(request.query);
      const products = await this.productRepository.search(searchCriteria);
      response.json(products);
    } catch (error) {
      response.status(400).end(CustomError.toJson(error));
    }
  }
  async onCreateProduct(request, response) {
    try {
      const command = new CreateProductCommand(request.body);
      await this.productRepository.createProduct(command);
      response.json({ success: true });
    } catch (error) {
      response.status(400).end(CustomError.toJson(error));
    }
  }
  async onUpdateProductQuantity(request, response) {
    try {
      const command = new CreateProductQuantityCommand(request.query);
      await this.productRepository.onUpdateProductQuantity(command);
      response.json({ success: true });
    } catch (error) {
      response.status(400).end(CustomError.toJson(error));
    }
  }
  async onDeleteProduct(request, response) {
    const productNumber = request.params.number;
    try {
      const number = Validator.isString(productNumber, 6, 30) ? productNumber : "find-nothing";
      await this.productRepository.deleteProduct(number);
      response.json({ success: true });
    } catch (error) {
      response.status(400).end(CustomError.toJson(error));
    }
  }
}

module.exports = ProductResolver;
