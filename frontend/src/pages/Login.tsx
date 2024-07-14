import React, { useState } from "react";
import upperIcon from "../images/upperIcon.png";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

const Login: React.FC = () => {

  const [isUserExist, setIsUserExist] = useState(true) 
   
  return (
    <div className="bg-white text-black h-screen">
      <div>
        {
          isUserExist === true ? (
            <SignUp />  
          ) : (     
            <SignIn /> 
          )
        }
        
      </div>
    </div>
  );
};
  
export default Login;
