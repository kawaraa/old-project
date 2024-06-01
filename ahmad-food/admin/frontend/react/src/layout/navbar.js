import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../store/app-state";
import "./navbar.css";

export default (props) => {
  const isMobile = window.innerWidth <= 800;
  const css = "navbar-menu item hover no-focus ";
  const { user, page, setPage, setPopup } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      const showHideMenu = ({ target }) => !/navbar menu-icon/.test(target.className) && setShowMenu(false);
      window.addEventListener("click", showHideMenu);
      return () => window.removeEventListener("click", showHideMenu);
    }
  }, []);

  return (
    <div className="navbar-outer-container">
      <nav className="navbar container no-focus" tabIndex="0">
        <a href="/api/log-me-out" className="navbar logout hover no-focus">
          Logout
        </a>
        {isMobile && (
          <button
            onClick={() => setShowMenu(!showMenu)}
            type="button"
            className="navbar menu-icon hover no-focus">
            Icon
          </button>
        )}
        {showMenu && (
          <ul className="navbar menu no-focus" title="Navigation bar menu" tabIndex="0">
            {user.type === "admin" && (
              <li
                className={css + (page === "admin" ? "active" : "")}
                onClick={() => setPage("admin")}
                tabIndex="0">
                Admin
              </li>
            )}
            <li
              className={css + (page === "information" ? "active" : "")}
              onClick={() => setPage("information")}
              tabIndex="0">
              Information
            </li>
            <li
              className={css + (page === "createClient" ? "active" : "")}
              onClick={() => setPage("createClient")}
              tabIndex="0">
              Create Client
            </li>
            <li
              className={css + (page === "products" ? "active" : "")}
              onClick={() => setPage("products")}
              tabIndex="0">
              Product
            </li>
            <li
              className={css + (page === "newInvoice" ? "active" : "")}
              onClick={() => setPage("newInvoice")}
              tabIndex="0">
              New Invoice
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};
