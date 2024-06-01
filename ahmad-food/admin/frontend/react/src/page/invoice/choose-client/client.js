import React from "react";

export default (props) => {
  const { client, selectClient } = props;
  const { id, firstName, lastName, phoneNumber, email, city, postcode, street, about } = client;

  return (
    <li className="item-list item no-focus" tabIndex="0">
      <header className="list-item header" tabIndex="0">
        <h6 className="list-header name no-focus" tabIndex="0">
          {firstName + " " + lastName}
        </h6>
      </header>

      <div className="list-item table no-focus" tabIndex="0">
        {renderTableRow("City", city)}
        {renderTableRow("Postcode", postcode)}
        {renderTableRow("Street", street)}
        {renderTableRow("Email", email)}
        {renderTableRow("Phone", phoneNumber)}
        {renderTableRow("About", about)}
      </div>

      <button
        onClick={() => selectClient(client)}
        type="button"
        title="Choose client"
        className="button hover no-focus">
        Choose
      </button>
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
