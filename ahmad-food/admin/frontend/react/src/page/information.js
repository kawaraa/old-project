import React from "react";

export default (props) => {
  return (
    <main className="container no-focus">
      <h1 className="container-heading no-focus">Information page</h1>
      <p>
        Budget Show how much payable is there. Show how much receivable is there. Show how much is total sales
        since the beginning of the current year. Show how much is total spend since the beginning of the
        current year.
      </p>
      <br />
      <p>
        Query pick a city, postcode, street or all to check how many there are pick a product number to check
        how many has been Sold the last day, week, quarter, year
      </p>
    </main>
  );
};
