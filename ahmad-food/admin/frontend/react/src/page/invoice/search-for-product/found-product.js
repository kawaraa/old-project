import React from "react";

export default (props) => {
  const { product, selectProduct } = props;
  const { number, name, type, amount, unit, costPrice, wholesalePrice, retailPrice, inStock } = product;

  const addProduct = (e) => {
    e.preventDefault();
    const { boxSize, box, priceType } = e.target;
    const newProduct = {
      ...product,
      boxSize: Number.parseInt(boxSize.value),
      box: Number.parseInt(box.value),
      priceType: priceType.value,
      price: priceType.value === "retailPrice" ? retailPrice : wholesalePrice,
    };
    selectProduct(newProduct);
  };

  return (
    <li className="item-list item no-focus" tabIndex="0">
      <header className="list-item header no-focus" tabIndex="0">
        <h4 className="list-header name no-focus" tabIndex="0">
          {inStock} Left
        </h4>
        <form onSubmit={addProduct} className="list-header form no-focus" tabIndex="0">
          <label for="price-type">
            Price
            <select name="priceType" required id={"price-type" + Math.random()} title="Price type">
              <option value="wholesalePrice" selected>
                Wholesale
              </option>
              <option value="retailPrice">Retail</option>
            </select>
          </label>

          <select name="boxSize" required className="no-focus" title="Box size">
            <option value="4" selected>
              4
            </option>
            <option value="8">8</option>
            <option value="8">12</option>
          </select>
          <span className="slash">/</span>
          <input
            type="number"
            name="box"
            id={"box" + Math.random()}
            defaultValue="1"
            min="1"
            className="no-focus"
            required
          />
          <button type="submit" title="Add product" className="no-focus">
            Add
          </button>
        </form>
      </header>

      <div className="list-item table product no-focus" tabIndex="0">
        {renderTableRow("Number", number)}
        {renderTableRow("Name", name)}
        {renderTableRow("Type", type)}
        {renderTableRow("Amount", amount + unit)}
        {renderTableRow("Cost Price", costPrice)}
        {renderTableRow("Wholesale Price", wholesalePrice)}
        {renderTableRow("Retail Price", retailPrice)}
        {renderTableRow("Total Sold", product.totalSold || 0)}
        {renderTableRow("Description", product.description)}
      </div>
    </li>
  );
};

const renderTableRow = (name, value) => {
  return (
    <div className="list-table row product">
      <h6 className="head">{name}</h6>
      <p className="cell">{value}</p>
    </div>
  );
};
