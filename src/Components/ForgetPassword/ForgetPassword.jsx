import   './ForgetPassword.css'
import  { useState } from 'react';
 import { useFormik } from 'formik';
 import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const ForgetPassword = () => {

    const navigate = useNavigate();
    const [apiMessage, setApiMessage] = useState('') //store api error
    const [loading, setLoading] = useState(false);
  
      const formik = useFormik({
          initialValues: {
           
            email: '',
          },
          validationSchema: Yup.object({
            
            email: Yup.string().email('Invalid email address').required('Required'),
           
          }),
          onSubmit: async values => {
              try {
                  setLoading(true);
  
                  const response = await axios.post(
                    'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
                    values
                  );
          console.log(response);
          if (response.data.message === "success") {
              navigate("/home");
              console.log(response.data);
            }else {
              setApiMessage(response.data.message)
           
            }
          
          
                } catch (error) {
                  setApiMessage(error.response.data.message)
                  console.log(error.response.data.message,"aaaaaa");
              }finally {
                  setLoading(false);
                }
          },
        });




  return (
    <div className='container '><div className="form-container m-auto mt-5">
    <div className="logo-container">
      Forgot Password
    </div>

    <form className="form" onSubmit={formik.handleSubmit}>

    <label htmlFor="email" className='my-2'>Email Address</label>
          <input
          className="form-control "

            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="mt-3 alert alert-danger" role="alert">{formik.errors.email}</div>
          ) : null}

    

      <button className="btn btn-success my-3" type="submit" disabled={loading}>
          {loading ?   <i className="fa-solid fa-spinner fa-spin-pulse"></i>
 : "Login"}
        </button>
        
        {apiMessage && (
          <div className="mt-3 alert alert-danger" role="alert">
            {apiMessage}
          </div>
        )}
    </form>

    <p className="signup-link">
      Don't have an account?
      <Link to="/register" className="signup-link link"> Sign up now</Link>
    </p>
  </div></div>
  )
}

export default ForgetPassword