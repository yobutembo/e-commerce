import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/down.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");

  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdownToggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to='/' ><img src={logo} alt="" /></Link>
        <Link to='/' style={{textDecoration: 'none'}}><p>J&S</p></Link>
      </div>

      <img className="nav-dropdown" onClick={dropdownToggle} src={nav_dropdown} alt="" />

      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          {" "}
          <Link className='nav-link' style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>{" "}
          {menu === "shop" && <hr />}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          {" "}
          <Link className='nav-link' style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>{" "}
          {menu === "mens" && <hr />}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          {" "}
          <Link className='nav-link' style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>{" "}
          {menu === "womens" && <hr />}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link className='nav-link' style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>{" "}
          {menu === "kids" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token")
        ?
        <button onClick={()=>{localStorage.removeItem("auth-token");window.location.replace('/')}}>Logout</button>  
        :
        <Link to="/login">
        <button>Login</button>
      </Link>
      }
       
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
