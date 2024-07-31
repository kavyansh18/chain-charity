import React from 'react'
import { NavLink } from "react-router-dom";

const Navbaar = () => {
  return (
    <div >
      <header >
        <div className="logo">karan</div>
        <nav>
        <NavLink className='hover:bg-black' to="/explore">
            Home
          </NavLink>
          <NavLink className='hover:bg-black' to="/home">
            Profile
          </NavLink>
          <NavLink className='hover:bg-black' to="/login">
            Login
          </NavLink>
        </nav>
      </header>
    </div>
  )
}

export default Navbaar
