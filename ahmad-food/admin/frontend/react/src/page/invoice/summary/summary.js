import React from "react";
import "./summary.css";

export default ({ selectedItems }) => {
  const total = selectedItems.reduce((total, { boxSize, box, price }) => boxSize * box * price + total, 0);

  return (
    <article className="summary wrapper">
      <h2 className="summary heading no-focus" tabIndex="0">
        Summary
      </h2>
      <ul className="item-list summary no-focus" title="Summary of the selected items list" tabIndex="0">
        <li className="summary-list-header no-focus" title="Invoice item header" tabIndex="0">
          <h6 className="list-header head no-focus" tabIndex="0">
            Number
          </h6>
          <h6 className="list-header head no-focus" tabIndex="0">
            Name
          </h6>
          <h6 className="list-header head no-focus" tabIndex="0">
            Amount
          </h6>
          <h6 className="list-header head no-focus" tabIndex="0">
            Box Size
          </h6>
          <h6 className="list-header head no-focus" tabIndex="0">
            Box
          </h6>
          <h6 className="list-header head no-focus" tabIndex="0">
            Price
          </h6>
        </li>

        {selectedItems[0] && selectedItems.map((item) => renderSelectedItm(item))}
        {selectedItems[0] && (
          <li className="summary total no-focus" title="Total of the selected items" tabIndex="0">
            €{total}
          </li>
        )}
        {!selectedItems[0] && <li className="product no-item no-focus">No items are added yet</li>}
      </ul>
    </article>
  );
};

const renderSelectedItm = ({ number, name, amount, unit, boxSize, box, price }) => {
  return (
    <li className="summary-list item no-focus" title="Invoice selected item" tabIndex="0">
      <p className="list-item cell no-focus" title="Item number" tabIndex="0">
        {number}
      </p>
      <p className="list-item cell no-focus" title="Item name" tabIndex="0">
        {name}
      </p>
      <p className="list-item cell no-focus" title="Item amount" tabIndex="0">
        {amount + unit}
      </p>
      <p className="list-item cell no-focus" title="Item box size" tabIndex="0">
        {boxSize}
      </p>
      <p className="list-item cell no-focus" title="Item box number" tabIndex="0">
        {box}
      </p>
      <p className="list-item cell no-focus" title="Item price" tabIndex="0">
        €{price}/€{boxSize * box * price}
      </p>
    </li>
  );
};
