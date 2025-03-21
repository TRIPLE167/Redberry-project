import "./header.scss";
import { useNavigate } from "react-router-dom";
import AddEmployee from "../addEmployee/AddEmployee";
import { useState } from "react";
function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      <button onClick={() => navigate("/")}>
        <img src="/Redberry-project/assets/images/logo.png" alt="Logo" />
      </button>
      <div className="buttons">
        <button className="addEmployee" onClick={() => setIsOpen(true)}>
          თანამშრომლის შექმნა
        </button>
        <button id="new_task" onClick={() => navigate("/new-task")}>
          <i className="material-icons">add</i>შექმენი ახალი დავალება
        </button>
      </div>
      <AddEmployee isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  );
}
export default Header;
