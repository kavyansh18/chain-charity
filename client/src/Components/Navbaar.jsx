import React from 'react'
import { NavLink } from "react-router-dom";

const Navbaar = () => {
  return (
    <div >
      <header >
        <div className="logo">karan</div>
        <nav>
        <NavLink className='hover:bg-black' to="/home">
            Home
          </NavLink>
          <NavLink className='hover:bg-black' to="/home">
            Profile
          </NavLink>
        </nav>
      </header>
    </div>
  )
}

export default Navbaar
