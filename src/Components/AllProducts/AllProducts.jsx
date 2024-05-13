import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/allProducts";
import ProdcuctsCard from "./ProdcuctsCard";
import ProductsTabs from "./ProductsTabs";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const AllProducts = () => {
  const { products, error, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="allproducts pb-5 mb-5">
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      {error && <p>Error: {error}</p>}
      <div className="container">
        <div className="container mt-5">
          <div className="productHeader text-center pt-5">
            <h2 className="my-4">Our Products</h2>
            <p className="fs-5 text-muted">
              This is the most highly requested product to date <br /> We are
              excited and proud to announce the launch of our premier line!.
            </p>
          </div>
        </div>
        <div className="row ">
          <ProductsTabs />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
