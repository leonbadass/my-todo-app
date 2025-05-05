import Intro from './Components/intro';
import './App.css';
import Taskform from './Components/Taskform';
import { useState } from 'react';

function App() {
  const [started , setStarted] = useState(false);
  
  const handleClick =()=> setStarted(prev=> !prev);



  return (<div classname="app" >
    
     {!started && <Intro onClick ={handleClick} /> }
      {started && <Taskform  setStarted ={setStarted}/>}
    
 </div> );
}

export default App;
