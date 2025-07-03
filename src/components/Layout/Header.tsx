import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: 'John Michael Doe', email: 'john@example.com' });

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Members', href: '/members' },
    { name: 'Core Team', href: '/core-team' },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">

          {/* Left: Logo */}
          <div className="flex items-center min-w-max">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/logo//website%20logo.jpg"
                alt="TDNVM Logo"
                className="h-10 w-10 rounded-md object-contain"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">TDNVM</span>
            </Link>
          </div>

          {/* Center: Navigation */}
          <div className="flex-1 flex justify-center overflow-x-auto">
            <nav className="flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-400 rounded-md'
                      : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Theme + Auth + Donate */}
          <div className="flex items-center justify-end space-x-2 min-w-max">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isLoggedIn ? (
              <div className="hidden md:block text-sm text-gray-800 dark:text-gray-100 font-medium whitespace-nowrap">
                Welcome {user.name}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 text-sm font-semibold rounded-md shadow"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 text-sm font-semibold rounded-md shadow"
                >
                  Join Us
                </Link>
              </div>
            )}

            <Link
              to="/donate"
              className="hidden md:inline-flex bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-600 text-white px-5 py-2 text-sm font-semibold rounded-md shadow-md"
            >
              Donate
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {!isLoggedIn && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mx-3 text-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mx-3 text-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Join Us
                </Link>
              </div>
            )}
            <Link
              to="/donate"
              onClick={() => setIsMenuOpen(false)}
              className="block mx-3 mt-4 text-center bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md"
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
