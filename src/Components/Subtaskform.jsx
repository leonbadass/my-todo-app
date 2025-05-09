import { useState } from "react";
import { FaTrash } from "react-icons/fa";

function Subtaskform(props) {
    const [subtaskTitle, setSubtaskTitle] = useState('');
    const handleChange = (e) => {
        e.stopPropagation();
        setSubtaskTitle(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!props.selectTaskId) return;
        if (subtaskTitle.trim() === '') return; //to prevent empty tasks
        addSubtask()
        setSubtaskTitle('');
    }

    const addSubtask = () => {
        const subId = Date.now();
        props.setTaskList(prev =>
        ({
            ...prev,
            [props.selectTaskId]: {
                ...prev[props.selectTaskId],
                subtask:{
                    ...prev[props.selectTaskId]?.subtask,
                    [subId]: { id: subId, subTitle: subtaskTitle, isDone: false }
                }
            }
        }))
    }

    const removeSubtask = (taskId, subId) => {
        props.setTaskList(prev => {
            const updatedSubtask = { ...prev[taskId].subtask }
            delete updatedSubtask[subId]
            return {
                ...prev,
                [taskId]: {
                    ...prev[taskId],
                    subtask: updatedSubtask
                }
            };
        })
    }

    return (<div className="overflow-hidden h-full">
        <h3 className="font-mono text-purple-900 text-2xl tracking-wider leading-loose font-bold"> <span className="text-gray-700 italic text-sm">To-Do</span>:{props.taskList[props.selectTaskId].title.toUpperCase()}</h3>
        <form className="flex" onSubmit={handleSubmit}>
            <input className="w-2/3   rounded-l-lg p-2" id="subtask" type="text" value={subtaskTitle} onChange={handleChange} placeholder="Add Subtasks"/>
            <button type="submit" className="bg-purple-900 w-1/3 text-purple-300 text-lg font-bold rounded-r-lg pb-2 hover:bg-purple-500 hover:text-purple-900">+</button>
        </form>
        <h5 className="tracking-wide  font-bold text-sm text-purple-900 my-1">Subtasks:</h5>
        <ol className= "max-h-[10rem] overflow-y-auto ">
            {Object.values(props.taskList[props.selectTaskId]?.subtask || {})
                .map(sub =>
                (<li key={sub.id} className="bg-purple-800 text-xl lg:text-base ml-2 font-bold text-purple-200 rounded-r-lg p-1 flex justify-between align-center w-full lg:w-2/3 mt-1 ">
                    {sub.subTitle}
                 <FaTrash className="mt-1 " type="button" onClick={() => removeSubtask(props.selectTaskId, sub.id)}
                 >X</FaTrash>
                 </li>
            ))}
        </ol>
    </div>)
}
export default Subtaskform;
