import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LogoBar from '../components/LogoBar';
import Solution from '../components/Solution';
import Steps from '../components/Steps';
import Differential from '../components/Differential';
import Pricing from '../components/Pricing';
import Faq from '../components/Faq';
import Cta from '../components/Cta';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Solution />
        <Steps />
        <Differential />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
