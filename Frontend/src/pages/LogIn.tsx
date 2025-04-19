import React, { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import axios from 'axios'
import { UserDataContext } from '@/contexts/UserContext'
import { useNavigate } from 'react-router'

type InputFormSignIn = {
  email: string,
  password: string,
  acceptedTerms: boolean
}


const LogIn = () => {
  // useForm for form;
  const { register, handleSubmit, formState: { errors } } = useForm<InputFormSignIn>();

  const userContext = useContext(UserDataContext);
  const navigate = useNavigate();

  // handle on submit;
  const onSubmitHandle: SubmitHandler<InputFormSignIn> = async (information) => {
    // api todo
    try {
      

      const requestData = {
        email: information.email,
        password: information.password,
      }
      const baseURL = import.meta.env.baseURL;
      const response = await axios.post(
        `${baseURL}/api/v1/auth/login`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      const responseData = response.data;
      
      if (response.status === 200) {
        const {token, email, name, role, user_id, phone, address} = response.data;
        const userData = {token, email, name, role, user_id, phone, address};

        localStorage.setItem("auth-token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));

        userContext?.setUser(userData);
        
        // reset();
       
        navigate("/user/homepage");
      }
      else {
        alert(`Error: ${responseData.message}`)
      }



    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Registration failed!")
      }
      else {
        console.log(`error: ${error}`)
      }
    }
    // check on console form data
    
  }


  return (
    <div className='bg-green-400 w-full h-screen px-60 py-30'>


      <div className='bg-white grid grid-cols-2'>
        {/* section left */}
        <div className='mb-8'>
          {/* logo and brand title */}
          <div className='flex items-center space-x-1'>
            <div className='hover:cursor-pointer'>
              <img className='w-32 rounded-full' src="/images/courier logo.png" alt="logo icon" />
            </div>
            <div>
              <h1 className='font-medium text-2xl '>Self Courier</h1>
            </div>

          </div>
          {/* welcome note */}
          <div className='px-8 py-2 mt-8'>
            <h1 className='text-2xl font-bold mb-2 text-center '><span className='text-red-500'>Fast</span>, <span className='text-green-500'>Reliable</span>, and <span className='text-blue-500'>Hassle-Free</span> <br />Deliveries - Just <span className='text-orange-400'>a Click Away!</span></h1>
            <p className='text-xs  text-gray-400 text-center '>Sign in to book your deliveries with ease! <br />Track your parcels in real-time, enjoy secure and affordable shipping and experience seamless door-to-door service. Whether it's a small package or big shipment, we've got you covered</p>
          </div>

          {/* sign in form */}
          <div className='px-8 relative p-2'>
            {/* Form for Backend work */}
            <form
              onSubmit={handleSubmit(onSubmitHandle)}
              className='grid grid-cols-1 gap-3'
            >
              <div>
                <label className='px-2 font-medium text-sm' htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: "Please enter Email address" })}
                  required
                  className="w-full px-4 py-2 border border-white rounded-md  bg-slate-100 text-gray-700  focus:outline-none hover:cursor-pointer"
                  placeholder="Email Address"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>


              <div>
                <label
                  className='px-2 font-medium text-sm'
                  htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Please enter password",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      message: "Password must contain at least one letter, one number, and one special character"
                    }
                  })}
                  required
                  className="w-full px-4 py-2 border border-white rounded-md  bg-slate-100 text-gray-700  focus:outline-none hover:cursor-pointer"
                  placeholder="Password"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              {/* term and condition */}
              <div>
                <div className='flex items-center'>
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("acceptedTerms", { required: "You must agree to the terms and conditions" })}
                    className='w-4 h-4 hover:cursor-pointer'
                  />
                  <label className='text-blue-500 px-2 text-sm' htmlFor="terms">I agree to the terms and conditions</label>

                </div>
                {errors.acceptedTerms && <p className="text-red-500 text-sm">{errors.acceptedTerms.message}</p>}
              </div>

              {/* sign btn */}
              <div>
                <button type='submit' className='w-full bg-red-400 py-2 rounded-sm text-white'>Sign In</button>
              </div>
            </form>
          </div>



        </div>

        {/* section right */}
        <div
          className='relative bg-cover bg-center flex justify-center items-center'
          style={{ backgroundImage: "url('/images/sign in page right image.png')" }}
        >
          <div className="absolute inset-0 bg-black opacity-20" />


        </div>
      </div>

    </div>
  )
}

export default LogIn