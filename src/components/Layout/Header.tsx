import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  // === State and Hooks ===
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");

  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { name: "John Michael Doe", email: "john@example.com" };
  });

  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("header");

  // === Effects ===
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // === Handlers ===
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "gu" : "en");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("events"), href: "/events" },
    { name: t("gallery"), href: "/gallery" },
    { name: t("members"), href: "/members" },
    { name: t("coreTeam"), href: "/core-team" },
    { name: t("volunteer"), href: "/volunteer" },
    { name: t("contact"), href: "/contact" },
  ];

  // === JSX ===
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center overflow-x-auto">
            <nav className="flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive(item.href)
                      ? "text-primary-600 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-400 rounded-md"
                      : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center justify-end space-x-2 min-w-max">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              aria-label="Toggle Language"
            >
              <span className="text-sm font-semibold uppercase">
                {i18n.language === "en" ? "GU" : "EN"}
              </span>
            </button>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="hidden md:flex items-center space-x-4">
        
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 text-sm font-semibold rounded-md shadow"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/signup" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 text-sm font-semibold rounded-md shadow">
                  {t("signup")}
                </Link>
                <Link to="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 text-sm font-semibold rounded-md shadow">
                  {t("login")}
                </Link>
              </div>
            )}

            {/* Donate */}
            <Link
              to="/donate"
              className="hidden md:inline-flex bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-600 text-white px-5 py-2 text-sm font-semibold rounded-md shadow-md"
            >
              {t("donate")}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* === Mobile Navigation === */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-6 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary-600 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-400"
                    : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="block mx-3 mt-2 text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-2 rounded-md text-sm font-medium"
            >
              {i18n.language === "en" ? "Gujarati (GU)" : "English (EN)"}
            </button>

            {/* Auth Block */}
            {isLoggedIn ? (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full mx-auto text-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mx-3 text-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  {t("signup")}
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mx-3 text-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  {t("login")}
                </Link>
              </div>
            )}

            {/* Donate Button */}
            <Link
              to="/donate"
              onClick={() => setIsMenuOpen(false)}
              className="block mx-3 mt-4 text-center bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md"
            >
              {t("donate")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
