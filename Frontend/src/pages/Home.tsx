import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import KeyFeatures from '../components/KeyFeatures'
import WorkingProcess from '@/components/WorkingProcess'
import WhyUs from '@/components/WhyUs'
// import NavbarWithRes from '../components/NavbarWithRes'

const Home = () => {
  return (
    <main >
      <header>
        <Navbar/>
        {/* <NavbarWithRes/> */}
      </header>
      <section>
        <HeroSection/>
        <KeyFeatures/>
        <WhyUs/>
        <WorkingProcess/>
      </section>
      
    </main>
  )
}

export default Home