import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);

  const fetchProducts = async() => {
    const response = await fetch("http://localhost:4000/allproducts");
    const data = await response.json()
    setAllproducts(data)
  }
  useEffect(()=>{
    fetchProducts()
  }, [])



  const removeProduct = async (id) => {
    
    await fetch('http://localhost:4000/removeproduct', {
      method: "POST",
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({id:id})
    })

    await fetchProducts()
  
}


  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <>
            <div
              key={index}
              className="listproduct-format-main listproduct-format"
            >
              <img
                className="listproduct-product-icon"
                src={product.image}
                alt="product"
              />
              <p>{product.name}</p>
              <p>ZMW {product.old_price}</p>
              <p>ZMW {product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={()=>{removeProduct(product.id)}}
                src={cross_icon}
                className="listproduct-remove-icon"
                alt=""
              />
            </div>
            <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
