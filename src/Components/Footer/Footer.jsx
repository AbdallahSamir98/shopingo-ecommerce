
import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
export default function Footer() {

  
  
  return (
    <>
    
    
    <div className=" bg-dark footer container-fluid">
       <div className="row py-5 container m-auto ">
        
            <div className="col-md-3 ">
            <div className="fotterContent text-white">
                    <h6>ABOUT US</h6>
                    <p className='my-3'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                    
                        <ul className='d-flex  align-items-center   list-unstyled'>
                            <li>
                        <span><i className="fa-brands fa-facebook social " ></i></span>

                            </li>
                            <li>
                        <span><i className="fa-brands fa-twitter social ms-3"></i></span>

                            </li>
                            <li>
                        <span><i className="fa-brands fa-linkedin social ms-3"></i></span>

                            </li>
                            <li>
                        <span><i className="fa-brands fa-youtube social ms-3"></i></span>

                            </li>
                        </ul>
                    
                </div>
            </div>
            <div className="col-md-3  ">
            <div className="fotterContent ms-md-5 text-white">
                    <h6>INFORMATION</h6>
                <div className='mt-3'>
                <p>About Us</p>
                    <p>Manufactures</p>
                    <p> Tracking Order</p>
                    <p> Privacy & Policy</p>
                    <p>Terms & Conditions</p>
                        
                </div>
                    
                </div>
            </div>

            <div className="col-md-3">
            <div className="fotterContent ms-md-5  text-white">
                    <h6>MY ACCOUNT</h6>
                    <div className='mt-3'>
                <p>

              <Link to="/login">Login</Link>
                </p>
                <p>

              <Link to="/cart">My Cart</Link>
                </p>
                <p>

              <Link to="/wishlist">Wishlist</Link>
                </p>
                <p>

              <Link to="/">Compare</Link>
                </p>
                <p>

              <Link to="/">My Account</Link>
                </p>
            </div>
                    
                </div>
            </div>


            <div className="col-md-3 ">
            <div className="fotterContent  text-white">
                    <h6>NEWSLETTER</h6>
                <div className='mt-3'>
                    <input type="text" placeholder='Enter Email Address' className='form form-control' />
                     <button className='btn btn-danger   mt-3'><i className="fa-solid fa-paper-plane"></i> subscribe</button>   
                </div>
                    
                </div>
            </div>

            </div>

    </div>
    
  
    
    
    </>
  )
}