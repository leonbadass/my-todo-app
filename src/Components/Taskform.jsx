import { useState} from "react"
import useLocalStorageState from "use-local-storage-state";
import Subtaskform from "./Subtaskform";
import RenderTaskcard from "./RenderTaskcard";
import DateTimeDisplay from "./DateTimeDisplay";
import TaskChart from "./TaskChart";
import BarChart from "./BarChart";
import { FaCircleArrowRight } from "react-icons/fa6";


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
    
       


    

    return (<div className="flex bg-purple-300 w-full  flex-col pt-4 pb-2 sm:p-2 lg:p-10 h-full overflow-hidden mx-2 sm:mx-2 lg:mx-10  ">

        <div className="flex justify-between">
            <form onSubmit={handleSubmit} className="flex w-full sm:w-1/3 mx-1 pr-5">
                <input className="w-2/3   rounded-l-lg p-2" id="task" type="text" value={description} onChange={handleChange} placeholder="Add Task" />
                 <button type="submit" className="bg-purple-900 hover:bg-purple-500 text-purple-300 hover:text-purple-900 w-1/3 text-lg font-bold rounded-r-lg pb-2 ">+</button>
            </form>
        
            <FaCircleArrowRight onClick= {handleClick} className=" sm:text-4xl text-xl font-bold fill-purple-500 hover:sm:fill-purple-900" title="Back To Landing page"/>
        </div>
               
        <div className="flex flex-col h-full  py-2 lg:py-4 sm:flex-row w-full"> 
           <div className="h-2/3 flex-1 sm:h-full w-full sm:w-1/3  p-2 overflow-y-auto max-h-full mb-1  bg-gray-100 rounded-lg" >
               <RenderTaskcard removeTask = {removeTask} taskList ={taskList} 
                setSelectTaskId={setSelectTaskId} selectTaskId={selectTaskId}
                setTaskList={setTaskList}/>
           </div>
        
           <div className=" flex flex-col gap-4 w-full sm:w-2/3  lg:mx-4 bg-gray-100 bg-opacity-30 rounded-lg mb-4 max-h-full sm:h-full">
                <div className="flex flex-col sm:flex-row gap:5 lg:gap-10 h-full justify-center items-center py-4" >
                    <TaskChart taskList={taskList} />
                    <BarChart taskList ={taskList}/>
                </div>
                <div className="  h-full   bg-purple-300 bg-opacity-50  hidden sm:flex sm:pb-4">
                    <DateTimeDisplay/>
                    <div className="flex flex-col px-8 pt-2 flex-1 h-full">
                       <h2 className="font-bold text-lg text-purple-900 self-center tracking-widest ">Task Manager</h2>
                        {selectTaskId ? <h4 className="text-sm text-purple-800  self-center leading-loose"> Add and remove subtasks</h4>
                        :<h4  className="text-sm text-purple-800  self-center leading-loose" >Click a task to view and manage subtasks</h4>}
                        {selectTaskId && <Subtaskform selectTaskId={selectTaskId} taskList ={taskList} setTaskList={setTaskList}/>}
                    </div>
                </div>
           </div>
        </div>
        
        </div>)
        
}

export default Taskform;