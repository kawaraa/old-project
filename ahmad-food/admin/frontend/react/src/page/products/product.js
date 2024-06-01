import React, { useContext, useState } from "react";
import { AppContext } from "../../store/app-state";
import { getConfig } from "../../../config/config";

export default (props) => {
  const config = getConfig("product");
  const { Request, updateProgress } = useContext(AppContext);
  const { number, name, type, amount, unit, costPrice, wholesalePrice, retailPrice, inStock } = props;
  const [loading, setLoading] = useState(false);

  const updateQuantity = async (e) => {
    e.preventDefault();
    const form = e.target;
    const url = config.updateQuantity.url + `?number=${number}&quantity=${form.quantity.value}`;
    try {
      setLoading(true);
      await Request.fetch(url, config.updateQuantity.method);
      setLoading(false);
      props.updateQuantity(number, Number.parseInt(form.quantity.value));
      updateProgress({ error: "" });
      form.reset();
    } catch (error) {
      setLoading(false);
      updateProgress({ error: error.message });
    }
  };

  const deleteClient = async () => {
    try {
      setLoading(true);
      await Request.fetch(config.delete.url + number, config.delete.method);
      setLoading(false);
      props.remove(number);
      updateProgress({ error: "" });
    } catch (error) {
      setLoading(false);
      updateProgress({ error: error.message });
    }
  };

  if (loading) return <li className="admin-list loading no-focus">Loading ...</li>;
  return (
    <li className="item-list item no-focus" tabIndex="0">
      <header className="list-item header" tabIndex="0">
        <button onClick={deleteClient} type="button" title="Delete product" className="no-focus">
          Delete
        </button>
        <h4 className="list-header name no-focus" tabIndex="0">
          {inStock} Left
        </h4>
        <form onSubmit={updateQuantity} className="list-header form no-focus" tabIndex="0">
          <input
            type="number"
            name="quantity"
            id="quantity"
            defaultValue="0"
            min="1"
            className="no-focus"
            required
          />
          <button type="submit" title="Save quantity" className="no-focus">
            Save
          </button>
        </form>
      </header>

      <div className="list-item table  no-focus" tabIndex="0">
        {renderTableRow("Number", number)}
        {renderTableRow("Name", name)}
        {renderTableRow("Type", type)}
        {renderTableRow("Amount", amount + unit)}
        {renderTableRow("Cost Price", costPrice)}
        {renderTableRow("Wholesale Price", wholesalePrice)}
        {renderTableRow("Retail Price", retailPrice)}
        {renderTableRow("Total Sold", props.totalSold || 0)}
      </div>
      {renderTableRow("Description", props.description)}
    </li>
  );
};

const renderTableRow = (name, value) => {
  return (
    <div className="list-table row">
      <h6 className="head">{name}</h6>
      <p className="cell">{value}</p>
    </div>
  );
};
