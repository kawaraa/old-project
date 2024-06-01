import React from "react";
import "./invoices.css";

export default (props) => {
  return (
    <article className="admin item invoices no-focus">
      <h1>Invoices</h1>
      <form>
        <button type="submit">Add</button>
      </form>
    </article>
  );
};
