import React, { useEffect, useState } from "react";
import Employees from "./employee/employees";
import Clients from "./client/clients";
import Invoices from "./invoice/invoices";
import "./admin.css";

// Admin can Add/Remove worker, Delete client, Activate/Deactivate client account and Update/Delete invoice
export default (props) => {
  const css = "admin-menu item hover no-focus ";
  const [tab, setTab] = useState("employees");

  return (
    <main className="admin container no-focus" tabIndex="0">
      <h1 className="container-heading no-focus" tabIndex="0">
        Admin Page
      </h1>
      <ul className="admin menu no-focus" title=" Admin navigation menu" tabIndex="0">
        <li
          className={css + (tab === "employees" ? "active" : "")}
          onClick={() => setTab("employees")}
          tabIndex="0">
          Employees
        </li>
        <li
          className={css + (tab === "clients" ? "active" : "")}
          onClick={() => setTab("clients")}
          tabIndex="0">
          Clients
        </li>
        <li
          className={css + (tab === "invoices" ? "active" : "")}
          onClick={() => setTab("invoices")}
          tabIndex="0">
          Invoices
        </li>
      </ul>
      {renderTab(tab)}
    </main>
  );
};

function renderTab(tab) {
  switch (tab) {
    case "clients":
      return <Clients />;
    case "invoices":
      return <Invoices />;
    default:
      return <Employees />;
  }
}
