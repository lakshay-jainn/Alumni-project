import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Copyright 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-600 to-gray-700 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-10">
          {/* About Column */}
          <div className="transform hover:translate-y-[-5px] transition-transform duration-300">
            <h3 className="text-xl font-bold mb-5 border-b border-gray-500 pb-2 inline-block">About Us</h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              Established in 1948, Hansraj College, University of Delhi, is one of India's most prestigious institutions, known for its academic excellence, vibrant campus life, and commitment to holistic development. It has a legacy of producing global leaders and innovators while inspiring generations through education and social responsibility.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="transform hover:translate-y-[-5px] transition-transform duration-300">
            <h3 className="text-xl font-bold mb-5 border-b border-gray-500 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-gray-300 flex items-center transition-colors duration-200 group">
                  <span className="w-0 h-0.5 bg-gray-300 group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="https://www.hansrajcollege.ac.in/events" className="hover:text-gray-300 flex items-center transition-colors duration-200 group">
                  <span className="w-0 h-0.5 bg-gray-300 group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="transform hover:translate-y-[-5px] transition-transform duration-300">
            <h3 className="text-xl font-bold mb-5 border-b border-gray-500 pb-2 inline-block">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                <div className="bg-gray-600 p-2 rounded-lg shadow-md mr-3">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span>principal_hrc@yahoo.com</span>
              </li>
              <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                <div className="bg-gray-600 p-2 rounded-lg shadow-md mr-3">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span>+91-11-27667747, +91-11-27667458</span>
              </li>
              <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                <div className="bg-gray-600 p-2 rounded-lg shadow-md mr-3">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span>New Delhi</span>
              </li>
            </ul>
          </div>

          {/* Social Links Column */}
          <div className="transform hover:translate-y-[-5px] transition-transform duration-300">
            <h3 className="text-xl font-bold mb-5 border-b border-gray-500 pb-2 inline-block">Connect With Us</h3>
            <div className="flex space-x-5">
              <a href="https://www.facebook.com/hrcduofficial" className="bg-gray-600 p-3 rounded-lg hover:bg-gray-500 transition-colors duration-300 shadow-lg">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://x.com/hrcduofficial" className="bg-gray-600 p-3 rounded-lg hover:bg-gray-500 transition-colors duration-300 shadow-lg">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/school/hansraj-college/" className="bg-gray-600 p-3 rounded-lg hover:bg-gray-500 transition-colors duration-300 shadow-lg">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/hrcduofficial" className="bg-gray-600 p-3 rounded-lg hover:bg-gray-500 transition-colors duration-300 shadow-lg">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-500 mt-12 pt-8 text-center">
          <p className="flex justify-center items-center">
            <Copyright className="mr-2 h-4 w-4" />
            2025 University of Delhi Hansraj college, All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}