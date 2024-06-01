import React, { useContext } from "react";
import { AppContext } from "../../store/app-state";
import { getConfig } from "../../../config/config";
import "./create-client.css";

export default (props) => {
  const config = getConfig("createClient");
  const { Request, updateProgress, showMessage } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {};
    try {
      const fromEvent = e.target;
      updateProgress({ loading: true });
      for (let key of form.keys()) data[key] = form.get(key);
      const client = await Request.send(data, config.url);
      updateProgress({ loading: false, error: "" });
      showMessage("A new client has been added successfully");
      fromEvent.reset();
    } catch (error) {
      console.log(error);
      updateProgress({ loading: false, error: error.message });
    }
  };

  return (
    <main className="create-client container no-focus" tabIndex="0">
      <h1 className="container-heading no-focus" tabIndex="0">
        Create new client
      </h1>
      <form
        onSubmit={handleSubmit}
        className="create-client form no-focus"
        title="Create client form"
        tabIndex="0">
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
        <label for="vat-number" className="form field">
          VAT-Number
          <input
            type="text"
            name="vatNumber"
            minlength="9"
            id="vat-number"
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

        <label for="about" className="form field">
          About
          <textarea
            name="about"
            placeholder="Write something about the client"
            id="about"
            className="no-focus"
            title="About client"></textarea>
        </label>

        <button type="submit" className="form no-focus">
          Add
        </button>
      </form>
    </main>
  );
};
