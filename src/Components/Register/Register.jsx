



import  { useState } from 'react';
 import { useFormik } from 'formik';
 import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const [apiMessage, setApiMessage] = useState('') //store api error
  const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
         name:'',
          email: '',
          password:'',
          rePassword:'',
          phone:'',
        },
        validationSchema: Yup.object({
            name: Yup.string()
            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
            .min(3, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),

          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string(). min(3, "Too Short!")
          .max(50, "Too Long!").required('Required'),
          rePassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required'),
          phone: Yup.string()
          .min(11, "Phone Must Be 11 number")
          .max(11, "Phone Must Be 11 number")
          .required("required")
        }),
        onSubmit: async values => {
            try {
                setLoading(true);

                const response = await axios.post(
                  'https://ecommerce.routemisr.com/api/v1/auth/signup',
                  values
                );
        if (response.data.message === "success") {

            navigate("/login");
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
      <h4 className="mt-5 text-secondary">Registration  Form</h4>

<form onSubmit={formik.handleSubmit}>
         
<label htmlFor="name" className='my-2'>Name </label>
          <input
          className="form-control "

            id="name"
            name="name"
            type="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="mt-3 alert alert-danger" role="alert">{formik.errors.name}</div>
          ) : null}


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
            <div className="mt-3 alert alert-danger" role="alert">{formik.errors.password}</div>
          ) : null}


<label htmlFor="rePassword" className='my-2'>Re-Password </label>
          <input
          className="form-control "

            id="rePassword"
            name="rePassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="mt-3 alert alert-danger" role="alert">{formik.errors.rePassword}</div>
          ) : null}


<label htmlFor="phone" className='my-2'>phone Number </label>
          <input
          className="form-control "

            id="phone"
            name="phone"
            type="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="mt-3 alert alert-danger" role="alert">{formik.errors.phone}</div>
          ) : null}


    
    <button className="btn btn-success my-3" type="submit" disabled={loading}>
          {loading ?   <i className="fa-solid fa-spinner fa-spin-pulse"></i>
 : "Sign up"}
        </button>

        <span className='ms-3'>you already have an account  ?  <Link className='text-danger border-bottom border-danger' to='/login'>login here</Link> </span>

               

          {apiMessage && (
          <div className="mt-3 alert alert-danger" role="alert">
            {apiMessage}
          </div>
        )}
            </form>
        </div>
      
      );
}

export default Register