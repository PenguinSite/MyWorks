import React from "react";
import "./Select.css";

const Select = ({ field, ...props }) => {
  return (
    <div className="Select">
      <label htmlFor="htmlFor">{props.label}</label>
      <select {...props} {...field}>
        {props.children}
      </select>
    </div>
  );
};

export default Select;
