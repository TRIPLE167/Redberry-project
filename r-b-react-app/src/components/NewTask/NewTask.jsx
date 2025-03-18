import React, { useState, useContext, useEffect } from "react";
import Header from "../header/Header";
import { DataContext } from "../Database-files/DataBase";
import CustomDropdown from "../cards/CustomDropdown";
import "./NewTask.scss";

function NewTask() {
  const { statuses, priorities, departments, employees } =
    useContext(DataContext);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState(null);
  const [status, setStatus] = useState(null);
  const [department, setDepartment] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [titleValidation, setTitleValidation] = useState("#6c757d");
  const [desValidation, setDesValidation] = useState("#6c757d");

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
    if (department === null) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [department]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Task Title:", taskTitle);
    console.log("Task Description:", taskDescription);
    console.log("Selected Date:", selectedDate);
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
            />

            <label>
              <p>დედლაინი</p>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </label>

            <button type="submit" id="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default NewTask;
