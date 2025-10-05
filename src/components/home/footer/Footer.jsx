import React from 'react';

import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import logo from '../../../assets/logo.jpg'

const Footer = () => {
  const icons=[{ icon:<FaFacebookF/>},{icon:<FaTwitter/>},{icon:<FaYoutube/>},{icon:<FaLinkedinIn/>} ,{icon:<FaInstagram/>}]
  const quickLinks=['About Us','Contact Us','Products','Login','Sign up']
  const CustomerArea=['My Account','Orders','Tracking Cards','Services','FAQ']
  return (
    <div>
    {/* footer website logo paragraph */}
    <div className=' md:flex w-full flex-flex-col justify-between items-center gap-20  bg-gray-100'>
      <div className='space-y-3 flex-wrap'>
        <div className='flex items-center '>
      <img src={logo} alt="Clevr logo" className='w-20' />
      <h2 className='font-bold text-4xl'>Clevr</h2></div>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint consequuntur ullam excepturi fugit rem quis, autem iure dolores dicta quidem!</p>
      {/* icons for social media  */}
      <h2 className='mt-5 text-2xl font-bold'>Follow Us</h2>
      <div className='flex gap-5'>
        {icons.map((item,idx)=>
        (
          <a key={idx} className='text-purple-300 rounded-full hover:bg-purple-500 p-4 text-text-purple-500 hover:text-white'>{item.icon}</a>
        ))} </div>
    </div>
    {/* quick links */}

    <div>
      <h2 className='font-bold text-xl mb-3'>Quick Links</h2>
       {quickLinks.map((item,idx)=>(
        <ul  key={idx}>
           <li className='mb-3'>{item}</li>
           </ul>
      ))}
    </div>
    {/* customer area */}
    <div>
      <h2 className='font-bold text-xl mb-3'>Customer Area</h2>
       {CustomerArea.map((item,idx)=>(
        <ul  key={idx}>
           <li className='mb-3'>{item}</li>
           </ul>
      ))}
    </div>
    {/* news letter */}
    <div className='space-y-4 flex-wrap'>
      <h2 className='font-bold text-2xl '>Dont't miss the newest books</h2>
      <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nam esse. Voluptatum temporibus, eos natus minima culpa tempore iste similique?</p>
     <div className="flex flex-wrap"> <input className='p-3 bg-gray-200 rounded' type="mail" placeholder='Type your email here' /> <button className='bg-purple-600 p-3 rounded text-white'>Subscribe</button></div>
    </div>
    </div>

     <div className='bg-purple-950 text-white p-5 flex justify-between items-center'>
      <h2>Clevr-@2025 All Rights  Reserved</h2>
      <h2>Made with ❤️ by Dharz</h2>
    </div>
    </div>
  )
}

export default Footer
