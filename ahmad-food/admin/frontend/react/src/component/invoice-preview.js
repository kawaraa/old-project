import React, { useContext } from "react";
import { AppContext } from "../store/app-state";

export default (props) => {
  const { invoice } = useContext(AppContext);

  if (!invoice) return <p>There is no invoice to show</p>;

  console.log(invoice);

  return (
    <div className="popup-container">
      <div className="popup inner">
        <article>
          <h1>Invoice Preview page</h1>
          <button>download</button>
          <button>Share</button>
          <button>Print</button>
        </article>
      </div>
    </div>
  );
};
