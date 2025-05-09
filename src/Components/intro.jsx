
import Button from "./Button";
import {motion} from "framer-motion"
import "./Style.css"

const MotionButton = motion(Button);

const Intro = (props)=> {

  const dropIn = {
        hidden: { y: -200, opacity: 0 },
        visible: (i) => ({
          y: 0,
          opacity: 0.75,
          transition: {
            delay: i * 0.6, // delay each item
            duration: 1.2,
            type: 'spring',
            stiffness: 35,
          },
        }),
      };
    

    return(<>
    <div className="self-center ">
      <div className="flex flex-col sm:flex-row justify-center" >
        <div className="pb-4 sm:pb-1">
        {['Create', 'Execute', 'Delete'].map((text, i) => (
        <motion.div
        whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
          key={text}
          custom={i}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          style={{
            flexGrow: 1,
            flexShrink: 2,
            fontSize: i === 0 ?  'clamp(3rem, 10vw, 10rem)' : i === 1 ? 
            'clamp(2.5rem, 8vw, 8.5rem)' : 'clamp(2rem, 6vw, 7rem)',
            color: i === 0 ? '#e66ce1' : '#000',
            lineHeight: 1,
            margin: 0,
            padding: 0,
          }}
        >
          {text}
        </motion.div>
        ))}
         
        </div>
    
    <div 
    className="cta-div"
   >
        
    <p >
      Simple & efficient task management app <br></br>the easy way to stay organized.
      </p>
    <MotionButton
      whileHover= {{ scale: 1.5 }}
      transition={ { type: 'spring', stiffness: 300 }}
         innerText = "Get Started" onClick={props.onClick}/>
     </div>
    </div>
    </div>
    </>)
}
export default Intro;