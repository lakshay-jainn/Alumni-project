import React from 'react';
import Banner from './components/Banner';
import AlumniCarousel from './components/Crousel';
import Footer from './components/Footer';
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <AlumniCarousel/>
      <Footer/>
    </div>
  );
};

export default HomePage;