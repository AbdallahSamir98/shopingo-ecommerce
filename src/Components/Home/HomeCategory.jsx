import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallCategories } from "../store/allCategories";
import Loading from "../Loading/Loading";
import "./Home.css";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMediaQuery } from '@mui/material';

const HomeCategory = () => {
  const { category, error, loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery('(max-width:760px)');
  const isMediumScreen = useMediaQuery('(min-width:761px) and (max-width:980px)');
  const isLargeScreen = useMediaQuery('(min-width:981px) and (max-width:1200px)');
  const isExtraLargeScreen = useMediaQuery('(min-width:1201px)');

  useEffect(() => {
    dispatch(fetchallCategories());
  }, [dispatch]);

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

  const settings = {
    infinite: true,
    speed: 10,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true
  };

  return (
    <>
      <div className="container mt-5 pt-2">
        <div className="container">
          <div className="productHeader text-center">
            <h2 className="my-4">Top Category</h2>
            <p className="fs-5 text-muted mb-5">
              Follow the most popular trends and get exclusive items from shopingo ecommerce.
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
          {category &&
            category.map((item, index) => (
              <div key={index}>
                <div className="text-center">
                  <img
                    src={item.image}
                    alt=""
                    className="categoryImage rounded-1 mb-2"
                  />
                  <h3 className="fs-5">{item.name}</h3>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default HomeCategory;
