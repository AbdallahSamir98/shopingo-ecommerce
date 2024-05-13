import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
// import "./Home.css";


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchAllBrands } from "../store/allBrands";
import { useMediaQuery } from "@mui/material";

const BrandSlider = () => {
  const { brands, loading, error } = useSelector(state => state.brands);
  const dispatch = useDispatch();


  useEffect(() => {
      dispatch(fetchAllBrands());
  }, [dispatch]);
  

  const isSmallScreen = useMediaQuery('(max-width:760px)');
  const isMediumScreen = useMediaQuery('(min-width:761px) and (max-width:980px)');
  const isLargeScreen = useMediaQuery('(min-width:981px) and (max-width:1200px)');
  const isExtraLargeScreen = useMediaQuery('(min-width:1201px)');
  let slidesToShow = 5;

  if (isSmallScreen) {
    slidesToShow = 2;
  } else if (isMediumScreen) {
    slidesToShow = 3;
  } else if (isLargeScreen) {
    slidesToShow = 4;
  } else if (isExtraLargeScreen) {
    slidesToShow = 5;
  }
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true
  };
  return (
    <>
    <div className="" style={{background:"#f6f6f6"}}>
    <div className=" container py-5">
      <div className="container">
        <div className="productHeader text-center ">
          <h2 className="my-4">Shop By Brands
</h2>
          <p className="fs-5 text-muted mb-5">
          Select Your Favorite Brands And Purchase



          </p>
        </div>
        </div>
        {loading && (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Loading />
          </div>
        )}
        {error && <p className="text-danger text-center">Error: {error}</p>}
        <Slider {...settings}>
      {brands &&
        brands.map((item, index) => (
          <div key={index}>
           <div className="text-center ">
                    <img
                      src={item.image}
                      alt=""
                      className="categoryImage brandImage rounded-1 mb-2 "
                    />
                    {/* <h3 className="fs-5">{item.name}</h3> */}
                  </div>
          </div>
        ))}

    </Slider>
        
     
  



      
      </div>
    </div>
    
    </>
  );
};

export default BrandSlider;
