import { useState } from "react";
import "./TaskTracker.scss";

function MultiSelect({ label, options, isOpen, toggleOpen }) {
  const toggleSelection = (value) => {};

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
              <label key={option}>
                <input
                  type="checkbox"
                  onChange={() => toggleSelection(option)}
                />
                <span>{option}</span>
              </label>
            ))}
            </div>
            <button onClick={toggleOpen }>არჩევა</button>
          </div>
        )}
      </div>
    </div>
  );
}

function TaskTracker() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  return (
    <div className="TaskTracker">
      <h1>დავალებების გვერდი</h1>
      <div className="filters">
        <MultiSelect
          label="დეპარტამენტი"
          options={["მარკეტინგის დეპარტამენტი", "დიზაინის დეპარტამენტი", "ლოჯისტიკის დეპარტამენტი", "IT დეპარტამენტი"]}
          isOpen={openDropdown === 0}
          toggleOpen={() => toggleDropdown(0)}
        />
        <MultiSelect
          label="პრიორიტეტი"
          options={["დაბალი", "საშუალო", "მაღალი"]}
          isOpen={openDropdown === 1}
          toggleOpen={() => toggleDropdown(1)}
        />
        <MultiSelect
          label="თანამშრომელი"
          options={["ელია ბაგრატიონი", "გიორგი კეკელიძე", "მარიამ მაჭავარიანი", "ნიკა მაღლაკელიძე"]}
          isOpen={openDropdown === 2}
          toggleOpen={() => toggleDropdown(2)}
        />
      </div>
    </div>
  );
}

export default TaskTracker;
