import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const navigate = useNavigate();
  const [apiMessage, setApiMessage] = useState(''); // Store API error
  const [loading, setLoading] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
 
  function onlinePayment(cartId, shippingAddress) {
    cart;
    //6588f63c113e3b9c31b9bf10
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart._id}?url=https://abdallahsamir98.github.io/E-commerce/`,
        {
          shippingAddress: shippingAddress,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
 
 
  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: Yup.object({
      details: Yup.string()
        .required('Details are required')
        .max(100, 'Details must be at most 100 characters'),
      phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{11}$/, 'Phone number must be 10 digits'),
      city: Yup.string().required('City is required'),
    }),
    onSubmit: async (values) => {
        let response=await onlinePayment(cart._id,values);

        if(response?.data?.status=='success'){
          
          window.location.href=response.data.session.url
        }
        else{
          console.log('error');
         }
        
          }
    },
  );

  return (
    <div className="container pt-5">
      <h4 className="mt-5 text-secondary">Checkout Form</h4>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details" className="my-2">
          Details
        </label>
        <input
          className="form-control"
          id="details"
          name="details"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.details}
        />
        {formik.touched.details && formik.errors.details && (
          <div className="mt-1 alert alert-danger" role="alert">
            {formik.errors.details}
          </div>
        )}

        <label htmlFor="phone" className="my-2">
          Phone Number
        </label>
        <input
          className="form-control"
          id="phone"
          name="phone"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="mt-1 alert alert-danger" role="alert">
            {formik.errors.phone}
          </div>
        )}

        <label htmlFor="city" className="my-2">
          City
        </label>
        <input
          className="form-control"
          id="city"
          name="city"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
        {formik.touched.city && formik.errors.city && (
          <div className="mt-1 alert alert-danger" role="alert">
            {formik.errors.city}
          </div>
        )}

        <button className="btn btn-success my-3" type="submit" disabled={loading}>
          {loading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : 'Pay With Cart'}
        </button>

        {apiMessage && (
          <div className="mt-3 alert alert-danger" role="alert">
            {apiMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default Checkout;
