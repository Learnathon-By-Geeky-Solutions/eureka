import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//  location
const interCityLocations = ["Dhaka", "Chittagong"];
const intraCity: { [key: string]: string[] } = {
   Dhaka: ["Motijheel", "Gulshan", "Kamalapur", "Dhaka Airport", "Dhaka Cantonment",
      "Gandaria", "Tejgaon", "Banani", "Hemayetpur", "Teghoria", "Saidabad", "Gabtoli", "Mohakhali", "Farmgate"],
   Chittagong: [
      // add other intra locations
      "Hathazari"
   ]
}




const HeroSection = () => {
   const [pickUpLocation, setPickUpLocation] = useState<string>("");
   const [dropOutLocation, setDropOutLocation] = useState<string>("");
   const [availableDropLocation, setAvailableDropLocation] = useState<string[] | undefined>();
   const [deliveryDate, setDeliveryDate] = useState<Date | null>()


   // handle pickup location
   const handlePickUpLocation = (value: string) => {
      console.log(value)
      setPickUpLocation(value);
      setDropOutLocation("");

      // inter check
      if (interCityLocations.includes(value)) {
         setAvailableDropLocation([
            ...(intraCity[value] || []),
            ...interCityLocations.filter((location) => location != value)
         ])
      }
      else {
         for (const city in intraCity) {
            if (intraCity[city].includes(value)) {
               setAvailableDropLocation(intraCity[city].filter((loc) => loc != value))
               break;
            }
         }
      }
   }




   return (
      <div className=' flex flex-col  max-h-screen border-b-[1px] border-gray-200'>
         <div className='h-[600px]  bg-[#F2F1F0] px-8 grid grid-cols-1  w-full lg:grid-cols-2 lg:px-20'>
            <div className='relative'>
               {/* title  */}
               <div className='mt-32 mb-8 '>
                  <h1 className=' text-4xl font-bold text-[#313131]'>Streamline Your <br />Deliveries  with Ease</h1>
               </div>
               {/* subtitle */}
               <div>
                  <p className='w-3/4 text-[#909090]'>From pickup to delivery, we ensure your packages reach their destination securely and on time. Experience seamless logistics with our user-friendly platform.</p>
               </div>
               <div className='mt-10'>
                  <button className='border rounded-full px-6 py-2 hover:bg-blue-500 hover:text-white'>Get Started</button>
               </div>

               {/* search track */}
               <div className='absolute flex space-x-2 px-6 py-2 bg-white rounded-full mt-20 z-20'>
                  {/* pickup location and dropout location */}
                  <div className='flex'>
                     {/* pick up location */}
                     <div className='px-5 py-2'>
                        <div>
                           <h1>Pickup Location</h1>
                        </div>
                        <div className='flex items-center space-x-2  '>
                           {/* location icon */}
                           <img src="/images/map-pin-line.png" alt="pick up icon" className='w-4 h-4 ' />
                           <select
                              name=""
                              // value=
                              id="pickup"
                              value={pickUpLocation}
                              onChange={(e) => handlePickUpLocation(e.target.value)}
                              className='outline-none text-gray-500  max-h-svh  overflow-auto'
                           //   size={1}
                           >

                              <option value="" className='text-xs'>Your location</option>
                              <optgroup label='Intercity' className='text-xs'>
                                 {interCityLocations.map((location) => (
                                    <option key={location} value={location} className='text-xs'>{location}</option>
                                 ))}
                              </optgroup>


                              {
                                 Object.keys(intraCity).map((city) => (
                                    <optgroup key={city} className='text-xs' label={`${city} Intra-city`}>
                                       {intraCity[city].map((location) => (
                                          <option value={location} key={location} className='text-xs'>{location}</option>
                                       ))}
                                    </optgroup>
                                 ))
                              }


                           </select>
                        </div>
                     </div>
                     {/* drop location */}
                     <div className='px-5 py-2'>
                        <div>
                           <h1>Drop Location</h1>
                        </div>
                        <div className='flex items-center space-x-2  '>
                           {/* location icon */}
                           <img src="/images/map-pin-fill.png" alt="pick up icon" className='w-4 h-4 ' />
                           <select
                              name="droplocation"
                              // value=
                              id="drop"
                              value={dropOutLocation}
                              onChange={(e) => setDropOutLocation(e.target.value)}
                              className='outline-none text-gray-500   overflow-auto'
                              disabled={!pickUpLocation}
                           >
                              <option value="" className='text-xs'>Your Drop location</option>
                              {
                                 availableDropLocation?.length &&
                                 <optgroup label='Drop location' className='text-xs'>
                                    {
                                       availableDropLocation.map((location) => (<option key={location} value={location} className='text-xs'>{location}</option>))
                                    }
                                 </optgroup>
                              }

                           </select>
                        </div>
                     </div>
                  </div>

                  <div className='flex items-center'>
                     <div className='h-10 w-0.5 bg-black'></div>
                  </div>
                  {/* date  */}
                  <div className='px-5 py-2'>
                     <div>
                        <h1>Delivery Date</h1>
                     </div>
                     <div className='flex items-center bg-gray-100'>
                        <img className='w-4 h-4' src="/images/calendar-event-fill.png" alt="" />
                        <DatePicker
                           selected={deliveryDate}
                           onChange={(date) => setDeliveryDate(date)}
                           minDate={new Date()}
                           dateFormat={"dd/MM/YYYY"}
                           placeholderText='Pick a date'

                           className='px-2  outline-none' />
                     </div>

                  </div>

                  <div className='flex items-center'>
                     <button className='border rounded-full px-12 py-2 bg-[#6ED4D4] text-white'>Search</button>
                  </div>
               </div>
            </div>
            <div className='relative  '>
               {/* orange color */}
               <div className='absolute bg-[#F5993C] h-[400px] w-[500px] right-0 mt-32 rounded-[56px] rounded-bl-[400px] z-0' />
               <div className='absolute z-10 mt-12 right-0'>
                  <img className='w-[700px] h-[600px] object-cover' src="/images/hero section right image_processed.png" alt="" />
               </div>


            </div>
         </div>

         {/* todo maybe brand image or logo */}
         <div className='px-32 py-10 flex gap-5 justify-around text-2xl text-gray-500'>
            {/* <div className="flex  space-x-10"> */}
            {["Dhaka", "Chittagong", "Motijheel", "Gulshan", "Tejgaon", "Gabtoli"].map((location) => (
               <span key={location} className=" text-gray-600">
                  {location}
               </span>
            ))}
            {/* </div> */}

         </div>



      </div>
   )
}

export default HeroSection