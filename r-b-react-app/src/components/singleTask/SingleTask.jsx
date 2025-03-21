import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../Database-files/DataBase";
import axios from "axios";
import "./SingleTask.scss";

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
    return <div>Loading...</div>;
  }

  return (
    <div className="single-task">
      <h1>{task.name}</h1>
      <p>{task.description}</p>
      <p>
        <strong>Priority:</strong> {task.priority.name}
      </p>
      <p>
        <strong>Status:</strong> {task.status.name}
      </p>
      <p>
        <strong>Due Date:</strong> {task.due_date}
      </p>
      <p>
        <strong>Assigned to:</strong> {task.employee.name}
      </p>
      <p>
        <strong>Department:</strong> {task.department.name}
      </p>
    </div>
  );
};

export default SingleTask;
