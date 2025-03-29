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
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-300 text-sm">
            Hansraj College, University of Delhi  
Established in 1948, Hansraj College is one of the most prestigious institutions in India, known for its academic excellence, vibrant campus life, and holistic development. With a legacy of producing global leaders and innovators, the college continues to inspire generations through its commitment to education and social responsibility.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-300 flex items-center">Home</a></li>
              <li><a href="#" className="hover:text-purple-300 flex items-center">About</a></li>
              <li><a href="#" className="hover:text-purple-300 flex items-center">Events</a></li>
              <li><a href="#" className="hover:text-purple-300 flex items-center">Contact</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-purple-400" />
                <span>Hansraj@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-purple-400" />
                <span>+91 987654xxxx</span>
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-purple-400" />
                <span>New Delhi</span>
              </li>
            </ul>
          </div>

          {/* Social Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-purple-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-purple-300">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-purple-300">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="flex justify-center items-center">
            <Copyright className="mr-2 h-4 w-4" />
            2025 University of Delhi Hansraj college, All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}