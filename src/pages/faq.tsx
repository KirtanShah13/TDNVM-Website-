import React from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is this community about?',
    answer:
      'We are a cultural and social community aimed at preserving heritage, organizing events, and fostering local connections among members.',
  },
  {
    question: 'How can I join or become a member?',
    answer:
      'You can join by visiting the Contact or Members page and filling out the interest form. A team member will get back to you shortly.',
  },
  {
    question: 'Are the events open to the public?',
    answer:
      'Most of our events are open to everyone, but some may require registration or membership. Please check each event’s details for specifics.',
  },
  {
    question: 'How do I donate or support your work?',
    answer:
      'You can support us by visiting the Donate page. We appreciate all contributions — they help us run events and outreach programs.',
  },
  {
    question: 'Where can I see past event photos or videos?',
    answer:
      'Visit the Gallery page to browse media from our previous events. We regularly update it with new highlights!',
  },
];

const FAQPage: React.FC = () => {
  return (
    <section className="bg-indian-pattern bg-cover bg-fixed bg-center py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-6 sm:p-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Answers to the most common questions from our community members.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 px-4 sm:px-6 py-4 transition-all duration-300"
              >
                <summary className="flex justify-between items-center cursor-pointer text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                  {faq.answer}
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
