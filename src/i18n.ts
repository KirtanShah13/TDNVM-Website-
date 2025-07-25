import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 🌐 English JSON files
import enNav from './local/en/nav.json';
import enHome from './local/en/home.json';
import enEvents from './local/en/events.json';
import enGallery from './local/en/gallery.json'; 
import enCoreTeam from './local/en/core_team.json';
import enVolunteer from './local/en/volunteer.json';
import enContact from './local/en/contact_page.json';
import enDonate from './local/en/donate.json';
import enFooter from './local/en/footer.json';  // 👈 NEW








// 👈 NEW

// 🌐 Gujarati JSON files
import guNav from './local/gu/nav.json';
import guHome from './local/gu/home.json';
import guEvents from './local/gu/events.json';
import guGallery from './local/gu/gallery.json';
import enMembers from './local/en/members.json';
import guMembers from './local/gu/members.json';
import guCoreTeam from './local/gu/core_team.json';
import guVolunteer from './local/gu/volunteer.json';
import guContact from './local/gu/contact_page.json'; // ✅ Gujarati
import guDonate from './local/gu/donate.json';
import guFooter from './local/gu/footer.json';  // 👈 NEW

 // 👈 NEW

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        nav: enNav,
        home: enHome,
        events: enEvents,
        gallery: enGallery, 
        members: enMembers, 
        coreTeam: enCoreTeam,// 👈 NEW
        volunteer: enVolunteer,
        contact: enContact,
        donate: enDonate,
        footer: enFooter,

      },
      gu: {
        nav: guNav,
        home: guHome,
        events: guEvents,
        gallery: guGallery, // 👈 NEW
        members: guMembers,
        coreTeam: guCoreTeam,
        volunteer: guVolunteer,
        contact: guContact,
        donate: guDonate,
        footer: guFooter, // 👈 NEW

      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    ns: ['nav', 'home', 'ads', 'events', 'members', 'coreTeam', 'gallery', 'volunteer', 'contact', 'donate', 'footer'],   // 👈 Add 'gallery'
    defaultNS: 'home',
    interpolation: {
    escapeValue: false,
    },
  });

export default i18n;
