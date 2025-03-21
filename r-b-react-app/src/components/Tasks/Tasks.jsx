import "./tasks.scss";
import { useContext } from "react";
import { DataContext } from "../Database-files/DataBase";
import { useNavigate } from "react-router-dom";
function RenderTask({
  selectedDepartments,
  selectedPriorities,
  selectedEmployees,
}) {
  const { tasks, statuses } = useContext(DataContext);
  const navigate = useNavigate();
  const getStatusColor = (statusId) => {
    switch (statusId) {
      case 1:
        return "#f7bc30";
      case 2:
        return "#FB5607";
      case 3:
        return "#FF006E";
      case 4:
        return "#3A86FF";
    }
  };

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

  const filteredTasks = tasks.filter((task) => {
    const departmentMatch =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(task.department.id);
    const priorityMatch =
      selectedPriorities.length === 0 ||
      selectedPriorities.includes(task.priority.id);
    const employeeMatch =
      selectedEmployees.length === 0 ||
      selectedEmployees.includes(task.employee.id);

    return departmentMatch && priorityMatch && employeeMatch;
  });

  return (
    <div className="container">
      {statuses.map((status) => (
        <div className="tasks-column" key={status.id}>
          <div
            className="progress"
            style={{ backgroundColor: getStatusColor(status.id) }}
          >
            {status.name}
          </div>
          {filteredTasks
            .filter((task) => task.status.id === status.id)
            .map((task) => (
              <div
                className="task"
                key={task.id}
                onClick={() => navigate(`/task/${task.id}`)}
                style={{
                  borderColor: getStatusColor(status.id),
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <div className="task-top">
                  <div>
                    <div
                      className="task-priority"
                      style={{
                        borderColor: getPriorityColor(task.priority.id),
                        borderWidth: "1px",
                        borderStyle: "solid",
                        color: getPriorityColor(task.priority.id),
                      }}
                    >
                      <img src={task.priority.icon} alt="priority icon" />
                      <span>{task.priority.name}</span>
                    </div>
                    <div
                      className="task-profession"
                      style={{ backgroundColor: getStatusColor(status.id) }}
                    >
                      {departmentNames(task.department.id)}
                    </div>
                  </div>
                  <p>{task.due_date.slice(0, 10)}</p>
                </div>
                <div className="task-middle">
                  <h6>{task.name}</h6>
                  <p>{task.description}</p>
                </div>
                <div className="task-bottom">
                  <img src={task.employee.avatar} />
                  <div>
                    <img src="/assets/images/comments.svg" alt="comments" />
                    <span>8</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default RenderTask;
