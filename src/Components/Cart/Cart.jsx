import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCart, deleteFromCart, fetchCartFunction, updateQuantity } from "../store/cart";
import Loading from "../Loading/Loading";
import toast, { Toaster } from "react-hot-toast";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

import "./Cart.css";
import axios from "axios";
import DeleteModal from "../DeleteModal/DeleteModal";
export default function Cart() {
  const { cart, loading, error, isRequiredRender  } = useSelector(
    (state) => state.cart
  );
 
  const dispatch = useDispatch();
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    dispatch(fetchCartFunction());
  }, [dispatch, isRequiredRender,rerender]);

  // update quantity

  async function updateQuantity(productId, count) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: {
          "Content-Type": "application/json",

          token: localStorage.getItem("userToken"),
        }, }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw new Error("Failed to update quantity. Please try again later.");
    }
  }

  async function updateCart(productId, count) {
   
   try {

      const {data} = await updateQuantity(productId, count);
      <Loading />
      toast('Product count updated');
      setRerender(prevState => !prevState);

      return data;
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update product count. Please try again later.");
    }
  }
  return (
    <>
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      <Toaster position="top-center" />
      <div className="cartInfo mt-5   text-center">
              <h2>shopping Cart</h2>
            </div>
      <div>
        {cart?.length === 0 ? (
          <div className=" ">
            <div className="productContent  text-center p-5">
              <i className="fa-solid fa-cart-plus ms-2 fs-1 cart mb-2 text-danger"></i>
              <h5 className="">There is no Products !</h5>
              <Link className="text-primary" to="/home">
                back to home
              </Link>
            </div>
          </div>
        ) : (
          <div className=" ">
           
            <div className=" container mt-5">
   
<DeleteModal/>
              {cart?.products?.map((product, idx) => (
                <div key={idx}>
                  <div className="row  d-flex align-items-center justify-content-around   ">
                    <div className="col-md-2  ">
                      <div className="cartImage">
                        <img
                          src={product.product.imageCover}
                          alt="productimage"
                          className="  rounded w-100"
                        />
                      </div>
                    </div>
                    <div className="col-md-8 ">
                      <div className="cartTitle position-relative ">
                        <i
                          onClick={() =>
                            dispatch(deleteFromCart(product?.product._id))
                          }
                          className="fa-regular fa-trash-can position-absolute top-0 start-100 fs-5 text-danger cursor-pointer	X"
                        ></i>

                        <h4 className="text-danger">{product.product.title}</h4>
                        <table className="table mt-5">
                          <thead>
                            <tr>
                              <th scope="col">quantity</th>
                              <th scope="col">price</th>
                              <th scope="col">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody className="">
                            <tr className=" ">
                              <td className="">
                                <span className=" quantity ">
                                <CiSquareMinus 
    onClick={() => {
        if (product.count > 1) {
            updateCart(product.product._id, product.count - 1);
        }
    }}                                
    className="text-danger"
/>
                                </span>
                                <span className="  px-1 "> {product.count}</span>
                                <span className="quantity">
                                <CiSquarePlus 
onClick={()=>updateCart(product.product._id,product.count+1)}                                
                                
                                className="text-success"/>
                                </span>
                              </td>
                              <td>${product.price}</td>
                              <td className="text-success">
                                ${product.count * product.price}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end  container mt-5">
              <div className="w-50 text-center">
                <table className="table table-striped">
                  <tbody>
                    <tr >
                      <td >
                        <h4 >
                          Order Total :{" "}
                          <span className="text-danger">
                            {" "}
                            {cart?.totalCartPrice} $
                          </span>
                        </h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

          
            </div>
            <div className="  container mb-5">
            <div className="row d-flex justify-content-end">
            <div className="col-md-3 ">
                <div 
    
    className="btn btn-success w-100 p-3">
                 <Link to="/checkout"> 
                  Checkout
                 </Link>
                </div>
              </div>
              <div className="col-md-3">
              <button type="button" className="btn btn-danger w-100 p-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Delete All Products</button>

              
     

              </div>
            </div>

          </div>
          </div>
          
        )}
      </div>


    </>
  );
}
