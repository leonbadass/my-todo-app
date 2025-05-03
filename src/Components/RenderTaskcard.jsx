import { FaBullseye, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import Subtaskform from "./Subtaskform";

const isMobileScreen = () => window.innerWidth <= 768;

const RenderTaskcard = ({ taskList, removeTask, setSelectTaskId, selectTaskId, setTaskList }) => {
  const [isMobile, setIsMobile] = useState(isMobileScreen());

  const handleClick = (key) => {
    if (selectTaskId === Number(key)) {
      setSelectTaskId(null);
    } else {
      setSelectTaskId(Number(key));
    }
  };

  const handleToggleStatus = (taskId) => {
    setTaskList((prev) => {
      const updatedTask = { ...prev[taskId] };
      if (updatedTask.status === "Not Started") {
        updatedTask.status = "Ongoing";
      } else if (updatedTask.status === "Ongoing") {
        updatedTask.status = "Completed";
      } else {
        updatedTask.status = "Not Started";
      }
      return {
        ...prev,
        [taskId]: updatedTask,
      };
    });
  };

  const handleStatus = (status) =>
    status === "Not Started" ? "toggle-status" : status === "Completed" ? "completed" : "onGoing";

  useEffect(() => {
    const handleResize = () => setIsMobile(isMobileScreen());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {Object.entries(taskList).map(([key, task]) =>
        task.id ? (
          <div key={key} className="taskcard" onClick={() => handleClick(key)}>
            <section className="taskcardHeader">
              <strong>Task: {task.title.toUpperCase()}</strong>
              <p>Subtasks: {!task.subtask ? 0 : Object.keys(task.subtask).length}</p>

              <FaTrash
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTask(task.id);
                }}
                className="taskDeleteIcon"
              />
            </section>

            <section className="taskcardBody">
              <div className="status">
              <p >Status: {task.status}</p>
              <FaBullseye
                title="Toggle Status"
                className={handleStatus(task.status)}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleStatus(task.id);
                }}
              />
              </div>

              {isMobile && selectTaskId === task.id && (
                <div className="mobile-subtask-dropdown"
                onClick={(e) => e.stopPropagation()}>
                  <Subtaskform
                    selectTaskId={task.id}
                    taskList={taskList}
                    setTaskList={setTaskList}
                  />
                </div>
              )}
            </section>
          </div>
        ) : null
      )}
    </>
  );
};

export default RenderTaskcard;
