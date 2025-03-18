import { useState, useContext } from "react";
import Header from "../header/Header";
import { DataContext } from "../Database-files/DataBase";
import RenderTask from "../Tasks/Tasks.jsx";
import "./TaskTracker.scss";
import MultiSelect from "../cards/MultiSelect.jsx";

function TaskTracker() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { priorities, departments, employees } = useContext(DataContext);
  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  return (
    <>
      <div className="TaskTracker">
        <Header />
        <h1>დავალებების გვერდი</h1>
        <div className="filters">
          <MultiSelect
            label="დეპარტამენტი"
            options={departments}
            isOpen={openDropdown === 0}
            toggleOpen={() => toggleDropdown(0)}
          />
          <MultiSelect
            label="პრიორიტეტი"
            options={priorities}
            isOpen={openDropdown === 1}
            toggleOpen={() => toggleDropdown(1)}
          />
          <MultiSelect
            label="თანამშრომელი"
            options={employees}
            isOpen={openDropdown === 2}
            toggleOpen={() => toggleDropdown(2)}
            key={employees.length}  
          />
        </div>
      </div>
      <div>
        <RenderTask />
      </div>
    </>
  );
}

export default TaskTracker;
