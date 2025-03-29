import React from 'react';

const Banner: React.FC = () => {
  return (
    <header className="relative pt-20 pb-12 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">2023 Alumni Day</h1>
        <p className="text-xl mb-6">Welcome to University of Dundee Alumni Chapter, Nigeria</p>
        <p className="max-w-2xl mx-auto mb-8">
          Connect with fellow University of Dundee alumni in Nigeria. Join our exclusive events and professional networking opportunities.
        </p>
        <a 
          href="#" 
          className="bg-white text-purple-700 hover:bg-purple-100 px-6 py-3 rounded-full font-semibold transition duration-300"
        >
          Join Community
        </a>
      </div>
    </header>
  );
};

export default Banner;