import React from 'react'

const KeyFeatures = () => {
    return (
        <div className='px-20 py-8'>
            <div className='flex space-x-12 items-center mt-2'>
                <div className='bg-[#B9FF66] p-1'>
                    <h1 className='text-[1.5vw] font-semibold text-gray-900'>Services – Fast & Reliable Deliveries</h1>
                </div>
                <div className='w-fit'>
                    <p className='w-2/3   text-sm '>We deliver packages of all sizes, ensuring safety and speed.</p>
                </div>

            </div>
            {/* service cards */}
            <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 '>
                {/* Local delivery card */}
                <div className='px-8 py-4 flex items-center h-[310px] rounded-[45px] border border-b-4 gap-4 bg-[#F3F3F3] hover:bg-[#e8dede]'>
                    <div className=' flex w-full  items-center justify-between mt-5'>
                        <div className='w-1/2' >
                            <div className='mb-20'>
                                <h1 className='text-3xl p-1 cursor-pointer'> Local Delivery <br />Intracity</h1>
                            </div>
                            <div className='flex items-center space-x-2 mt-2'>
                                <img className='w-6 h-6 p-1 bg-black rounded-full' src="/images/arrow-right-up-line (1).png" alt="" />
                                <h1 className='text-lg'>Learn More</h1>
                            </div>
                        </div>
                        <div>
                            <img className='w-48 h-48  rounded-full' src="/images/same-day-delivery-products-icon-label-design-vector.jpg" alt="" />
                        </div>


                    </div>
                </div>
                {/* same day */}
                {/* same day  */}
                <div className='px-8 py-4 flex items-center h-[310px] rounded-[45px] text-white border border-b-4 gap-4 bg-[#0b0b0a] hover:bg-[#1d1d1d]'>
                    <div className=' flex w-full  items-center justify-between mt-5'>
                        <div className='w-1/2' >
                            <div className='mb-18'>
                                <h1 className='text-3xl p-1'>Same-day or <br /> next-day delivery</h1>
                                {/* <div className='flex items-center'>
                                     <img className='w-8 h-8' src="/images/rss-line.png" alt="" /> 
                                     <p className='p-2 text-md text-gray-500'>Fast shipping between <br />Dhaka and Chittagong.</p>
                                </div> */}


                            </div>
                            <div className='flex items-center space-x-2 mt-1'>
                                <img className='w-6 h-6 p-1 bg-white rounded-full' src="/images/arrow-right-up-line-dark.png" alt="" />
                                <h1 className='text-lg'>Learn More</h1>
                            </div>
                        </div>
                        <div className='flex items-center space-x-1'>
                            {/* <img className='w-48 h-48 rounded-full' src="/images/earn with bike2.png" alt="" /> */}
                            <img className='w-24 h-24 rounded-lg bg-white p-1' src="/images/same day 2.png" alt="" />
                            <img className='w-24 h-24 rounded-lg bg-white p-1' src="/images/parcel image.jpg" alt="" />
                        </div>


                    </div>
                </div>



                {/* earn with bus truck */}
                <div className='px-8 py-4 flex items-center h-[310px] rounded-[45px] text-white border  border-b-4 gap-4 bg-[#0b0b0a] hover:bg-[#1d1d1d]'>
                    <div className=' flex w-full  items-center justify-between mt-5'>
                        <div className='w-1/2' >
                            <div className='mb-20'>
                                <h1 className='text-3xl p-1'> Earn with your</h1>
                                {/* <div className='flex items-center'>
                                     <img className='w-8 h-8' src="/images/rss-line.png" alt="" /> 
                                     <p className='p-2 text-md text-gray-500'>Fast shipping between <br />Dhaka and Chittagong.</p>
                                </div> */}


                            </div>
                            <div className='flex items-center space-x-2 mt-2'>
                                <img className='w-6 h-6 p-1 bg-white rounded-full' src="/images/arrow-right-up-line-dark.png" alt="" />
                                <h1 className='text-lg'>Learn More</h1>
                            </div>
                        </div>
                        <div className='flex items-center space-x-1'>
                            {/* <img className='w-48 h-48 rounded-full' src="/images/earn with bike2.png" alt="" /> */}
                            <img className='w-24 h-24 rounded-full' src="/images/earn with truck.png" alt="" />
                            <img className='w-24 h-24 rounded-full' src="/images/earn with vans.png" alt="" />
                        </div>


                    </div>
                </div>


                <div className='px-8 py-4 flex items-center h-[310px] rounded-[45px] border border-b-4 gap-4 bg-[#B9FF66] hover:bg-[#c5f090]'>
                    <div className=' flex w-full  items-center justify-between mt-5'>
                        <div className='w-1/2' >
                            <div className='mb-20'>
                                <h1 className='text-3xl p-1'> Intercity Delivery</h1>
                                {/* <div className='flex items-center'>
                                     <img className='w-8 h-8' src="/images/rss-line.png" alt="" /> 
                                     <p className='p-2 text-md text-gray-500'>Fast shipping between <br />Dhaka and Chittagong.</p>
                                </div> */}


                            </div>
                            <div className='flex items-center space-x-2 mt-2'>
                                <img className='w-6 h-6 p-1 bg-black rounded-full' src="/images/arrow-right-up-line (1).png" alt="" />
                                <h1 className='text-lg'>Learn More</h1>
                            </div>
                        </div>
                        <div>
                            <img className='w-48 h-48  rounded-full' src="/images/serviceIntercity.jpg" alt="" />
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default KeyFeatures