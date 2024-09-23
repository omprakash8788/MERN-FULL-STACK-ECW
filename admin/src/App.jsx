import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency  = '$'

const App = () => {
  const [token, setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
  // in useState , we will check in token available in the local storage in that case we will provide token state variable ? localStorage.getItem('token') and if it is not avaliable simply add empty string
 
  // To save token in local storage
  useEffect(()=>{
    // so whenever the token will be updated then the this function will be excauted and store the token in the localStorage
    localStorage.setItem('token', token)
    // after that in change the initail value of useState
  },[token])
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer/>
      {/* ternary operator */}
      {
        token === "" ? <Login setToken={setToken}/> : 
      <>
        <Navbar setToken={setToken} />
        <hr />
        <div className="flex w-full">
          <Sidebar />
          {/* Routes setup */}
          <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600  text-base">
            <Routes>
              <Route path="/add" element={<Add token={token}/>}/>
              <Route path="/list" element={<List token={token}/>}/>
              {/* Note - In all component i am passing props as token just because ,whenever we make the Api call for the product , add, list and list the order then we have to provide the token */}
              <Route path="/orders" element={<Orders token={token}/>}/>

            </Routes>
          </div>
        </div>
      </>
      }
    </div>
  );
};

export default App;
