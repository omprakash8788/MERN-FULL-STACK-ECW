// import {assets} from '../assets/frontendassets'
import { useContext, useState } from "react";
import { assets } from "../assets/frontendassets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  // create state variable to handle menu for mobile
  const [visible, setVisible] = useState(false);
  // 1. here we have to get the setShowSearch function from ShopContext api

  // So, first here get the navigate, token and setToken, setCartItems from the ShopContext
  const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems}=useContext(ShopContext) 


  // After that we will create function for logout.
  const logout = ()=>{
    // we will navigate user to the login page.
    navigate('/login')
    // After that, first we will remove the token from the local storage
    localStorage.removeItem('token') //key name is token
    // After that clear the state variable
    setToken('');
    // After that when we will be logout clear the cartItems
    setCartItems({});
    // After that link this logout function to logout key.
    // Go down see the p tag there is logout option , link there.

  }
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to='/'>
      <img className="w-36" src={assets.logo} alt="" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] hidden bg-gray-700" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      {/* create search icon and user dropdown menu */}
      <div className="flex items-center gap-6">
        <img
          onClick={()=>setShowSearch(true)}
          src={assets.search_icon}
          alt="search icon"
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          {/* <Link to='/login'>
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile-icon"
          />
          </Link> */}
          {/* To hide */}
          <img
          onClick={()=> token ? null : navigate('/login')}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile-icon"
          />
           {/* ---- Dropdown Menu ----- */}
           {/* So, now we will display this div when we are logged in*/}
           {
            token &&   
            // So, whenever the token is avaliable then only this div will be display.
             <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              {/* add onclick propety on orders */}
              <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
              {/* Link logout function */}
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
           }       
        </div>
        {/* now crate link tag */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      
      {/* Sidebar menu for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          {/* add navlink tag */}
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to="/">Home</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to="/collection">Collection</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to="/about">About</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to="/contact">Contact</NavLink>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
