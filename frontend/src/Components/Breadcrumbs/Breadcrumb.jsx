import React from "react";
import "./Breadcrumb.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrumb = (props) => {
  const { product } = props;


  return (
    <div className="breadcrumb">
      HOME <img src={arrow_icon} alt="Breadcrumb arrow" /> SHOP{" "}
      <img src={arrow_icon} alt="Breadcrumb arrow" />
      { product &&
     <>
      {product.category} <img src={arrow_icon} alt="Breadcrumb arrow" />{" "}
      {product.name}
     </>

}
    </div>
  );
};

export default Breadcrumb;
