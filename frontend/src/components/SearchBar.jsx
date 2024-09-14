import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontendassets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  // here first we will get the search, setSearch, showSearch, setShowSearch from context api
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
    
    const [visible, setVisible]=useState(false)
    // used useLocation hook
    const location = useLocation();


    useEffect(()=>{
        // console.log(location.pathname);
        if(location.pathname.includes('collection')){
            // both conditions are true in that case we will display the search bar, else it will be hidden
          setVisible(true)

        }
        else{
            setVisible(false)
        }
        
    },[location])

  // just after the return statement we will use the terneray operator when the showSearch be true then only will be return the div, if it is false then we will return the null
  return showSearch && visible ? (
    // when this both state will be true then our search box visible
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ">
        {/* we will save the input field data in the search state */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt=""
      />
    </div>
  ) : null;
};

export default SearchBar;
