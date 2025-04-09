import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HomeSection from "../components/HeroSection";
import About from "../components/About";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import JoinCTA from "../components/JoinCTA";


export default function Home() {
  return (
    <>
    <Navbar/>
    <HomeSection/>
    <About/>
    <Features/>
    <Testimonials/>
    <JoinCTA signupUrl="#"/>

    <Footer/>
    </>
  )
}
