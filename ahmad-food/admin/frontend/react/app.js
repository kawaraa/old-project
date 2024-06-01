import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AppProvider, { AppContext } from "./src/store/app-state";
import { getConfig, setEventsListeners } from "./config/config";
import CustomMessage from "./src/layout/custom-message";
import LoadingScreen from "./src/layout/loading-screen";
import Navbar from "./src/layout/navbar";
import Login from "./src/page/login/login";
import NewInvoice from "./src/page/invoice/new-invoice";
import CreateClient from "./src/page/create-client/create-client";
import Products from "./src/page/products/products";
import Information from "./src/page/information";
import Admin from "./src/page/admin/admin";
import CreateProductForm from "./src/component/create-product-form";
import AddEmployeeForm from "./src/component/add-employee-form";
import InvoicePreview from "./src/component/invoice-preview";
import "./app.css";

function App() {
  const config = getConfig("app");
  const { Request, progress, page, popup, message, user, setUser } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const user = await Request.fetch(config.url);
      setUser(user);
      setLoading(false);
    } catch (error) {
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    setEventsListeners();
  }, []);

  if (loading) return <LoadingScreen text={"0%"} />;
  if (!user || !user.id) return <Login />;

  return (
    <div className="app-container">
      <Navbar />

      {renderPage(page)}
      {renderPopup(popup)}
      {message && <p className="screen-message">{message}</p>}
      {progress.error && <CustomMessage text={progress.error} name="progress-error" />}
      {progress.loading && <LoadingScreen text={"0%"} />}
    </div>
  );
}

function renderPage(page) {
  switch (page) {
    case "admin":
      return <Admin />;
    case "information":
      return <Information />;
    case "createClient":
      return <CreateClient />;
    case "products":
      return <Products />;
    default:
      return <NewInvoice />;
  }
}
function renderPopup(popup) {
  switch (popup) {
    case "createProductForm":
      return <CreateProductForm />;
    case "addEmployeeForm":
      return <AddEmployeeForm />;
    case "invoicePreview":
      return <InvoicePreview />;
    default:
      return "";
  }
}

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
