import React, { useContext } from "react";
import { AppContext } from "../store/app-state";
import { getConfig } from "../../config/config";

export default (props) => {
  const config = getConfig("createProduct");
  const { Request, updateProgress, setPopup } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {};
    try {
      updateProgress({ loading: true });
      for (let key of form.keys()) data[key] = form.get(key);
      const product = await Request.send(data, config.url);
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
          title="Create new product form"
          tabIndex="0">
          <h1 className="form heading no-focus" tabIndex="0">
            Create Product
          </h1>

          <img
            onClick={() => setPopup("")}
            src="/image/x-icon.svg"
            alt="Close create product form button"
            className="form x-icon no-focus"
            tabIndex="0"
          />

          <label for="number" className="form field">
            Number
            <input
              type="text"
              name="number"
              minlength="5"
              id="number"
              className="form input no-focus"
              required
            />
          </label>

          <label for="name" className="form field">
            Name
            <input type="text" name="name" minlength="2" id="name" className="form input no-focus" required />
          </label>

          <label for="type" className="form field">
            Type
            <input type="text" name="type" minlength="2" id="type" className="form input no-focus" required />
          </label>

          <label for="amount" className="form field">
            Amount
            <div className="form input radios">
              <input
                type="number"
                name="amount"
                defaultValue="1"
                id="amount"
                className="form input  no-focus"
                required
              />
              <label for="kg" className="">
                KG <input type="radio" id="kg" name="unit" value="kg" checked />
              </label>
              <label for="pcs" className="">
                PCS <input type="radio" id="pcs" name="unit" value="pcs" />
              </label>
            </div>
          </label>
          <label for="cost-price" className="form field">
            Cost Price
            <input
              type="number"
              name="costPrice"
              defaultValue="1"
              id="cost-price"
              className="form input no-focus"
              required
            />
          </label>
          <label for="wholesale-price" className="form field">
            Wholesale Price
            <input
              type="number"
              name="wholesalePrice"
              defaultValue="1"
              id="wholesale-price"
              className="form input no-focus"
              required
            />
          </label>
          <label for="retail-price" className="form field">
            Retail Price
            <input
              type="number"
              name="retailPrice"
              defaultValue="1"
              id="retail-price"
              className="form input no-focus"
              required
            />
          </label>
          <label for="in-stock" className="form field">
            In Stock
            <input
              type="number"
              name="inStock"
              id="in-stock"
              defaultValue="0"
              className="form input no-focus"
              required
            />
          </label>
          <label for="description" className="form field">
            About
            <textarea
              name="description"
              placeholder="Add some description for the product"
              id="description"
              className="no-focus"
              title="Product description"></textarea>
          </label>

          <button type="submit" className="form no-focus">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
