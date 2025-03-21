import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const token = "9e7c6174-f7ce-418c-97aa-20975a22cf58";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          statusesRes,
          prioritiesRes,
          departmentsRes,
          employeesRes,
          tasksRes,
        ] = await Promise.all([
          axios.get("https://momentum.redberryinternship.ge/api/statuses", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("https://momentum.redberryinternship.ge/api/priorities", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("https://momentum.redberryinternship.ge/api/departments", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("https://momentum.redberryinternship.ge/api/employees", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("https://momentum.redberryinternship.ge/api/tasks", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setStatuses(statusesRes.data);
        setPriorities(prioritiesRes.data);
        setDepartments(departmentsRes.data);
        setEmployees(employeesRes.data);
        setTasks(tasksRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [employees]);

  return (
    <DataContext.Provider
      value={{ statuses, priorities, departments, employees, tasks, token }}
    >
      {children}
    </DataContext.Provider>
  );
};
