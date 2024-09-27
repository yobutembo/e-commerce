import React from 'react'
import './Navbar.css'
import nav_logo from '../../assets/nav-logo0.svg'
import nav_profile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={nav_logo} alt="admin panel logo" className="nav-logo" />
        <img src={nav_profile} alt="nav profile" className='nav-profile'/>
    </div>
  )
}

export default Navbar