import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pinterest_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const InstagramLink = "https://www.instagram.com/yobu.dev?igsh=ZjBnZ3g0eXZ1bzBi"
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="footer logo" />
        <p>J&S</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
         <a href={InstagramLink}> <img src={instagram_icon} alt="instagram icon" /></a>
        </div>
        <div className="footer-icons-container">
          <a href={InstagramLink}><img src={pinterest_icon} alt="instagram icon" /></a>
        </div>
        <div className="footer-icons-container">
          <a href={InstagramLink}><img src={whatsapp_icon} alt="instagram icon" /></a>
        </div>
      </div>

      <div className="footer-copyright">
        <hr className='footer-hr'/>
        <p>Copyright &copy; {currentYear}. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer