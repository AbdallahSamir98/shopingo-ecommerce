import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
// import "./Home.css";


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchAllBrands } from "../store/allBrands";

const Brands = () => {
  const { brands, loading, error } = useSelector(state => state.brands);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchAllBrands());
  }, [dispatch]);
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true
  };
  return (
    <>
    <div className="cartInfo mt-5  text-center mb-4">
              <h2>All Brands</h2>
            </div>
      <div className=" container">
      <div className="container">
        
       
        </div>
        {loading && (
          <p className="d-flex justify-content-center align-items-center h-100">
            <Loading />
          </p>
        )}
        {error && <p className="text-danger text-center">Error: {error}</p>}
   
        
     
  



           <div className="row my-5 py-3 ">
                {brands.map(brand => (
                    <div className="col-md-3 mb-4   " key={brand.id}>
                        <div className=" brandsEffect d-flex justify-content-center">
                            <img src={brand.image} className=" w-50"  alt={brand.name} />
                            <div className="">
                            </div>
                        </div>
                    </div>
                ))}
            </div>
      </div>
    </>
  );
};

export default Brands;
