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
    
       


    

    return (<div className="flex bg-purple-200 w-full flex-col p-10 h-full overflow-hidden mx-10">

        <div className="flex justify-between">
            <form onSubmit={handleSubmit} className="Form">
                <input id="task" type="text" value={description} onChange={handleChange} placeholder="Add Task" />
                <Button innerText='Add' />
            </form>
        
            <Button innerText= "Landing page" onClick= {handleClick}/>
        </div>
               
        <div className="flex h-full py-4"> 
           <div className=" w-1/3 p-2 overflow-y-auto max-h-full mb-4 bg-gray-100 rounded-lg" >
               <RenderTaskcard removeTask = {removeTask} taskList ={taskList} 
                setSelectTaskId={setSelectTaskId} selectTaskId={selectTaskId}
                setTaskList={setTaskList}/>
           </div>
        
           <div className=" flex flex-col gap-4 w-2/3 mx-4 bg-gray-100 bg-opacity-30 rounded-lg mb-4 max-h-full">
                <div className="flex   gap-10 h-full justify-center items-center" >
                    <TaskChart taskList={taskList}/>
                    <BarChart taskList ={taskList}/>
                </div>
                <div className="flex  h-full   bg-purple-300 bg-opacity-50 pb-2 ">
                    <DateTimeDisplay/>
                    <div className="flex flex-col px-8 pt-2 flex-1 h-full">
                       <h2 className="font-bold text-lg text-purple-900 self-center tracking-widest ">Task Manager</h2>
                        {selectTaskId ? <h4 className="text-sm text-purple-800  self-center leading-loose"> Add and remove subtasks</h4>:<h4>Click a task to view and manage subtasks</h4>}
                        {selectTaskId && <Subtaskform selectTaskId={selectTaskId} taskList ={taskList} setTaskList={setTaskList}/>}
                    </div>
                </div>
           </div>
        </div>
        
        </div>)
        
}

export default Taskform;