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

  const items = ["CHI", "ETRA", "IEEE:TVCG", "IEEE:PACIFICVIS", "IEEE:EUROVIS"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.2em",
        margin: "1em 0",
      }}
    >
      {items.map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            name={item}
            checked={selectedItems.includes(item)}
            onChange={handleChange}
          />
          {item + " (10)"}
        </label>
      ))}
    </div>
  );
};

export default CheckBox;
