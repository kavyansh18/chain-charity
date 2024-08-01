import React from 'react'
import { NavLink } from "react-router-dom";

const Navbaar = () => {
  return (
    <div className=' w-screen' >
      <header >
        <div className="logo">NGO Donations</div>
        <nav>
        <NavLink to="/explore">
            Home
          </NavLink>
          <NavLink to="/home">
            Profile
          </NavLink>
          <NavLink to="/login">
            Login
          </NavLink>
          <NavLink to="/register">
            Register as NGO
          </NavLink>
        </nav>
      </header>
    </div>
  )
}

export default Navbaar
