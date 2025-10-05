import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slide1 from '../../../assets/heroSlide1.png'
import slide2 from '../../../assets/heroSlide2.png'
import heroImg from '../../../assets/heroSlide3.jpg'



const HeroSlider = () => {
    const images = [
        {
            img: slide1,
            span: "Best Seller",

        },
        {
            img: heroImg,
            span: "Best Seller",
            title: "THEORY: Is Alien Real"
        },
        {
            img: slide2,
            span: "Best Seller",

        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
             {
                // for tab size responsive slider
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
        ]

    };

    return (
        <div>
            <div className='hidden w-full md:flex lg:w-[600px] mt-10 lg:mt-0'>
                <Slider {...settings} className='w-full'>
                    {images.map((image, index) => (
                        <div key={index} className='p-2'>
                            {/* Add padding to space out slides */}
                            <div className='relative flex flex-col justify-center items-center h-[400px] rounded-lg overflow-hidden' style={{ backgroundImage: `url(${image.img})`,backgroundSize:"cover", backgroundPosition:"center" }}>
                                {/* <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80'></div> */}
                                <span className='absolute top-4 left-0 bg-orange-500 text-white font-bold rounded-r-lg px-4 py-2 text-sm z-20'>{image.span}</span>
                                <div className='absolute bottom-4 left-4 text-white z-20'>
                                    <h3 className='font-bold text-xl'>{image.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default HeroSlider
