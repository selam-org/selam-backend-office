import React from "react";
import "./Page.css";

const Page = ({ title, children }) => {
  return (
    <div className="page">
      <h2 className="title"> {title} </h2>
      {children}
    </div>
  );
};

export default Page;
