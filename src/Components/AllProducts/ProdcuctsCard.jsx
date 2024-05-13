import { useSelector } from "react-redux";
import "./Products.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import Loading from "../Loading/Loading";

const ProductsCard = ({ type }) => {
  const { products, loading } = useSelector((state) => state.products);
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

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {filteredProducts.slice(0, 8).map((product) => (
          <div className="col" key={product.id}>
            <div className="card border-0">
              <img
                src={product.imageCover}
                className="card-img-top rounded-1"
                alt={product.title}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <div>
                  {product.priceAfterDiscount ? (
                    <p className="card-text">
                      Price:{" "}
                      <span className="text-decoration-line-through text-danger">
                        ${product.price}
                      </span>{" "}
                      ${product.priceAfterDiscount}
                    </p>
                  ) : (
                    <p className="card-text">Price: ${product.price}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsCard;
