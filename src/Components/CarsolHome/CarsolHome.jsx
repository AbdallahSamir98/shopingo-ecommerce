import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import "animate.css";
import "./CarsolHome.css";

export default function CarsolHome() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
   


      <div className='home pt-5 mt-1'>
<Carousel variant="dark" activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
     <div className="slider1 container  mt-5   ">
   
       <div className="row container  ">
        <div className="col-md-6  ">
        <div className="d-flex h-100 justify-content-center  flex-column  cursoltext ">
      <h4 className='animate__animated animate__fadeInUpBig text-danger'>NEW PRODUCTS</h4>
        <h2 className='animate__animated animate__fadeInUpBig'>Electronics Items</h2>
        <p className='animate__animated animate__fadeInUpBig animate__slow'>Take a look at these seating essentials that will help you
          <br /> Last call for upto 45%</p>
          <Link to='/allproducts'><button className='btn1 btn btn-danger  w-25 animate__animated animate__fadeInUpBig animate__delay-1s'>Shop Now</button></Link>
      </div>
        </div>
        <div className="col-md-6  ">
          <div>
          <img
          className=" imageslider animate__animated animate__fadeInUpBig"
          src="images/s_4.webp"
          alt="First slide"
        />
          </div>
        </div>
       </div>
      

        
     </div>
      </Carousel.Item>

      <Carousel.Item>
     <div className="slider1 container  mt-5 ">
   
       <div className="row container">
        <div className="col-md-6">
        <div className="d-flex h-100 justify-content-center  flex-column  cursoltext ">
      <h4 className='animate__animated animate__fadeInUpBig text-danger'>Complete your look with</h4>
        <h2 className='animate__animated animate__fadeInUpBig'> Men's Accessories</h2>
        <p className='animate__animated animate__fadeInUpBig animate__slow'>Hats & Caps, Sunglasses, Bags & much more..
          <br /> get through your day with ease.</p>
          <Link to='/allproducts'><button className='btn1 btn btn-danger w-25 animate__animated animate__fadeInUpBig animate__delay-1s'>Shop Now</button></Link>
      </div>
        </div>
        <div className="col-md-6 ">
          <div>
          <img
          className=" imageslider animate__animated animate__fadeInUpBig w-100 mt-3 "
          src="images/03.png"
          alt="First slide"
        />
          </div>
        </div>
       </div>
      

        
     </div>
      </Carousel.Item>
     
    </Carousel>
</div>
    </>
  );
}
