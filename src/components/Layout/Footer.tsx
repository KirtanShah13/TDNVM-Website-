import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">TDNVM Vadodara</span>
            </div>
            <p className="text-gray-400 mb-4">
              Building bridges, celebrating culture, and strengthening our community bonds through meaningful connections and shared experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/members" className="text-gray-400 hover:text-white transition-colors">Members</Link></li>
              <li><Link to="/volunteer" className="text-gray-400 hover:text-white transition-colors">Volunteer</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link to="/core-team" className="text-gray-400 hover:text-white transition-colors">Core Team</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/donate" className="text-gray-400 hover:text-white transition-colors">Support Us</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400">community@samudaya.org</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400">Vadodara,Gujarat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sponsors 
        
        /*<div className="border-t border-gray-800 pt-8 mt-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Supported By</h3>
          <div className="flex flex-wrap justify-center items-center space-x-8 opacity-60">
            <div className="bg-white rounded-lg px-4 py-2 mb-4">
              <span className="text-gray-800 font-medium">Local Business 1</span>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 mb-4">
              <span className="text-gray-800 font-medium">Local Business 2</span>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 mb-4">
              <span className="text-gray-800 font-medium">Local Business 3</span>
            </div>
          </div>
        </div> */}

        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Samudaya Community. Made with ❤️ for our community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;