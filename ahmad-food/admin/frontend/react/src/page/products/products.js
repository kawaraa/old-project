import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../store/app-state";
import { getConfig } from "../../../config/config";
import Product from "./product";
import "./products.css";

export default (props) => {
  const config = getConfig("products");
  const { Request, setPopup } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({ searchText: "", sortBy: "quantityLeft" });

  const updateQuantity = (number, quantity) => {
    console.log(number, quantity);
    const copyProducts = [...products];
    const index = copyProducts.findIndex((item) => item.number === number);
    copyProducts[index].inStock = copyProducts[index].inStock + quantity;
    setProducts(copyProducts);
  };
  const removeProduct = (number) => {
    setProducts(products.filter((item) => item.number !== number));
  };

  const handleChange = ({ target: { name, value } }) => {
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  useEffect(() => {
    (async ({ searchText, sortBy }) => {
      try {
        setLoading(true);
        const products = await Request.fetch(config.url + `?searchText=${searchText}&sortBy=${sortBy}`);
        setProducts(products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })(searchCriteria);
  }, [searchCriteria]);

  return (
    <main className="container no-focus">
      <h1 className="container-heading">Product List</h1>
      <form className="products search-form" onChange={handleChange}>
        <input
          type="text"
          name="searchText"
          placeholder="Search for product by Number, Name or Type"
          title="Search for client"
          className="products search-input no-focus"
        />
        <label for="sort-by">
          Sort By
          <select name="sortBy" id="sort-by" className="no-focus" title="Sort by" required>
            <option value="quantityLeft" selected>
              Quantity Left
            </option>
            <option value="mostSold">Most Sold</option>
            <option value="costPrice">Cost Price</option>
            <option value="retailPrice">Retail Price</option>
          </select>
        </label>
      </form>
      <ul className={"product list no-focus " + (loading ? "fadeout" : "")} title="Product list" tabIndex="0">
        {!products[0] ? (
          <li className="no-item no-focus">No products found</li>
        ) : (
          products.map((item) => <Product {...item} remove={removeProduct} updateQuantity={updateQuantity} />)
        )}
      </ul>

      <button
        onClick={() => setPopup("createProductForm")}
        type="button"
        className="add-button hover no-focus">
        +
      </button>
    </main>
  );
};
