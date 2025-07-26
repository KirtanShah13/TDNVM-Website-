import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation('privacy'); // Use 'privacy' namespace

  return (
    <section className="bg-indian-pattern bg-cover bg-fixed bg-center py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-6 sm:p-10 animate-fade-in text-gray-800 dark:text-gray-100">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-primary-600 dark:text-primary-400">
            {t('privacy.title')}
          </h1>

          <p className="mb-4 text-base sm:text-lg">{t('privacy.intro')}</p>

          {Array.from({ length: 7 }).map((_, i) => {
            const section = i + 1;
            return (
              <div key={section}>
                <h2 className="text-2xl font-semibold mt-8 mb-2">{t(`privacy.section${section}.title`)}</h2>
                <p className="mb-4">{t(`privacy.section${section}.body`)}</p>
              </div>
            );
          })}

          <p className="mb-4">
            {t('privacy.contact_text')}{' '}
            <a
              href="mailto:privacy@example.com"
              className="text-primary-600 underline dark:text-primary-400"
            >
              privacy@example.com
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
