import React, { useContext } from "react";
import { AppContext } from "../../store/app-state";
import CustomMessage from "../../layout/custom-message";
import { getConfig } from "../../../config/config";
import "./login.css";

export default (props) => {
  const { Request, progress, updateProgress, setUser, error, setError } = useContext(AppContext);
  const config = getConfig("login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateProgress({ loading: true });
      const data = { username: e.target.username.value, psw: e.target.psw.value };
      const user = await Request.send(data, config.url, config.method);
      setUser(user);
      updateProgress({ loading: false, error: "" });
    } catch (error) {
      setUser(null);
      updateProgress({ loading: false, error: error.message });
    }
  };

  return (
    <div className="login outer-container">
      {progress.error && <CustomMessage text={progress.error} name="progress-error" />}
      <form onSubmit={handleSubmit} className="login form no-focus" title="Login form" tabIndex="0">
        <h1 className="login heading no-focus" tabIndex="0">
          Administration Login
        </h1>
        <input
          type="text"
          name="username"
          minlength="5"
          placeholder="Enter Username"
          className="login-input no-focus"
          required
        />
        <input
          type="password"
          name="psw"
          minlength="8"
          placeholder="Enter Password"
          autoComplete="on"
          className="login-input no-focus"
          required
        />
        <button type="submit" className="login submit no-focus">
          Login
        </button>
      </form>
    </div>
  );
};
