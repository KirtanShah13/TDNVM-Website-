import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WelcomeBanner from './WelcomeBanner';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 bg-indian-pattern">
      <Header />
      <WelcomeBanner /> {/* 👈 Inserted here */}
      <main className="pt-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
