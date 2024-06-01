import React, { useContext, useState } from "react";
import { AppContext } from "../../store/app-state";
import ChooseClient from "./choose-client/choose-client";
import SearchForItem from "./search-for-product/Search-for-product";
import Summary from "./summary/summary";
import "./new-invoice.css";
import { getConfig } from "../../../config/config";

export default (props) => {
  const config = getConfig("createInvoice");
  const { Request, updateProgress, setPopup, user, setInvoice } = useContext(AppContext);
  const [client, setClient] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [receivable, setReceivable] = useState(0);
  const [tax, setTax] = useState(0);
  const [note, setNote] = useState("");

  const selectProduct = (item) => {
    // Items: productNumber, boxSize, box
    setSelectedItems([...selectedItems, item]);
  };

  const onCheckout = async () => {
    try {
      // Invoice: clientId, total, tax, receivable, note
      updateProgress({ loading: true });
      const data = { clientId: client.id, products: selectedItems, receivable, note };
      const invoicePdfFile = await Request.send(data, config.url, config.method);
      setInvoice(invoicePdfFile);
      updateProgress({ loading: false, error: "" });
      setPopup("invoicePreview");
    } catch (error) {
      console.log(error);
      updateProgress({ loading: false, error: error.message });
    }
  };

  if (!client) return <ChooseClient selectClient={setClient} />;

  const disabled = !client | !selectedItems[0];

  return (
    <main className="container new-invoice">
      <h1 className="container-heading no-focus" tabIndex="0">
        This invoice is for {"Mister Tester"}
      </h1>
      <button
        onClick={onCheckout}
        type="button"
        className={"checkout no-focus " + (disabled ? "disabled" : "")}
        disabled={disabled}>
        Checkout
      </button>

      <div className="invoice inner-container">
        <Summary selectedItems={selectedItems} />
        <SearchForItem selectProduct={selectProduct} />
      </div>
    </main>
  );
};
