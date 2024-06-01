import React, { useContext } from "react";
import { AppContext } from "../store/app-state";

export default (props) => {
  const { updateProgress } = useContext(AppContext);
  const close = () => updateProgress({ error: "" });
  let text = props.text;
  if (/error/gim.test(props.name)) {
    text = /\([!]+\)/i.test(text) ? text : "Something wrong happened, sorry for inconvenience(!)";
  }

  return (
    <p className={(props.name || "") + " wrapper no-focus"} title="Error message" tabIndex="0">
      {text}

      <img
        src="/image/x-icon.svg"
        alt="Close error message button"
        className={(props.name || "") + " x-icon no-focus"}
        onClick={props.listener || close}
        tabIndex="0"
      />
    </p>
  );
};
