
import Navbar from "../components/home/Navbar/Navbar"
import HeroSection from '../components/home/heroSection/HeroSection'
import FeatureBook from "../components/home/featureBook/FeatureBook"
import Services from "../components/home/services/Services"
import BestSeller from "../components/home/bestSeller/BestSeller"
import Collections from "../components/home/collections/Collections"
import Testtinomials from "../components/home/testinomials/Testimonials"
import Footer from "../components/home/footer/Footer"
import Chatbot from "../components/Chatbot"



const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <div id="book">
        <FeatureBook />
      </div>
      <div id="about">
        <Services />
      </div>
      <div id="seller">
        <BestSeller />
      </div>
      <Collections />
      <Testtinomials />
      <Footer />

      {/* 🧠 Clevr Chatbot */}
      <Chatbot />
    </div>
  )
}

export default Home
