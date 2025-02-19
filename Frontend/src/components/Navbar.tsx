import React, { useEffect, useRef, useState } from 'react'





const Navbar = () => {
    const [openDropDown, setOpenDropDown] = useState<string | null>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const handleMouseHover = (menu:string)=> setOpenDropDown(menu)
    const handleMouseHoverRemove = ()=> setOpenDropDown(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropDown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

  return (
    <nav className='px-20 py-2 shadow-md flex' ref={dropdownRef}>
        {/* logo */}
        <div className='flex items-center space-x-1'>
            <div className='hover:cursor-pointer'>
                <img className='w-20 rounded-full' src="/images/courier logo.png" alt="logo icon" />
            </div>
            <div>
                <h1 className='font-medium '>Self Courier</h1>
            </div>
            
        </div>
        {/* nav items */}
        <ul className='ml-5 flex space-x-2 items-center'>
            {/* Home */}
            <li><a href="">Home</a></li>

            {/* services */}
            <li
                className='relative flex items-center'
                onMouseEnter={() => handleMouseHover("services")}
                // onMouseLeave={handleMouseHoverRemove}
            >
                <div><a href="">Services</a></div> 
                <div> <img src="/images/arrow-down-s-line.png" alt="" /></div>
                {
                    openDropDown === "services" && 
                    <div className='absolute top-12 bg-white shadow-md p-1 grid grid-cols-2 w-96 item-center hover:cursor-pointer'
                    onMouseEnter={() => handleMouseHover("services")}
                    onMouseLeave={handleMouseHoverRemove}
                    >
                        <div className='flex p-3 border-2 border-white hover:border-gray-200 hover:scale-95 item-center space-x-2  max-w-fit'>
                            <div>
                                <img className='w-8 border-1' src="/images/parcel image.jpg" alt="" />
                            </div>
                            <div>
                                <h1 className='font-medium'>Parcel Delivery</h1>
                                <p className='text-gray-400 text-xs'>Easy Parcel</p>
                            </div>
                           
                        </div>
                        <div className='flex p-3 border-2 border-white hover:border-gray-200 hover:scale-95 item-center space-x-2  max-w-fit'>
                            <div>
                                <img className='w-8 border-1' src="/images/same day 2.png" alt="" />
                            </div>
                            <div>
                                 <h1 className='font-medium'>Same-Day</h1>
                                <p className='text-gray-400 text-xs'>Delivery in same day</p>
                            </div>
                           
                        </div>

                    </div>
                }
                
            </li>

            {/* Earn with */}
            <li
                className='relative flex items-center'
                onMouseEnter={() => handleMouseHover("EarnWith")}
                // onMouseLeave={handleMouseHoverRemove}
            >
                <div><a href="">Earn with</a></div> 
                <div> <img src="/images/arrow-down-s-line.png" alt="" /></div>
                {
                    openDropDown === "EarnWith" && 
                    <div className='absolute top-12 p-1 grid grid-cols-1 grid-gap-2 w-56 item-center bg-white hover:shadow-md hover:cursor-pointer'
                    onMouseEnter={() => handleMouseHover("EarnWith")}
                    onMouseLeave={handleMouseHoverRemove}
                    >
                        <div className='flex p-3 border-2 border-white hover:border-gray-200 hover:scale-95 item-center space-x-2  max-w-fit'>
                            <div>
                                <img className='w-12 h-12 border-1' src="/images/earn with bike2.png" alt="" />
                            </div>
                            <div>
                                <h1 className='font-medium'>Delivery with bike</h1>
                                <p className='text-red-400 font-medium text-xs'>
                                    Fast & Flexible 
                                </p>
                                <p className='text-yellow-400 text-xs'>
                                Low Fuel Cost
                                </p>
                            </div>
                           
                        </div>
                        <div className='flex p-3 border-2 border-white hover:border-gray-200 hover:scale-95 item-center space-x-2  max-w-fit'>
                            <div>
                                <img className='w-12 h-12 border-1' src="/images/earn with truck.png" alt="" />
                            </div>
                            <div>
                                <h1 className='font-medium'>Delivery with truck</h1>
                                <p className='text-red-400 font-medium text-xs'>
                                Heavy Load, High Pay 
                                </p>
                                <p className='text-yellow-400 text-xs'>
                                Business Contracts
                                </p>
                            </div>
                           
                        </div>

                        <div className='flex p-3 border-2 border-white hover:border-gray-200 hover:scale-95 item-center space-x-2  max-w-fit'>
                            <div>
                                <img className='w-12 h-12 border-1' src="/images/earn with vans.png" alt="" />
                            </div>
                            <div>
                                <h1 className='font-medium'>Delivery with van</h1>
                                <p className='text-red-400 font-medium text-xs'>
                                More Packages, More Money 
                                </p>
                                <p className='text-yellow-400 text-xs'>
                                Short & Long Routes
                                </p>
                            </div>
                           
                        </div>
                        

                    </div>
                }
                
            </li>


            
            <li><a href="">Help</a></li>
        </ul>
        
        <div className='flex items-center space-x-1 ml-auto relative'>
            <div><img className='w-4' src="/images/global-line.png" alt="" /></div>
            <div className='hover:text-red-500 flex items-center'
                onMouseEnter={()=>handleMouseHover("languages")}
            
            >
                <div>ENG</div>
                <div><img className='w-4' src="/images/arrow-down-s-line.png" alt="" /></div>

                {
                    openDropDown === 'languages' && 
                    <div
                         onMouseEnter={()=>handleMouseHover("languages")}
                         onMouseLeave={handleMouseHoverRemove}
                    className='absolute top-12 p-2 bg-white shadow-md text-black hover:cursor-pointer'>
                        <h1>English</h1>
                        <h1>বাংলা</h1>
                    </div>
                }
            </div>
            
        </div>

        {/* sign in / register btn */}
        <div className=' ml-auto space-x-4 flex items-center'>
            <a className='px-6 py-2 bg-blue-500 text-white rounded-md shadow-xs' href="">Log in</a>
            <a className='px-6 py-2 bg-red-500 text-white rounded-md shadow-xs' href="">Register</a>
        </div>
    </nav>
  )
}

export default Navbar