import React from 'react';
import ParticleCanvas from '@/components/ParticleCanvas';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhySection from '@/components/sections/WhySection';
import Testimonials from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/FooterSection'
import FooterSection from '@/components/sections/FooterSection';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#09090b] text-white overflow-x-hidden">
      <ParticleCanvas />
      <Navbar />
      <main className="relative" style={{ zIndex: 2 }}>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ServicesSection />
        <WhySection />
        <Testimonials/>
        <ContactSection/>
        <FooterSection/>
      </main>
    </div>
  );
}