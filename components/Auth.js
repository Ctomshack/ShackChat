import React, { useState } from 'react'
import Login from './Login';
import RegisterUser from './RegisterUser';


const Auth = () => {
    const [index, setIndex] = useState(false);

    const toggleIndex = () => {
        setIndex((prevState => !prevState))
    }

  return (
    <div>
        {!index ? <Login /> : <RegisterUser />}
        <p onClick={toggleIndex} className=" m-auto text-middle text-center text-sm text-gray-600 -mt-10">
        {!index ?  
        <>
            <span>Or{' '}</span>
            <a href="#" className="font-medium text-google hover:text-indigo-500">
            Create an account
            </a>
        </>
        : 
        <>
            <span>Or{' '}</span>
            <a href="#" className="font-medium text-google hover:text-indigo-500">
            Already have an account?
            </a>
        </>
        }
          </p>
    </div>
  )
}

export default Auth