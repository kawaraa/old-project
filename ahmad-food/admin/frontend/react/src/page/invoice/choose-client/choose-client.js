import React, { useContext, useState } from "react";
import { getConfig } from "../../../../config/config";
import Request from "../../../utility/request";
import Client from "./client";

export default ({ selectClient }) => {
  const config = getConfig("clients");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const getClients = async ({ target: { value } }) => {
    const searchText = value.length > 0 ? value : "all";
    try {
      setLoading(true);
      const clients = await Request.fetch(config.url + searchText);
      setClients(clients);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="choose-client container">
      <h1 className="container-heading no-focus">Choose client to invoice</h1>
      <input
        onChange={getClients}
        type="text"
        name="searchText"
        placeholder="Search for a client by Name, Postcode, Street, Phone or Email"
        title="Search for client"
        className="search-input no-line"
      />
      <ul className={"item-list no-focus " + (loading ? "fadeout" : "")}>
        {!clients[0] ? (
          <li className="no-item no-focus">No clients found</li>
        ) : (
          clients.map((client) => <Client client={client} selectClient={selectClient} />)
        )}
      </ul>
    </div>
  );
};
