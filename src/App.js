import Intro from './Components/intro';
//import './index.css';
import Taskform from './Components/Taskform';
import { useState } from 'react';

function App() {
  const [started , setStarted] = useState(false);
  
  const handleClick =()=> setStarted(prev=> !prev);



  return (<div className = "flex h-screen w-screen justify-center bg-purple-200" >
    
     {!started && <Intro onClick ={handleClick} /> }
      {started && <Taskform  setStarted ={setStarted}/>}
    
 </div> );
}

export default App;
