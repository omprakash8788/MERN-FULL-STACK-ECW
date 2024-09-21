import React, { useState } from "react";
import axios from 'axios'
import { backendUrl } from "../App";
import { toast } from "react-toastify";


const Login = ({setToken}) => {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("")

    // After that we will link our state variable to input fields
  const onSubmitHandler = async (e) => {

    try {
        e.preventDefault();
        // console.log(email, password);

        // Using this email and password we will authenticate the admin. 
        // here make the Api called.
        const response = await axios.post(backendUrl + '/api/user/admin', {email, password})
        // backendUrl + '/api/user/admin' <--- This is called concatenating,  {email, password} <---- This is added in the req . body
        // After that we will add console log
        // console.log(response);

        // After that store the token which we got on after console , and that token must be store in token state variable.
        if(response.data.success){
            // response.data.success - if it is true , it means our authentication is successful and we are getting one token. So we have to save the token in token state variable. That we have created in the App.jsx component.

            // before calling here 'setToken' setter function , first you should pass that in App component where you called the Login component , pass as props 

            // After that pass setToken setter function here
            
            setToken(response.data.token)

        }
        // In false condition
        else{
        //    here use react toastify to display the message , for that first you need to install that packages.
        toast.error(response.data.message)
        }
        


    } catch (error) {
      console.log(error);
      toast.error(error.message)


    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              className="rounded w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
                 onChange={(e)=>setPassword(e.target.value)}
                 value={password}
              className="rounded w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
