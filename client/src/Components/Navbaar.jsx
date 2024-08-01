import React from 'react'
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'

const Navbaar = () => {
  return (
    <div className=' w-screen h-16' >
      <header >
        <div className="logo mt-3"><img className='w-32 rounded-3xl' src={logo} alt="" /></div>
        <nav className='mt-2'>
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
