import React from "react";

const FormLabel = ({ label, isRequired }) => {
  return (
    <div>
      <span className="app-text">{label}</span>{" "}
      {isRequired && <span style={{ color: "red" }}>*</span>}
    </div>
  );
};

export default FormLabel;
