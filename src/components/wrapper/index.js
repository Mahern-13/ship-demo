import React from "react";

import "./style.scss";

const divStyle = {
  padding: "5px",
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "row"
};

const wrapper = ({ styling, assignClass, onClick, children }) => (
  <div
    className={assignClass ? "wrapper " + `${assignClass}` : "wrapper"}
    onClick={onClick ? onClick : () => {}}
    style={{
      ...divStyle,
      ...styling
    }}
  >
    {children}
  </div>
);

export default wrapper;
