import { FaBullseye, FaTrash } from "react-icons/fa";



const RenderTaskcard = ({taskList, removeTask, setSelectTaskId, selectTaskId, setTaskList}) => {

  const handleClick=(key)=> {
    
    if (selectTaskId === key) {
      // If the same task is clicked, unselect it (optional)
      setSelectTaskId(null);
    } else {
      // If a different task is clicked, select it
      setSelectTaskId(key);
    }

  }

  const handleToggleStatus = (taskId) => {
    setTaskList(prev => {
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
        [taskId]: updatedTask
      };
    });
  };

  const handleStatus = (status) =>
    status === 'Not Started'
      ? 'toggle-status'
      : status === 'Completed'
      ? 'completed'
      : 'onGoing';

  

  return  (<>
    { Object.entries(taskList).map( ([key, task])=> task.id?(
  <div
  key={key}
  className="taskcard" onClick={()=> handleClick(key)}
  >
    <section className="taskcardHeader">
    <strong>Task: {task.title.toUpperCase()}</strong>
    <p>Subtasks: {!task.subtask? 0 : Object.keys(task.subtask).length}</p>
   
      
<FaTrash type="button" onClick={(e) =>{
      e.stopPropagation();
      removeTask(task.id)}}
      className="taskDeleteIcon"/>

    </section>

    <section className="taskcardBody">
      
      <p>Status: {task.status}</p>
      <FaBullseye  title="Toggle Status"
       className= { handleStatus(task.status)} 
        type="button" onClick={(e) => {
        e.stopPropagation()
        handleToggleStatus(task.id)
        
      }
        }/>
  
      
    </section>
  </div>
):""
    )}
    </>)
};
export default RenderTaskcard;
  