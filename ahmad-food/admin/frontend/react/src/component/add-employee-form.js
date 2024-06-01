import React, { useContext } from "react";
import { AppContext } from "../store/app-state";
import { getConfig } from "../../config/config";

export default (props) => {
  const config = getConfig("adEmployee");
  const { Request, updateProgress, setPopup } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {};
    try {
      updateProgress({ loading: true });
      for (let key of form.keys()) data[key] = form.get(key);
      const employees = await Request.send(data, config.url);
      updateProgress({ loading: false, error: "" });
      setPopup("");
    } catch (error) {
      updateProgress({ loading: false, error: error.message });
    }
  };

  return (
    <div className="popup-container">
      <div className="popup inner">
        <form
          onSubmit={handleSubmit}
          className="popup form no-focus"
          title="Add new employee form"
          tabIndex="0">
          <h1 className="form heading no-focus" tabIndex="0">
            Add new employee
          </h1>

          <img
            onClick={() => setPopup("")}
            src="/image/x-icon.svg"
            alt="Close add employee form button"
            className="form x-icon no-focus"
            tabIndex="0"
          />

          <label for="username" className="form field">
            Username
            <input
              type="text"
              name="username"
              minlength="5"
              id="username"
              className="form input no-focus"
              required
            />
          </label>
          <label for="psw" className="form field">
            Password
            <input
              type="password"
              name="psw"
              minlength="8"
              id="psw"
              className="form input no-focus"
              required
            />
          </label>
          <label for="confirm-psw" className="form field">
            Confirm Password
            <input
              type="password"
              name="confirmPsw"
              minlength="8"
              id="confirm-psw"
              className="form input no-focus"
              required
            />
          </label>
          <label for="first-name" className="form field">
            First Name
            <input
              type="text"
              name="firstName"
              minlength="1"
              id="first-name"
              className="form input no-focus"
              required
            />
          </label>
          <label for="last-name" className="form field">
            Last Name
            <input
              type="text"
              name="lastName"
              minlength="3"
              id="last-name"
              className="form input no-focus"
              required
            />
          </label>

          <div className="form field">
            Gender
            <div className="form input radios">
              <label for="male">
                Male <input type="radio" id="male" name="gender" value="male" checked />
              </label>
              <label for="female">
                Female <input type="radio" id="female" name="gender" value="female" />
              </label>
            </div>
          </div>

          <label for="city" className="form field">
            City
            <input type="text" name="city" minlength="3" id="city" className="form input no-focus" required />
          </label>
          <label for="postcode" className="form field">
            Postcode
            <input
              type="text"
              name="postcode"
              minlength="6"
              id="postcode"
              className="form input no-focus"
              required
            />
          </label>
          <label for="street" className="form field">
            Street
            <input
              type="text"
              name="street"
              minlength="5"
              id="street"
              className="form input no-focus"
              required
            />
          </label>
          <label for="phone-number" className="form field">
            Phone Number
            <input
              type="text"
              name="phoneNumber"
              minlength="9"
              id="phone-number"
              className="form input no-focus"
              required
            />
          </label>
          <label for="email" className="form field">
            Email
            <input
              type="email"
              name="email"
              minlength="9"
              id="email"
              className="form input no-focus"
              required
            />
          </label>

          <label for="about" className="form field">
            About
            <textarea
              name="about"
              placeholder="Write something about the employee"
              id="about"
              className="no-focus"
              title="About employee"></textarea>
          </label>

          <button type="submit" className="form no-focus">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
