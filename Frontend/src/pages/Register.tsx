import axios from 'axios'
import  { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { useNavigate } from 'react-router'
import { UserDataContext } from '@/contexts/UserContext'

interface InputFormRegister {
  name: string,
  email: string,
  password: string,
  phone: string,
  address: string
}



const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<InputFormRegister>()
  const [phone, setPhone] = useState<InputFormRegister["phone"]>("");

  const userContext = useContext(UserDataContext);
  // user => userContext.user
  // setUser => userContext.setUser
  const onHandleSubmit: SubmitHandler<InputFormRegister> = async (information) => {
    // api call
    try {
     

      const requestData = {
        name: information.name,
        email: information.email,
        password: information.password,
        phone,
        address: information.address
      };
      console.log('Register page',requestData);
      
      const response = await axios.post(
          "http://localhost:8080/api/v1/auth/register",
          requestData,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
      )

      const responseData = response.data;
      console.log("Register Response", response)
      console.log("Register Response", responseData)
      if(response.status === 201){
        const {token, email, name, role, phone, address} = response.data;
        const userData = {token, email, name, role, phone, address};

        localStorage.setItem("auth-token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));

        userContext?.setUser(userData);
        console.log("From Register context",userContext?.user);
        // reset();
        
        navigate("/user/homepage");
      }
      else{
        alert(`Error: ${responseData.message}`)
      }



    } catch (error:any) {
      if(axios.isAxiosError(error)){
        alert(error.response?.data?.message || "Registration failed!")
      }
      else{
        console.log(`error: ${error}`)
      }
      
    }
   
    // console data
    console.log(information)
  }

  // console.log(watch("email"))
  return (
    <div className='bg-gray-300 w-full h-screen px-60 py-30'>
      {/* form background */}
      <div className='bg-white mr-auto w-full py-3 px-40'>
        {/* title */}
        <div className='mt-5 mb-2'>
          <h1 className='font-bold text-2xl text-gray-900 text-center'>Register</h1>
        </div>

        {/* form component */}
        <div>
          {/* form for backend */}
          <form
            onSubmit={handleSubmit(onHandleSubmit)}
            className='grid grid-cols-1 gap-2'
          >
            {/* name */}
            <div>
              <label className='px-2 font-medium text-sm' htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Please enter Full name" })}
                required
                className="w-full px-4 py-2 border border-white rounded-md  bg-slate-100 text-gray-700  focus:outline-none hover:cursor-pointer"
                placeholder="Name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* email */}
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

            {/* password */}
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
            {/* name */}

            <div>
              <label className="px-2 font-medium text-sm" htmlFor="phone">
                Phone Number
              </label>
              <PhoneInput
                country={"bd"} // Default country set to Bangladesh (bd)
                value={phone}
                onChange={(phone) => setPhone(phone)}
                enableSearch={true} // Allows searching for countries
                countryCodeEditable={false} // Prevents users from editing the country code manually
                inputClass="!w-full !py-2 !pl-12 !pr-4 border border-gray-300 rounded-md bg-slate-100 text-gray-700 focus:outline-none"
                containerClass="w-full"
                buttonClass="bg-gray-200"
              />
            </div>

            {/* address */}

            <div>
              <label className='px-2 font-medium text-sm' htmlFor="address">Current address</label>
              <textarea
                // type="text"
                id="address"
                rows={4}
                {...register("address", { required: "Please enter your current address" })}
                required
                className="w-full px-4 py-2 border border-white rounded-md  bg-slate-100 text-gray-700  focus:outline-none hover:cursor-pointer"
                placeholder="Current Address"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
            {/* register btn */}
            <div className='mb-5'>
              <button type='submit' className='w-full bg-orange-400 py-2 rounded-sm text-black font-semibold'>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register