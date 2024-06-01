import React, { useContext, useState } from "react";
import { getConfig } from "../../../../config/config";
import { AppContext } from "../../../store/app-state";

export default (props) => {
  const config = getConfig("deleteEmployee");
  const { Request, updateProgress } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { firstName, lastName, gender, username, email, city, phoneNumber, postcode, street, about } = props;

  const deleteEmployee = async () => {
    try {
      setLoading(true);
      await Request.fetch(config.url + props.id, config.method);
      setLoading(false);
      props.remove(props.id);
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
        <button onClick={deleteEmployee} type="button" className="no-focus">
          Delete
        </button>
        <h4 className="list-header name no-focus" tabIndex="0">
          {firstName + " " + lastName}
        </h4>
      </header>

      <div className="list-item table no-focus" tabIndex="0">
        {renderTableRow("Gender", gender)}
        {renderTableRow("Username", username)}
        {renderTableRow("Email", email)}
        {renderTableRow("City", city)}
        {renderTableRow("Phone", phoneNumber)}
        {renderTableRow("Postcode", postcode)}
        {renderTableRow("Street", street)}
        {renderTableRow("About", about)}
      </div>
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
