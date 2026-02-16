import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location=useLocation();
  return (
  <nav className="bg-[#333] p-4 fixed top-0 w-full 
  flex justify-between items-center z-50 
  shadow-md">
    <div className="text-white text-lg 
    uppercase tracking-wider 
    font-semibold">User Management </div>
    <ul className="flex gap-4">  
      <li>
        <Link className={`text-white no-underline px-4 py-2 transition-colors duration-300 
          rounded hover:bg-[#555]  ${location.pathname === "/" ? "bg-[#555]": ""}`} to="/">
          Home
        </Link>
      </li>
    <li>
      <Link to="/add" className={`text-white e px-4 py-2 transition-colors duration-300 
        rounded hover:bg-[#555]  ${location.pathname === "/add" ? "bg-[#555]": ""}`}>
        Add User
     </Link>
    </li>
   </ul>
  </nav>
  );
};

export default Navbar;