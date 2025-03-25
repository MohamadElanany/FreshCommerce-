import React, { useContext, useState } from 'react';
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';


export default function Register() {
  
  let {userLogin , setUserLogin} = useContext(UserContext);

  let navigate = useNavigate();

  let [ApiError, setApiError] = useState("");
  let [isLoading, setisLoading] = useState(false);

  function handleRegister(values){
    setisLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
    .then((res) => {
      setisLoading(false);
      if(res.data.message == "success"){
        localStorage.setItem("userToken", res.data.token);
        setUserLogin(res.data.token);
        navigate("/");
      }
    })
    .catch((res) => {
      setisLoading(false);
      setApiError(res.response.data.message);
    })
  }

  let myValidation = yup.object().shape({
    name: yup.string().min(3, "min lenght is 3").max(10, "max lenght is 10").required("name is required"),
    email: yup.string().email("invalid email").required("email is required"),
    password: yup.string().required("Password is required").min(6, "password min lenght is 6"),
    rePassword: yup.string().required("rePassword is required").oneOf([yup.ref("password")], "not mathed with password"),
    phone: yup.string().required("phone number is required").matches(/^01[1025][0-9]{8}$/, "phone number is not valid"),
  });


  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: myValidation,
    onSubmit: handleRegister,
  })



  return (
    <>

      {ApiError ? <div className='w-1/2 mx-auto p-4 mb-10 mt-1 text-sm text-red-800 rounded-lg bg-red-100'> {ApiError} </div> : null}

      <h2 className='font-bold text-2xl text-center my-4 text-emerald-700'>
        Create account
      </h2>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id="Name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="Name" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
          {formik.errors.name && formik.touched.name ? <div className="p-2 mb-4 mt-1 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
            <span className="font-medium">{formik.errors.name}</span>
          </div> : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="Email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="Email" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
          {formik.errors.email && formik.touched.email ? <div className="p-2 mb-4 mt-1 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
            <span className="font-medium">{formik.errors.email}</span>
          </div> : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="Password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="Password" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
          {formik.errors.password && formik.touched.password ? <div className="p-2 mb-4 mt-1 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
            <span className="font-medium">{formik.errors.password}</span>
          </div> : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="RePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="RePassword" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Repassword</label>
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-2 mb-4 mt-1 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
            <span className="font-medium">{formik.errors.rePassword}</span>
          </div> : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="Phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="Phone" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
          {formik.errors.phone  && formik.touched.phone? <div className="p-2 mb-4 mt-1 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
            <span className="font-medium">{formik.errors.phone}</span>
          </div> : null}
        </div>
        
        <div className="text-center">
          <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5">
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
          </button>
        </div>
      </form>

      <div className='my-5 text-center'>
        <span>Already have an account? <Link to={"/login"} className='text-blue-600 hover:underline'>Log in</Link></span>
      </div>
    </>
  )
}
