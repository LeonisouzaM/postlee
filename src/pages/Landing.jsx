import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LogoBar from '../components/LogoBar';
import Solution from '../components/Solution';
import Steps from '../components/Steps';
import TemplateShowcase from '../components/TemplateShowcase';
import InteractiveDemo from '../components/InteractiveDemo';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Cta from '../components/Cta';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-indigo-100 selection:text-[#5c54ed]">
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Solution />
        <Steps />
        <TemplateShowcase />
        <InteractiveDemo />
        <Testimonials />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
