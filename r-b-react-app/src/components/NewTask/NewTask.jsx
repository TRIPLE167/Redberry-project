import React, { useState, useContext, useEffect } from "react";
import Header from "../header/Header";
import { DataContext } from "../Database-files/DataBase";
import CustomDropdown from "../cards/CustomDropdown";
import AddEmployee from "../addEmployee/AddEmployee";
import "./NewTask.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewTask() {
  const { statuses, priorities, departments, employees, token } =
    useContext(DataContext);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState(1);
  const [department, setDepartment] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [titleValidation, setTitleValidation] = useState("#6c757d");
  const [desValidation, setDesValidation] = useState("#6c757d");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  
  const validateForm = () => {
    let isValid = true;

    if (taskTitle.length < 2 || taskTitle.length > 255) {
      setTitleValidation("red");
      isValid = false;
    } else {
      setTitleValidation("green");
    }

    if (taskDescription.length < 2 || taskDescription.length > 255) {
      setDesValidation("red");
      isValid = false;
    } else {
      setDesValidation("green");
    }
    if (!priority || !status || !department || !employee || !selectedDate) {
      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    console.log("Selected Date:", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (department === null) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [department]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Task Title:", taskTitle);
    console.log("Task Description:", taskDescription);
    console.log("Priority:", priority);
    console.log("Status:", status);
    console.log("Department:", department);
    console.log("Employee:", employee);
    console.log("Selected Date:", selectedDate);

    navigate("/");

    const formData = new FormData();
    formData.append("name", taskTitle);
    formData.append("description", taskDescription);
    formData.append("due_date", selectedDate);
    formData.append("status_id", status);
    formData.append("employee_id", employee);
    formData.append("priority_id", priority);
    formData.append("department_id", department);

    try {
      await axios.post(
        "https://momentum.redberryinternship.ge/api/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      setTaskTitle("");
      setTaskDescription("");
      setPriority(null);
      setStatus(null);
      setDepartment(null);
      setEmployee(null);
      DefaultDate();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };
  const DefaultDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const tomorrow = today.toISOString().split("T")[0];
    setSelectedDate(tomorrow);
  };

  useEffect(() => {
    if (!selectedDate) {
      DefaultDate();
    }
  }, []);

  return (
    <>
      <Header />
      <h1> შექმენი ახალი დავალება</h1>
      <form onSubmit={handleSubmit}>
        <div className="create-task">
          <div className="create-task-left">
            <label>
              <h6>სათაური</h6>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => {
                  setTaskTitle(e.target.value);
                  validateForm();
                }}
              />
              <p style={{ color: titleValidation }}> მინიმუმ 2 სიმბოლო</p>
              <p style={{ color: titleValidation }}>მაქსიმუმ 255 სიმბოლო</p>
            </label>

            <label id="description">
              <h6>აღწერა</h6>
              <textarea
                value={taskDescription}
                onChange={(e) => {
                  setTaskDescription(e.target.value);
                  validateForm();
                }}
              />
              <p style={{ color: desValidation }}>მინიმუმ 2 სიმბოლო</p>
              <p style={{ color: desValidation }}>მაქსიმუმ 255 სიმბოლო</p>
            </label>

            <div>
              <CustomDropdown
                label="პრიორიტეტი"
                options={priorities}
                selectedValue={priority}
                onSelect={setPriority}
                width={"259px"}
              />

              <div>
                <CustomDropdown
                  label={"სტატუსი"}
                  options={statuses}
                  selectedValue={status}
                  onSelect={setStatus}
                  width={"259px"}
                />
              </div>
            </div>
          </div>
          <div className="create-task-right">
            <CustomDropdown
              label="დეპარტამენტი"
              options={departments}
              selectedValue={department}
              onSelect={setDepartment}
              width={"550px"}
            />
            <CustomDropdown
              label="პასუხისმგებელი თანამშრომელი"
              options={employees}
              selectedValue={employee}
              onSelect={setEmployee}
              width={"550px"}
              disabled={disabled}
              departmentValue={department}
              setVisible={setVisible}
            />

            <label>
              <p>დედლაინი</p>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </label>

            <button type="submit" id="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      <AddEmployee visible={visible} setVisible={setVisible} />
    </>
  );
}

export default NewTask;
