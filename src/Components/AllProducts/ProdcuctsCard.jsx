import { useDispatch, useSelector } from "react-redux";
import "./Products.css";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import ProductLinksPopover from "./ProductLinksPopover";
import YourComponent from "./ProductLinksPopover";
import { IoEyeOutline } from "react-icons/io5";
import "./Products.css"
import { Toaster } from "react-hot-toast";
import Loading from "../Loading/Loading";
const ProductsCard = ({ type }) => {
  const { products ,loading} = useSelector((state) => state.products);
  const filteredProducts = products
    ? products.filter(
        (product) =>
          product.category.name === type &&
          product.title &&
          product.imageCover &&
          product.price
      )
    : [];

  
    
  return (
    <>
<Toaster position="top-center" />
{loading && <div><Loading/></div>}
<div className="row">
{products &&
        products.length > 0 &&
        filteredProducts.slice(0, 8).map((product) => (
          <div className="col-md-3   mt-2" key={product.id}>
            {product.category.name === type &&
              product.title &&
              product.imageCover &&
              product.price && (
                <div className="">
                  <div className="card border-0">
                    <div className="parent position-relative">
                      <img
                        src={product.imageCover}
                        className="w-100 rounded-1"
                        alt={product.title}
                      />
                      <div className="sibling rounded-1 d-flex justify-content-end align-items-end  ">
                        <div className="  h-100 p-3 ">
                           
<YourComponent  to={`/viewproduct/${product.id}`} product={product}  />
                         
    
                     
                        </div>
                      </div>
                    </div>
                    <div className="card-body ">
                      <h5 className="card-title">{product.title}</h5>
                      <div>
                        {product.priceAfterDiscount ? (
                          <p className="card-text ">
                            Price:{" "}
                            <span className="text-decoration-line-through text-danger ">
                              {" "}
                              ${product.price}
                            </span>{" "}
                            ${product.priceAfterDiscount}
                          </p>
                        ) : (
                          <p className="card-text ">Price:${product.price} </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
          </div>
          
        ))}
</div>
    
      
    </>
  );
};

export default ProductsCard;
