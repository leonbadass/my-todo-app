import Intro from './Components/intro';
//import './index.css';
import Taskform from './Components/Taskform';
import { useState } from 'react';

function App() {
  const [started , setStarted] = useState(false);
  
  const handleClick =()=> setStarted(prev=> !prev);



  return (<div className = "flex h-screen w-screen sm:justify-center bg-purple-300 pb-4 sm:pb-10" >
    
     {!started && <Intro onClick ={handleClick} /> }
      {started && <Taskform  setStarted ={setStarted}/>}
    
 </div> );
}

export default App;
