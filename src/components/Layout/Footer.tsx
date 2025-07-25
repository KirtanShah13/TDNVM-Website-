import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { useTranslation } from "react-i18next";


const Footer: React.FC = () => {

   const { t } = useTranslation('footer');
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
              <span className="text-xl font-bold">{t("footer.brand_name")}</span>
            </div>
            <p className="text-gray-400 mb-4">
             {t("footer.brand_tagline")}
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
            <h3 className="text-lg font-semibold mb-4">{t("footer.quick_links")}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">{t("footer.home")}</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white transition-colors">{t("footer.events")}</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white transition-colors">{t("footer.gallery")}</Link></li>
              <li><Link to="/members" className="text-gray-400 hover:text-white transition-colors">{t("footer.members")}</Link></li>
              <li><Link to="/volunteer" className="text-gray-400 hover:text-white transition-colors">{t("footer.volunteer")}</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.community")}</h3>
            <ul className="space-y-2">
              <li><Link to="/core-team">{t("footer.core_team")}</Link></li>
              <li><Link to="/donate">{t("footer.support_us")}</Link></li>
              <li><Link to="/faq">{t("footer.faq")}</Link></li>
              <li><Link to="/terms-and-conditions">{t("footer.terms")}</Link></li>
              <li><Link to="/privacy-policy">{t("footer.privacy")}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.contact_info")}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400">{t("footer.email")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400">{t("footer.phone")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400">{t("footer.address")}</span>
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
            © {t("footer.rights", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;