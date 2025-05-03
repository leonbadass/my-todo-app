import "./Style.css"
const Button = ({innerText , ...rest}) => {
    return (
      <button
       className="btn" {...rest}
         >
        {innerText}
      </button>
    );
  };
  
  export default Button;
  