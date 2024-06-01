import React, { useContext, useEffect, useState } from "react";
import { getConfig } from "../../../../config/config";
import { AppContext } from "../../../store/app-state";
import Client from "./client";

export default (props) => {
  const config = getConfig("clients");
  const { Request, setPage } = useContext(AppContext);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const removeClient = (id) => {
    setClients(clients.filter((item) => item.id !== id));
  };

  const getClients = async (searchText = "all") => {
    try {
      setLoading(true);
      const clients = await Request.fetch(config.url + searchText);
      setClients(clients);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChange = ({ target }) => getClients(target.value);

  useEffect(() => {
    getClients();
  }, []);

  return (
    <article className="admin item clients no-focus">
      <input
        onChange={handleChange}
        type="text"
        name="searchText"
        placeholder="Search for clients by Name, Postcode, Street, Phone or Email"
        title="Search for clients"
        className="search-input no-focus"
      />
      <ul className={"item-list no-focus " + (loading ? "fadeout" : "")} title="Client list" tabIndex="0">
        {!clients[0] ? (
          <li className="no-item no-focus">No clients found</li>
        ) : (
          clients.map((item) => <Client {...item} remove={removeClient} />)
        )}
      </ul>

      <button onClick={() => setPage("createClient")} type="button" className="add-button no-focus">
        +
      </button>
    </article>
  );
};
