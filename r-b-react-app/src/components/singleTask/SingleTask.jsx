import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../Database-files/DataBase";
import axios from "axios";
import "./SingleTask.scss";
import Header from "../header/Header";
import CustomDropdown from "../cards/CustomDropdown";

const SingleTask = () => {
  const { id } = useParams();
  const { token, statuses } = useContext(DataContext);
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState(null);
  const hasMounted = useRef(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const textareaRef = useRef(null);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  const totalComments = comments.reduce(
    (acc, comment) => acc + 1 + (comment.sub_comments?.length || 0),
    0
  );

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
        setStatus(response.data.status.id);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTask();
  }, [id, token]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://momentum.redberryinternship.ge/api/tasks/${task.id}/comments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (task) {
      fetchComments();
    }
  }, [task, id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment !== "") {
      try {
        const response = await axios.post(
          `https://momentum.redberryinternship.ge/api/tasks/${task.id}/comments`,
          {
            text: comment,
            task_id: task.id,
            parent_id: replyToCommentId || null,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Comment submitted successfully:", response.data);

        if (replyToCommentId) {
          setComments((prevComments) =>
            prevComments.map((comment) => {
              if (comment.id === replyToCommentId) {
                return {
                  ...comment,
                  sub_comments: [
                    response.data,
                    ...(comment.sub_comments || []),
                  ],
                };
              }
              return comment;
            })
          );
        } else {
          setComments((prevComments) => [response.data, ...prevComments]);
        }

        setComment("");
        setReplyToCommentId(null);
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyToCommentId(commentId);
    textareaRef.current.focus();
  };

  useEffect(() => {
    if (hasMounted.current && status !== null && task !== null) {
      const updateStatus = async () => {
        try {
          await axios.put(
            `https://momentum.redberryinternship.ge/api/tasks/${task.id}`,
            {
              name: task.name,
              description: task.description,
              status_id: status,
              priority_id: task.priority.id,
              department_id: task.department.id,
              employee_id: task.employee.id,
              due_date: task.due_date,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Status updated successfully!");
        } catch (error) {
          console.error("Error updating task status:", error);
        }
      };

      updateStatus();
    } else {
      hasMounted.current = true;
    }
  }, [status, task, token]);

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
              style={{
                backgroundColor: departmentColors(task.department.name),
              }}
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
                <img
                  src="/Redberry-project/assets/images/pie-chart.svg"
                  alt=""
                />
                <span>სტატუსი</span>
              </p>
              <p>
                <img src="/Redberry-project/assets/images/user.svg" alt="" />
                <span>თანამშრომელი</span>
              </p>
              <p>
                <img
                  src="/Redberry-project/assets/images/calendar.svg"
                  alt=""
                />
                <span>დავალების ვადა</span>
              </p>
            </div>
            <div className="details-right">
              <div>
                <div>
                  <div>
                    <CustomDropdown
                      options={statuses}
                      selectedValue={status}
                      onSelect={setStatus}
                      width={"259px"}
                    />
                  </div>
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
              </div>
              <div>
                <div id="date">{task.due_date.slice(0, 10)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="single-task-right">
          <form onSubmit={handleSubmit}>
            <div>
              <textarea
                id="textarea"
                ref={textareaRef}
                placeholder={replyToCommentId ? "უპასუხე" : "დაწერე კომენტარი"}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button type="submit">
                {replyToCommentId ? "პასუხი" : "დააკომენტარე"}{" "}
              </button>
            </div>
          </form>

          <h6 id="comments">
            კომენტარები <span>{totalComments}</span>
          </h6>

          {comments.map((comment) => {
            return (
              <div className="comments" key={comment.id}>
                <div className="commentInfo">
                  <img src={comment.author_avatar} id="profile" alt="author" />
                  <div className="comment">
                    <h6>{comment.author_nickname}</h6>
                    <p>{comment.text}</p>
                    <label htmlFor="textarea">
                      <button onClick={() => handleReplyClick(comment.id)}>
                        <img
                          src=" \assets\images\Left.svg"
                          id="reply"
                          alt="reply"
                        />
                        უპასუხე
                      </button>
                    </label>
                  </div>
                </div>

                {Array.isArray(comment.sub_comments) &&
                  comment.sub_comments.length > 0 && (
                    <div className="reply-commentInfo">
                      {comment.sub_comments.map((subComment) => (
                        <div key={subComment.id}>
                          <div>
                            <img
                              src={subComment.author_avatar}
                              id="profile"
                              alt="author"
                            />
                            <div className="comment">
                              <h6>{subComment.author_nickname}</h6>
                              <p>{subComment.text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SingleTask;
