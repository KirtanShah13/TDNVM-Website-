import React, { useState } from 'react';
import { Heart, Users, Calendar, Clock, Star, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CountUp from 'react-countup';






const VolunteerPage: React.FC = () => {
  const { t } = useTranslation('volunteer');

  const { i18n } = useTranslation();
  const isGujarati = i18n.language === 'gu';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    areaOfInterest: '',
    availability: '',
    experience: '',
    newsletter: false
  });

  const volunteerAreas = [
  {
    id: 'cultural',
    icon: '🎭',
    volunteers: 45
  },
  {
    id: 'food',
    icon: '🍽️',
    volunteers: 32
  },
  {
    id: 'logistics',
    icon: '📦',
    volunteers: 28
  },
  {
    id: 'social-media',
    icon: '📱',
    volunteers: 15
  },
  {
    id: 'education',
    icon: '📚',
    volunteers: 20
  },
  {
    id: 'welfare',
    icon: '🤝',
    volunteers: 25
  }
].map((area) => ({
  ...area,
  title: t(`areas.${area.id}.title`),
  description: t(`areas.${area.id}.description`)
}));


  const testimonials = [
    {
      id: 1,
      name: 'Sita Sharma',
      role: 'Cultural Volunteer',
      photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'Volunteering has enriched my life immensely. The joy of seeing children learn traditional dances and the community come together is priceless.',
      years: 3
    },
    {
      id: 2,
      name: 'Arjun Patel',
      role: 'Event Logistics',
      photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'Being part of the logistics team has taught me so much about event management. Plus, I\'ve made lifelong friends along the way.',
      years: 2
    },
    {
      id: 3,
      name: 'Maya Reddy',
      role: 'Social Media Volunteer',
      photo: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'Capturing our community\'s beautiful moments and sharing them online helps preserve our memories and attract new members.',
      years: 1
    }
  ];

  const benefits = [
    'Develop new skills and gain valuable experience',
    'Build meaningful connections within the community',
    'Contribute to preserving and promoting Indian culture',
    'Flexible volunteering opportunities to fit your schedule',
    'Recognition and certificates for your contributions',
    'Exclusive access to volunteer appreciation events'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Volunteer form submitted:', formData);
    // Handle form submission here
    alert(t('formSuccess'));
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
           {t('title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
           {t('subtitle')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              
              {isGujarati ? t('stats.volunteer_count') : <CountUp end={165} duration={2} suffix="+" />}
              
              </div>
            <div className="text-gray-600 dark:text-gray-400">{t('stats.volunteers')}</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-secondary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              
             {isGujarati ? t('stats.event_count') : <CountUp end={50} duration={2} suffix="+" />}
              
              </div>
            <div className="text-gray-600 dark:text-gray-400">{t('stats.events')}</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-accent-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              
              {isGujarati ? t('stats.hour_count') : <CountUp end={2000} duration={2} suffix="+" />}
              
              </div>
            <div className="text-gray-600 dark:text-gray-400">{t('stats.hours')}</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('stats.satisfaction_rate')}</div>
            <div className="text-gray-600 dark:text-gray-400">{t('stats.satisfaction')}</div>
          </div>
        </div>

        {/* Volunteer Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
             {t('opportunitiesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteerAreas.map((area) => (
              <div key={area.id} className="card p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {area.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {area.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {area.volunteers} volunteers
                  </span>
                  {/*
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                    Learn More →
                  </button>
                  */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('benefitsTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(t('benefits', { returnObjects: true }) as string[]).map((benefit, index) => (
  <div key={index} className="flex items-start space-x-3">
    <CheckCircle className="h-6 w-6 text-primary-500 mt-1 flex-shrink-0" />
    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
  </div>
))}

          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('testimonialsTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.years} years volunteering
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteer Form */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {t('formTitle')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="areaOfInterest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                 {t('form.areaOfInterest')}
                </label>
                <select
                  id="areaOfInterest"
                  name="areaOfInterest"
                  required
                  value={formData.areaOfInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">{t('select.area')}</option>
                  {volunteerAreas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('form.availability')}
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                 <option value="">{t('select.availability')}</option>
                <option value="weekends">{t('select.weekends')}</option>
                <option value="weekdays">{t('select.weekdays')}</option>
                <option value="flexible">{t('select.flexible')}</option>
                <option value="events-only">{t('select.eventsOnly')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('form.experience')}
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder={t('form.experiencePlaceholder')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {t('form.newsletter')}s
                </label>
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 text-lg font-medium"
              >
                {t('form.submit')}

              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;