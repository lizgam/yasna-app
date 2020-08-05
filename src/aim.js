import React from "react";

const Aims = (props) => {
  const items = props.aimList;
  console.log(">>items", props);

  return (
    <div className="aimList">
      <ul className="aim">
        {items.map((item) => (
          <li key={item.key}>{item.aim}</li>
        ))}
      </ul>
    </div>
  );
};

export default Aims;
