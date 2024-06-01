import React, { useContext, useState } from "react";
import { getConfig } from "../../../../config/config";
import { AppContext } from "../../../store/app-state";

export default (props) => {
  const config = getConfig("client");
  const { Request, updateProgress } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { firstName, lastName, gender, email, accountStatus, vatNumber, city, phoneNumber, postcode } = props;

  const activateClient = async () => {
    try {
      setLoading(true);
      await Request.fetch(config.activate.url + props.id, config.activate.method);
      setLoading(false);
      props.remove(props.id);
      updateProgress({ error: "" });
    } catch (error) {
      setLoading(false);
      updateProgress({ error: error.message });
    }
  };

  const deleteClient = async () => {
    try {
      setLoading(true);
      await Request.fetch(config.delete.url + props.id, config.delete.method);
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
        <button onClick={deleteClient} type="button" className="no-focus">
          Delete
        </button>
        <h4 className="list-header name no-focus" tabIndex="0">
          {firstName + " " + lastName}
        </h4>
        {accountStatus < 1 && (
          <button onClick={activateClient} type="button" className="no-focus">
            Activate
          </button>
        )}
      </header>

      <div className="list-item table no-focus" tabIndex="0">
        {renderTableRow("Gender", gender)}
        {renderTableRow("Email", email)}
        {renderTableRow("VAT-Number", vatNumber)}
        {renderTableRow("City", city)}
        {renderTableRow("Phone", phoneNumber)}
        {renderTableRow("Postcode", postcode)}
        {renderTableRow("Street", props.street)}
        {renderTableRow("About", props.about)}
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
