import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsAndConditions: React.FC = () => {
  const { t } = useTranslation('terms'); // Use "terms" namespace

  return (
    <section className="min-h-screen bg-indian-pattern bg-repeat bg-[length:60px_60px] dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-6 sm:p-10 animate-fade-in text-gray-800 dark:text-gray-100">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-primary-600 dark:text-primary-400">
            {t('terms.title')}
          </h1>

          <p className="mb-4 text-base sm:text-lg">{t('terms.intro')}</p>

          {Array.from({ length: 8 }).map((_, i) => {
            const section = i + 1;
            return (
              <div key={section}>
                <h2 className="text-2xl font-semibold mt-8 mb-2">{t(`terms.section${section}.title`)}</h2>
                <p className="mb-4">{t(`terms.section${section}.body`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
