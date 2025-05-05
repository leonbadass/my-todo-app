import { useState} from "react"
import Button from "./Button"
import useLocalStorageState from "use-local-storage-state";
import Subtaskform from "./Subtaskform";
import RenderTaskcard from "./RenderTaskcard";
import DateTimeDisplay from "./DateTimeDisplay";
import TaskChart from "./TaskChart";
import BarChart from "./BarChart";


const Taskform = ({setStarted}) => {
    const [description, setDescription] = useState("");
    const [taskList, setTaskList] = useLocalStorageState('taskList', { defaultValue: {} });
    const [selectTaskId, setSelectTaskId] = useState(null);
   


    const handleChange = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (description.trim() === '') return; //to prevent empty tasks
        addTask()
        setDescription('')
    }

    const handleClick = ()=>{
        setStarted(prev=> !prev);
    }

    const addTask = () => {
        const id = Date.now();
        setTaskList(prev => ({ ...prev, [id]: { id: id, title: description, subtask: {}, isdone: false, status: "Not Started"} }))
        
    }


    const removeTask = (taskId) => {
        if (Number(selectTaskId) === Number(taskId)) {
            setSelectTaskId(null);
        }
        console.log(selectTaskId)
        console.log(taskId)
            
            
          setTaskList(prev => {
            const updatedTask = { ...prev }
            delete updatedTask[taskId]
            return updatedTask
        })
    }
    
       


    

return (<div className="taskform">

<div className="taskformControls">
        <form onSubmit={handleSubmit} className="Form">
            <input id="task" type="text" value={description} onChange={handleChange} placeholder="Add Task" />
            <Button innerText='Add' />
        </form>
        <div className="landing">
        <Button innerText= "Landing page" onClick= {handleClick}/>
        </div>
        </div>

        <div className="main">
       

       <div className="taskcardZone">
       
       <div>
       <RenderTaskcard removeTask = {removeTask} taskList ={taskList} 
        setSelectTaskId={setSelectTaskId} selectTaskId={selectTaskId}
        setTaskList={setTaskList}/>
       </div>

       </div>
       <div className="chartZone">
        <div className="taskchartZone">
        
        <TaskChart taskList={taskList}/>
        
            <BarChart taskList ={taskList}/>
        </div>
        <div className="chartZone-child">
        
            <DateTimeDisplay/>

        
        <div className="subtaskZone">
           <h2>Task Manager</h2>
            {selectTaskId ? <h4> Add and remove subtasks</h4>:<h4>Click a task to view and manage subtasks</h4>}
            {selectTaskId && <Subtaskform selectTaskId={selectTaskId} taskList ={taskList} setTaskList={setTaskList}/>}
        </div>
        </div>
        

       </div>
       </div>

    </div>)
}

export default Taskform;