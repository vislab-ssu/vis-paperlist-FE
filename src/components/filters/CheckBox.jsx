import React, { useState } from "react";

const CheckBox = ({ selectedItems, setSelectedItems, itemCounts }) => {
  const handleChange = (event) => {
    const { name, checked } = event.target;
    if (checked && !selectedItems.includes(name)) {
      setSelectedItems([...selectedItems, name]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== name));
    }
  };

  const items = [
    "CHI",
    "ETRA",
    "IEEE VIS",
    "IEEE TVCG",
    "IEEE Pacific",
    // "IEEE:EUROVIS",
  ];

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
            style={{ width: "1.2em", height: "1.2em", marginRight: "1em" }}
          />
          {`${item} (${itemCounts[item] || 0})`}
        </label>
      ))}
    </div>
  );
};

export default CheckBox;
