import { useState } from "react";
import Button from "./Button";

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




    return (<>
        <h3 className="subtaskH3"> {props.taskList[props.selectTaskId].title.toUpperCase()}</h3>
        <form className="Form" onSubmit={handleSubmit}>
            <input id="subtask" type="text" value={subtaskTitle} onChange={handleChange} placeholder="Add Subtasks"/>
            <Button innerText='+' />
        </form>
        <ul className="subtaskCard-div">
            {Object.values(props.taskList[props.selectTaskId]?.subtask || {})
                .map(sub =>
                (<li className="subtaskCard" key={sub.id}> {sub.subTitle}<button type="button" onClick={() => removeSubtask(props.selectTaskId, sub.id)}
                >X</button>

                </li>))}
        </ul>

    </>)
}
export default Subtaskform;