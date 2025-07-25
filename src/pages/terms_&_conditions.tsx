import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <section className="bg-indian-pattern bg-cover bg-fixed bg-center py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-6 sm:p-10 animate-fade-in text-gray-800 dark:text-gray-100">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-primary-600 dark:text-primary-400">
            Terms and Conditions
          </h1>

          <p className="mb-4 text-base sm:text-lg">
            These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to comply with them.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing this website, you agree to be bound by these Terms. If you do not agree, please do not use our site.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">2. Use of Our Services</h2>
          <p className="mb-4">
            You agree to use the platform only for lawful purposes and in a way that does not violate the rights of others. Misuse or abuse may result in account suspension.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">3. User Accounts</h2>
          <p className="mb-4">
            Some features may require an account. You are responsible for maintaining the confidentiality of your login information and for all activity under your account.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">4. Content and Copyright</h2>
          <p className="mb-4">
            All content, including text, images, and graphics, is owned by us or our partners. Do not copy or distribute without permission.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">5. Limitation of Liability</h2>
          <p className="mb-4">
            We are not liable for any damages arising from your use of the website. This includes direct, indirect, or consequential damages.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">6. Termination</h2>
          <p className="mb-4">
            We reserve the right to suspend or terminate your access at our discretion, especially in cases of misuse or breach of terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">7. Changes to Terms</h2>
          <p className="mb-4">
            We may update these Terms occasionally. Continued use of the site implies acceptance of the revised Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">8. Governing Law</h2>
          <p className="mb-4">
            These terms are governed by and interpreted in accordance with the laws of your country or jurisdiction.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
