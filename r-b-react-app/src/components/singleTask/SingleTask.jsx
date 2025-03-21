import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../Database-files/DataBase";
import axios from "axios";
import "./SingleTask.scss";
import Header from "../header/Header";
const SingleTask = () => {
  const { id } = useParams();
  const { token } = useContext(DataContext);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `https://momentum.redberryinternship.ge/api/tasks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTask();
  }, [id, token]);

  if (!task) {
    return <div> </div>;
  }

  const getPriorityColor = (priorityId) => {
    switch (priorityId) {
      case 1:
        return "#08A508";
      case 2:
        return "#FFBE0B";
      case 3:
        return "#FA4D4D";
    }
  };

  const departmentNames = (departmentID) => {
    switch (departmentID) {
      case 1:
        return "ადმინისტრაცია";
      case 2:
        return "ად. რესურსები";
      case 3:
        return "ფინანსები";
      case 4:
        return "მარკეტინგი";
      case 5:
        return "ლოჯისტიკა";
      case 6:
        return "ტექნოლოგია";
      case 7:
        return "მედია";
    }
  };
  const departmentColors = (departmentName) => {
    switch (departmentName) {
      case "ადმინისტრაციის დეპარტამენტი":
        return "#FF66A8";
      case "ადამიანური რესურსების დეპარტამენტი":
        return "#FFD86D ";
      case "ფინანსების დეპარტამენტი":
        return "#FD9A6A";
      case "გაყიდვები და მარკეტინგის დეპარტამენტი":
        return "#89B6FF";
      case "ლოჯოსტიკის დეპარტამენტი":
        return "#FD9A6A";
      case "ტექნოლოგიების დეპარტამენტი":
        return "#FF66A8";
      case "მედიის დეპარტამენტი":
        return "#89B6FF";
    }
  };
  return (
    <>
      <Header />
      <div className="single-task">
        <div className="single-task-left">
          <div className="priority-department">
            <div
              className="priority"
              style={{
                borderColor: getPriorityColor(task.priority.id),
                borderWidth: "1px",
                borderStyle: "solid",
                color: getPriorityColor(task.priority.id),
              }}
            >
              <img src={task.priority.icon} alt="" />
              <p>{task.priority.name}</p>
            </div>
            <div
              className="department"
              style={{ backgroundColor: departmentColors(task.department.name) }}
            >
              {departmentNames(task.department.id)}
            </div>
          </div>
          <h3>{task.name}</h3>
          <p id="description">{task.description}</p>

          <h4>დავალების დეტალები</h4>
          <div className="task-details">
            <div className="details-left">
              <p>
                <img src="/assets/images/pie-chart.svg" alt="" />
                <span>სტატუსი</span>
              </p>
              <p>
                <img src="/assets/images/user.svg" alt="" />
                <span>თანამშრომელი</span>
              </p>
              <p>
                <img src="/assets/images/calendar.svg" alt="" />
                <span>დავალების ვადა</span>
              </p>
            </div>
            <div className="details-right">
              <div>
                <div>mzad testirebistvis</div>
              </div>

              <div id="employee">
                <img src={task.employee.avatar} alt="" />
                <div>
                  <p>{task.employee.department.name}</p>
                  <h5>
                    {task.employee.name} {task.employee.surname}
                  </h5>
                </div>
              </div>

              <div>
                <div id="date">{task.due_date.slice(0, 10)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="single-task-right"></div>
      </div>
    </>
  );
};

export default SingleTask;
