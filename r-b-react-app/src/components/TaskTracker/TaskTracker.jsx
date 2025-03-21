import { useState, useEffect, useContext } from "react";
import Header from "../header/Header";
import { DataContext } from "../Database-files/DataBase";
import RenderTask from "../Tasks/Tasks.jsx";
import "./TaskTracker.scss";
import MultiSelect from "../cards/MultiSelect.jsx";

function TaskTracker() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { priorities, departments, employees } = useContext(DataContext);

  const [selectedDepartments, setSelectedDepartments] = useState(
    JSON.parse(localStorage.getItem("selectedDepartments")) || []
  );
  const [selectedPriorities, setSelectedPriorities] = useState(
    JSON.parse(localStorage.getItem("selectedPriorities")) || []
  );
  const [selectedEmployees, setSelectedEmployees] = useState(
    JSON.parse(localStorage.getItem("selectedEmployees")) || []
  );

  useEffect(() => {
    localStorage.setItem(
      "selectedDepartments",
      JSON.stringify(selectedDepartments)
    );
    localStorage.setItem(
      "selectedPriorities",
      JSON.stringify(selectedPriorities)
    );
    localStorage.setItem(
      "selectedEmployees",
      JSON.stringify(selectedEmployees)
    );
  }, [selectedDepartments, selectedPriorities, selectedEmployees]);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const removeSelection = (type, id) => {
    if (type === "department") {
      setSelectedDepartments(
        selectedDepartments.filter((deptId) => deptId !== id)
      );
    } else if (type === "priority") {
      setSelectedPriorities(
        selectedPriorities.filter((priorityId) => priorityId !== id)
      );
    } else if (type === "employee") {
      setSelectedEmployees(
        selectedEmployees.filter((employeeId) => employeeId !== id)
      );
    } else if (type === "clear") {
      setSelectedDepartments([]);
      setSelectedPriorities([]);
      setSelectedEmployees([]);
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
            selectedValues={selectedDepartments}
            setSelectedValues={setSelectedDepartments}
          />
          <MultiSelect
            label="პრიორიტეტი"
            options={priorities}
            isOpen={openDropdown === 1}
            toggleOpen={() => toggleDropdown(1)}
            selectedValues={selectedPriorities}
            setSelectedValues={setSelectedPriorities}
          />
          <MultiSelect
            label="თანამშრომელი"
            options={employees}
            isOpen={openDropdown === 2}
            toggleOpen={() => toggleDropdown(2)}
            selectedValues={selectedEmployees}
            setSelectedValues={setSelectedEmployees}
            key={employees.length}
          />
        </div>
        <div className="selected-filters">
          {selectedDepartments.map((id) => (
            <button key={id} onClick={() => removeSelection("department", id)}>
              {departments.find((dept) => dept.id === id)?.name}
              <img src="/Redberry-project/assets/images/x.svg" alt="" />
            </button>
          ))}
          {selectedPriorities.map((id) => (
            <button key={id} onClick={() => removeSelection("priority", id)}>
              {priorities.find((priority) => priority.id === id)?.name}
              <img src="/Redberry-project/assets/images/x.svg" alt="" />
            </button>
          ))}
          {selectedEmployees.map((id) => (
            <button key={id} onClick={() => removeSelection("employee", id)}>
              {employees.find((employee) => employee.id === id)?.name}{" "}
              {employees.find((employee) => employee.id === id)?.surname}
              <img src="/Redberry-project/assets/images/x.svg" alt="" />
            </button>
          ))}
          {(selectedDepartments.length > 0 ||
            selectedPriorities.length > 0 ||
            selectedEmployees.length > 0) && (
            <button id="clear" onClick={() => removeSelection("clear")}>
              გასუფთავება
            </button>
          )}
        </div>
      </div>
      <div>
        <RenderTask
          selectedDepartments={selectedDepartments}
          selectedPriorities={selectedPriorities}
          selectedEmployees={selectedEmployees}
        />
      </div>
    </>
  );
}

export default TaskTracker;
