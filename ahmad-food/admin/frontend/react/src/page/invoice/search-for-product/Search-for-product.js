import React, { useContext, useState } from "react";
import { getConfig } from "../../../../config/config";
import { AppContext } from "../../../store/app-state";
import FoundProduct from "./found-product";
import "./search-for-product.css";

export default ({ selectProduct }) => {
  const config = getConfig("products");
  const { Request, setPopup } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [foundProducts, setFoundProducts] = useState([]);

  const btn = (
    <strong onClick={() => setPopup("createProductForm")} className="here-btn no-focus">
      Here
    </strong>
  );

  const getProducts = async ({ target }) => {
    try {
      setLoading(true);
      const products = await Request.fetch(config.url + `?searchText=${target.value}&sortBy=mostSold`);
      setFoundProducts(products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSelect = (product) => {
    const copyProducts = [...foundProducts];
    const index = copyProducts.findIndex((p) => p.number === product.number);
    copyProducts[index].inStock -= product.boxSize * product.box;
    setFoundProducts(copyProducts);
    selectProduct(product);
  };

  return (
    <div className="search-for-product wrapper">
      <input
        onChange={getProducts}
        type="text"
        name="searchText"
        placeholder="Search for products by Number, Name, Type, Amount, Unit, Price, In Stock or Description"
        title="Search for product"
        className="search-input no-focus"
      />
      <ul className={"item-list product " + (loading ? "fadeout" : "")}>
        {!foundProducts[0] ? (
          <li className="product no-item no-focus">No product found, you can also create one {btn}</li>
        ) : (
          foundProducts.map((item) => <FoundProduct product={item} selectProduct={handleSelect} />)
        )}
      </ul>
    </div>
  );
};
