import React, { createContext, useState, useEffect } from "react";
import Request from "../utility/request";

export const AppContext = createContext();

// App State provider
export default (props) => {
  const [progress, setProgress] = useState({ loading: false, error: "" });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("newInvoice");
  const [popup, setPopup] = useState("");
  const [invoice, setInvoice] = useState(null);

  const updateProgress = (state) => setProgress({ ...progress, ...state });

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => setMessage(""), 1000);
  };

  const state = {
    Request,
    progress,
    updateProgress,
    message,
    showMessage,
    user,
    setUser,
    page,
    setPage,
    popup,
    setPopup,
    invoice,
    setInvoice,
  };
  return <AppContext.Provider value={state}>{props.children}</AppContext.Provider>;
};
