import Intro from './Components/intro';
import './App.css';
import Taskform from './Components/Taskform';
import { useState } from 'react';

function App() {
  const [started , setStarted] = useState(false);
  
  const handleClick =()=> setStarted(prev=> !prev);



  return (<>
    
     {!started && <Intro onClick ={handleClick} /> }
      {started && <Taskform  setStarted ={setStarted}/>}
    
 </> );
}

export default App;
