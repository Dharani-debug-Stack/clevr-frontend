import HeroContent from './HeroContent';
import HeroSlider from './HeroSlider';

//  import slide books image

const HeroSection = () => {
 
  return (
    <div className='relative  z-10 min-h-screen w-full bg-[#3B1E78] overflow-hidden flex items-center justify-center p-4 md:p-8'>
      {/* Background circles */}
      <div className="absolute w-96 h-96 rounded-full bg-[#6A3AB2] bottom-[-150px] left-[-150px] opacity-70 "></div>
      <div className="absolute w-48 h-48 rounded-full bg-[#6A3AB2] top-[-50px] right-[-50px] opacity-70"></div>
      
      <div className='max-w-7xl mx-auto flex  items-center justify-center md:justify-between z-10'>
        {/* Left Section */}
        <HeroContent />

        {/* Right Section - Slider */}
        <HeroSlider/>
      </div>
    </div>
  );
};

export default HeroSection;