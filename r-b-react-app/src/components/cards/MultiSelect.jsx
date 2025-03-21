import React, { useState, useEffect } from "react";

function MultiSelect({
  label,
  options,
  isOpen,
  toggleOpen,
  selectedValues,
  setSelectedValues,
}) {
  const [tempSelectedValues, setTempSelectedValues] = useState(selectedValues);

  useEffect(() => {
    setTempSelectedValues(selectedValues);
  }, [selectedValues]);

  const toggleSelection = (option) => {
    if (tempSelectedValues.includes(option.id)) {
      setTempSelectedValues(
        tempSelectedValues.filter((id) => id !== option.id)
      );
    } else {
      setTempSelectedValues([...tempSelectedValues, option.id]);
    }
  };

  const applySelection = () => {
    setSelectedValues(tempSelectedValues);
    toggleOpen();
  };

  return (
    <div className="multi-select">
      <div className="select-box">
        <div id="filter" tabIndex={0} onClick={toggleOpen}>
          <span id="filter-name">{label}</span>
          <i className="material-icons">keyboard_arrow_down</i>
        </div>
        {isOpen && (
          <div className="dropdown">
            <div>
              {options.map((option) => (
                <label key={option.id}>
                  <input
                    type="checkbox"
                    checked={tempSelectedValues.includes(option.id)}
                    onChange={() => toggleSelection(option)}
                  />
                  {label === "თანამშრომელი" && (
                    <img src={option.avatar} alt="avatar" />
                  )}
                  <span>
                    {option.name} {option.surname}
                  </span>
                </label>
              ))}
            </div>
            <button onClick={applySelection}>არჩევა</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MultiSelect;
