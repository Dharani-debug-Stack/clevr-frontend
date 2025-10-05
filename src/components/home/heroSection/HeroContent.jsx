import React from 'react'
import { FaArrowCircleRight } from 'react-icons/fa';
import { BiBookAlt } from 'react-icons/bi';
import { HiOutlineUsers } from 'react-icons/hi';
import { Link } from 'react-router';
const HeroContent = () => {
  return (
    <div>
         <div className='flex flex-col mt-20 gap-6 text-white w-full md:w-1/2'>
      <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl '>
        Welcome to Clevr Online Book Store
      </h1>
      <p className='text-gray-300 md:text-lg'>
        Clevr book store is your one-stop destination for a vast collection of books across various genres. Whether you're a fiction enthusiast, a non-fiction lover, or someone looking for educational resources, we have something for everyone. Explore our extensive catalog and discover your next favorite read today!
       </p>

      <div className='flex  justify-center  gap-8 mt-4'>
        <div className='flex items-center gap-2'>
          <BiBookAlt className='text-pink-500 text-2xl' />
          <span className='font-semibold text-xl'>
            68+k <br /> <span className='text-gray-400 text-sm'>Book Collections</span>
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <HiOutlineUsers className='text-pink-500 text-2xl' />
          <span className='font-semibold text-xl'>
            25,634 <br /> <span className='text-gray-400 text-sm'>Customers</span>
          </span>
        </div>
      </div>

   <Link to={"/collection"}>   <button className='flex items-center justify-center gap-3 w-fit mx-auto lg:mx-0 transition duration-300 hover:bg-pink-700 bg-pink-600 px-10 py-3 rounded-md mt-6'>
        Go to collections <FaArrowCircleRight />
      </button></Link>
    </div>
      
    </div>
  )
}

export default HeroContent
