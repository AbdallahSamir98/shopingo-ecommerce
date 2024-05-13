import  { useState } from 'react';
 import { useFormik } from 'formik';
 import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [apiMessage, setApiMessage] = useState('') //store api error
  const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
         
          email: '',
          password:'',
        },
        validationSchema: Yup.object({
          
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().required('Required')
        }),
        onSubmit: async values => {
            try {
                setLoading(true);

                const response = await axios.post(
                  'https://ecommerce.routemisr.com/api/v1/auth/signin',
                  values
                );
        if (response.data.message === "success") {
          localStorage.setItem('userToken',response.data.token);
          localStorage.setItem('userName',response.data.user.name);
          

            navigate("/home");
          }else {
            setApiMessage(response.data.message)
         
          }
        
        
              } catch (error) {
                setApiMessage(error.response.data.message)
            }finally {
                setLoading(false);
              }
        },
      });
      return (
        <div className="container pt-3">
      <h4 className="mt-5 text-secondary">Login Form</h4>

<form onSubmit={formik.handleSubmit}>
         
    
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


<label htmlFor="password" className='my-2'>password </label>
          <input
          className="form-control "

            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="my-3 alert alert-danger" role="alert">{formik.errors.password}</div>
          ) : null}
    
    <div>
    <Link className='text-danger fw-medium my-3' to='/forgetPassword'>Forget Password ?</Link>
    </div>
  
  <button className="btn btn-success my-3" type="submit" disabled={loading}>
          {loading ?   <i className="fa-solid fa-spinner fa-spin-pulse"></i>
 : "Login"}
        </button>

        <span className='ms-3 '> Don't have an account yet ?  <Link className='text-danger border-bottom border-danger' to='/register'>Register here</Link> </span>
 

          {apiMessage && (
          <div className="mt-3 alert alert-danger" role="alert">
            {apiMessage}
          </div>
        )}
            </form>
        </div>
      
      );
}

export default Login