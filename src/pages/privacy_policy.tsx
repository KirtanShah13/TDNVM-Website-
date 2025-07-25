import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="bg-indian-pattern bg-cover bg-fixed bg-center py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-6 sm:p-10 animate-fade-in text-gray-800 dark:text-gray-100">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-primary-600 dark:text-primary-400">
            Privacy Policy
          </h1>

          <p className="mb-4 text-base sm:text-lg">
            This Privacy Policy describes how we collect, use, and share your personal information when you visit or interact with our website.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
          <p className="mb-4">
            We may collect information such as your name, email address, phone number, and IP address when you register, contact us, or interact with the site. We may also collect usage data via cookies and analytics tools.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
          <p className="mb-4">
            Your data helps us personalize content, communicate with you, provide services, and improve our platform. We may also use it for analytics and marketing purposes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">3. Sharing Information</h2>
          <p className="mb-4">
            We do not sell your data. We may share it with trusted partners (e.g., analytics or cloud services) who help us operate our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">4. Your Rights</h2>
          <p className="mb-4">
            You may request access, correction, or deletion of your personal data at any time by contacting us. We respect your privacy rights.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">5. Cookies</h2>
          <p className="mb-4">
            We use cookies to understand how users interact with our website and to improve your experience. You can manage your cookie preferences in your browser settings.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">6. Age Restrictions</h2>
          <p className="mb-4">
            Our services are intended for users aged 13 and above. We do not knowingly collect data from children under 13.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-2">7. Contact Us</h2>
          <p className="mb-4">
            For questions about this policy, email us at{' '}
            <a href="mailto:privacy@example.com" className="text-primary-600 underline dark:text-primary-400">
              privacy@example.com
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
