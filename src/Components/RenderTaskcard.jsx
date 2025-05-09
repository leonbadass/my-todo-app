import { FaBullseye, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import Subtaskform from "./Subtaskform";

const isMobileScreen = () => window.innerWidth <= 450;

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
  }, [])// listen for resize;

  return (
    <>
      {Object.entries(taskList).map(([key, task]) =>
        task.id ? (
          <div key={key} className= " my-1 flex flex-col " onClick={() => handleClick(key)}>
            <section className="bg-purple-400 flex justify-between p-2 rounded-t-lg">
              <strong>Task: {task.title.toUpperCase()}</strong>
              <p>Subtasks: {!task.subtask ? 0 : Object.keys(task.subtask).length}</p>

              <FaTrash
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTask(task.id);
                }}
                className=""
              />
            </section>

            <section className="p-2 bg-purple-200 rounded-b-lg">
              <div className=" flex justify-between">
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
                <div className="mobile-subtask-dropdown "
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
