import Intro from './Components/intro';
//import './index.css';
import Taskform from './Components/Taskform';
import { useState } from 'react';

function App() {
  const [started , setStarted] = useState(false);
  
  const handleClick =()=> setStarted(prev=> !prev);



  return (<main className = "flex h-screen w-screen sm:justify-center bg-purple-300 pb-4 sm:pb-10 " 
  role="main"
  aria-live="polite">
    
     {!started && <Intro onClick ={handleClick} /> }
      {started && <Taskform  setStarted ={setStarted}/>}
    
 </main> );
}

export default App;
