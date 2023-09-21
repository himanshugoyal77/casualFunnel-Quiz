import React from "react";

const Indicators = ({ color, text }) => {
  return (
    <div className="flex gap-2">
      <div className={"border-2 p-1 w-8 " + `${color}`}></div>
      <p>{text}</p>
    </div>
  );
};

export default Indicators;
