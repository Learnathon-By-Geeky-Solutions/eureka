import React, { useState } from 'react'

import { motion } from "framer-motion"
import { div } from 'framer-motion/client';

const contants = [
    {
        icon: "⚡",
        title: "Fast and Reliable",
        description: "On-time and secure parcel deliveries with real-time tracking.",
        image: "/images/Fast and reliable.jpg"
    },
    {
        icon: "📍",
        title: "Wide Coverage",
        description: "We deliver within Dhaka & Chittagong, expanding to more locations soon.",
        image: "/images/Fast and reliable.jpg"
    },
    {
        icon: "💰",
        title: "Affordable Pricing",
        description: "Enjoy competitive rates with no hidden charges, perfect for businesses & individuals.",
        image: "/images/Fast and reliable.jpg"
    },
    {
        icon: "📦",
        title: "Secure & Safe Handling",
        description: "Every package is handled with care to ensure it reaches safely.",
        image: "/images/Fast and reliable.jpg"
    },
    {
        icon: "📲",
        title: "Easy Booking & Tracking",
        description:
            "Our platform lets you book and track deliveries effortlessly in real time.",
        image: "/images/Fast and reliable.jpg"
    },
    {
        icon: "🤝",
        title: "Business & Bulk Support",
        description:
            "Custom delivery solutions with special discounts for bulk shipments.",
        image: "/images/Fast and reliable.jpg"
    }
]


const WhyUs = () => {
    const [titleHover, setTitleHover] = useState<Number | null>();
    return (
        <div className='px-20 py-16 bg-gray-100  w-full'>
            <div >
                <h1 className='text-center text-[30px] font-semibold text-gray-950'>Why Choose Us<span className='text-red-600'>?</span></h1>
            </div>
            {/* text hover after a emoji , image and text popup */}
            {/* motion.div */}
            <div className='grid md:grid-cols-3 gap-6 mt-8'>
                {/* text */}
                {
                    contants.map((contant, i) => (
                        <div
                            key={i}
                            className='relative p-6 bg-white shadow-lg rounded-2xl hover:bg-slate-100 cursor-pointer transition duration-300'
                            onMouseEnter={() => setTitleHover(i)}
                            onMouseLeave={() => setTitleHover(null)}
                        >
                            <span className='flex items-center justify-center'>{contant.icon}</span>
                            <h1 className='text-lg font-semibold mt-2 text-center'>{contant.title} </h1>

                            {
                                i === titleHover && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.3 }}
                                        className='absolute top-0  flex bg-white left-1/2  transform -translate-x-1/2 w-60 p-4 shadow-lg rounded-lg mt-3 z-10'

                                    >
                                        <img className='w-full h-20 object-cover rounded-md' src={contant.image} alt="" />
                                        <p className='text-sm text-gray-600 mt-2 text-right'>{contant.description}</p>
                                    </motion.div>

                                )
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default WhyUs