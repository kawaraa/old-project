import React, { useContext, useEffect, useState } from "react";
import { getConfig } from "../../../../config/config";
import { AppContext } from "../../../store/app-state";
import Employee from "./employee";

export default (props) => {
  const config = getConfig("employees");
  const { Request, setPopup } = useContext(AppContext);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const removeEmployee = (id) => {
    setEmployees(employees.filter((item) => item.id !== id));
  };

  const getEmployees = async (searchText = "all") => {
    try {
      setLoading(true);
      const employees = await Request.fetch(config.url + searchText);
      setEmployees(employees);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChange = ({ target }) => getEmployees(target.value);

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <article className="admin item no-focus">
      <input
        onChange={handleChange}
        type="text"
        name="searchText"
        placeholder="Search for employees by Name, Postcode, Street, Phone or Email"
        title="Search for employees"
        className="search-input no-focus"
      />
      <ul className={"item-list no-focus " + (loading ? "fadeout" : "")}>
        {!employees[0] ? (
          <li className="no-item no-focus">No employees found</li>
        ) : (
          employees.map((item) => <Employee {...item} remove={removeEmployee} />)
        )}
      </ul>

      <button onClick={() => setPopup("addEmployeeForm")} type="button" className="add-button no-focus">
        +
      </button>
    </article>
  );
};
