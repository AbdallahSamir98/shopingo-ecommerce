import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../store/allProducts';
import YourComponent from './ProductLinksPopover';
import { Toaster } from 'react-hot-toast';
import Loading from '../Loading/Loading';

const DisplayAllProducts = ({ type }) => {
  const { products, error, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);


  return (
    <>
      <Toaster position="top-center" />
      <div className="cartInfo mt-5   text-center mb-4">
              <h2>All Products</h2>
            </div>
      <div className="container">

      {loading && <p><Loading/></p>}
      {error && <p>{error} </p>}

      <div className="row ">
        {products?.map((product) => (
          <div className="col-md-3 " key={product.id}>
            <div className="card border-0">
              <div className="parent position-relative">
                <img
                  src={product.imageCover}
                  className="w-100 rounded-1"
                  alt={product.title}
                />
                <div className="sibling rounded-1 d-flex justify-content-end align-items-end  ">
                  <div className="  h-100 p-3 ">
                    <YourComponent to={`/viewproduct/${product.id}`} product={product} />
                  </div>
                </div>
              </div>
              <div className="card-body ">
                <h5 className="card-title">{product.title}</h5>
                <p>
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
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}

export default DisplayAllProducts;
