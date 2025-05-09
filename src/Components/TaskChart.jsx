
const TaskChart =({taskList})=>{
    const tasks = Object.values(taskList);
    const notStarted =[];
    const onGoing = [];
    const completed =[];

    
      
    
    const sortTask = ()=>{
        
        
         for( let task of tasks){
            if (task.status ==='Not Started'){
                notStarted.push(task);
            }else if(task.status ==='Completed'){
                completed.push(task);
            }else if (task.status==='Ongoing'){
                onGoing.push(task);
            }
        }
    }
        

    return(<div className="text-lg leading-loose " >
         {sortTask()}
         <h3 className=" font-purple-900 text-xl sm:text-2xl font-bold">Task Summary</h3>
        <p>Number of tasks: {tasks.length}</p>
        <p>Completed Tasks: {completed.length}</p>
        <p>Ongoing Tasks: {onGoing.length}</p>
        <p>Not Started: {notStarted.length}</p>
        </div>)
}

export default TaskChart;
