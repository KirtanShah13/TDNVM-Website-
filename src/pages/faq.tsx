import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FAQPage: React.FC = () => {
  const { t } = useTranslation('faq');

  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5'];

  return (
    <section className="bg-indian-pattern bg-cover bg-fixed bg-center py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-6 sm:p-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('faq.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('faq.subtitle')}
            </p>
          </div>

          <div className="space-y-6">
            {faqKeys.map((key, index) => (
              <details
                key={index}
                className="group border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 px-4 sm:px-6 py-4 transition-all duration-300"
              >
                <summary className="flex justify-between items-center cursor-pointer text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                  {t(`faq.${key}.question`)}
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                  {t(`faq.${key}.answer`)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
