import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrumb from "../Components/Breadcrumbs/Breadcrumb";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import ProductDescriptionBox from "../Components/ProductDescriptionBox/ProductDescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  
  const { id } = useParams();
  const productId = Number(id);
  const product = all_product.find((e) => {
    return e.id === productId;
  });

  return (
    <div>
      <Breadcrumb product={product} />
      <ProductDisplay product={product} />
      <ProductDescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
