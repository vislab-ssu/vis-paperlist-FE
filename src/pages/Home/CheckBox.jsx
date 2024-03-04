import React, { useState } from "react";

const CheckBox = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    if (checked && !selectedItems.includes(name)) {
      setSelectedItems([...selectedItems, name]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== name));
    }
  };

  const items = ["CHI", "ETRA", "IEEE:TVCG", "IEEE:VIS", "PACIFIC VIS"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "3em",
        margin: "2em 0",
      }}
    >
      {items.map((item) => (
        <label
          key={item}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <input
            type="checkbox"
            name={item}
            checked={selectedItems.includes(item)}
            onChange={handleChange}
            style={{ width: "1.2em", height: "1.2em", marginRight: "1em" }}
          />
          {item}
        </label>
      ))}
    </div>
  );
};

export default CheckBox;
