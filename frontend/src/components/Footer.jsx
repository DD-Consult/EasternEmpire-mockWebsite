import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">EASTERN EMPIRE</h3>
            <p className="text-gray-400 mb-4">
              Sydney's finest ensemble of South Asian artists. Eclectic. Electric. And unlike any other.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.facebook.com/easternempiremusic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCMqBs4odGJ-Tl6UMTlxPPDA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/easternempiremusic/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="mailto:info@easternempire.com.au"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gigs" className="text-gray-400 hover:text-white transition-colors">
                  Upcoming Gigs
                </Link>
              </li>
              <li>
                <Link to="/music" className="text-gray-400 hover:text-white transition-colors">
                  Music
                </Link>
              </li>
              <li>
                <Link to="/bio" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="text-gray-400 hover:text-white transition-colors">
                  Book Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Sydney, Australia</li>
              <li>
                <a href="mailto:info@easternempire.com.au" className="hover:text-white transition-colors">
                  info@easternempire.com.au
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Eastern Empire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;