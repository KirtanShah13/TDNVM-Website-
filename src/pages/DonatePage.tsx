import React, { useState } from 'react';
import { Heart, Users, Star, Gift, CreditCard, Smartphone, Building, CheckCircle } from 'lucide-react';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';


const DonatePage: React.FC = () => {
  const { t } = useTranslation('donate');


  const [donationAmount, setDonationAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: '',
    anonymous: false
  });

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  const impactAreas = [
    {
      icon: Users,
      title: t('donate.areas.events.title') ,
      description: t('donate.areas.events.desc'),
      percentage: 40
    },
    {
      icon: Gift,
      title: t('donate.areas.education.title'),
      description: t('donate.areas.education.desc'),
      percentage: 25
    },
    {
      icon: Heart,
      title: t('donate.areas.welfare.title'),
      description:  t('donate.areas.welfare.desc'),
      percentage: 20
    },
    {
      icon: Building,
      title: t('donate.areas.infra.title'),
      description: t('donate.areas.infra.desc'),
      percentage: 15
    }
  ];

  const recentDonors = [
    { name: 'Rajesh & Family', amount: 5000, message: 'Happy to support our community!', date: '2024-11-10' },
    { name: 'Anonymous', amount: 2500, message: 'Keep up the great work!', date: '2024-11-08' },
    { name: 'Priya Patel', amount: 1000, message: 'For the children\'s programs', date: '2024-11-05' },
    { name: 'Mumbai Friends Group', amount: 10000, message: 'Proud to be part of this community', date: '2024-11-03' },
    { name: 'Amit Kumar', amount: 3000, message: 'Supporting cultural preservation', date: '2024-11-01' }
  ];

  const paymentMethods = [
   /* {
      id: 'upi',
      name: 'UPI Payment',
      icon: Smartphone,
      description: 'Pay using Google Pay, PhonePe, Paytm, or any UPI app',
      details: 'samudaya@upi'
    },*/
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building,
      description: 'Direct bank transfer or NEFT/RTGS',
      details: 'Account: 1234567890, IFSC: SBIN0001234'
    },
   /* {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Secure online payment with your card',
      details: 'Powered by Razorpay'
    }*/
  ];

  const handleAmountSelect = (amount: number) => {
    setDonationAmount(amount.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setDonorInfo(prev => ({ ...prev, [name]: target.checked }));
    } else if (name === 'amount') {
      setDonationAmount(value);
    } else {
      setDonorInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donation submitted:', { amount: donationAmount, ...donorInfo });
    alert('Thank you for your generous donation! You will receive a confirmation email shortly.');
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('donate.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('donate.description')}
          </p>
        </div>

       {/* Impact Stats */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
  <div>
    <div className="text-3xl font-bold text-[#34D399]"> {/* emerald-400 */}
      ₹<CountUp end={2.5} decimals={1} suffix="L+" duration={2} />
    </div>
    <div className="text-gray-600 dark:text-gray-400 mt-1">{t('donate.fundsRaised')}</div>
  </div>
  <div>
    <div className="text-3xl font-bold text-[#3B82F6]"> {/* blue-500 */}
      <CountUp end={150} suffix="+" duration={2} />
    </div>
    <div className="text-gray-600 dark:text-gray-400 mt-1">{t('donate.members')}</div>
  </div>
  <div>
    <div className="text-3xl font-bold text-[#A78BFA]"> {/* violet-400 */}
      <CountUp end={50} suffix="+" duration={2} />
    </div>
    <div className="text-gray-600 dark:text-gray-400 mt-1">{t('donate.events')}</div>
  </div>
  <div>
    <div className="text-3xl font-bold text-[#F472B6]"> {/* pink-400 */}
      <CountUp end={25} suffix="+" duration={2} />
    </div>
    <div className="text-gray-600 dark:text-gray-400 mt-1">{t('donate.workshops')} </div>
  </div>
</div>



        {/* How Your Money Helps */}
        <div className="my-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
           {t('donate.howHelp')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((area, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <area.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {area.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {area.description}
                </p>
                <div className="text-2xl font-bold text-primary-600">
                  {area.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Donation Form */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
             {t('donate.form.title')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('donate.amountLabel')} (₹) *
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`py-2 px-4 rounded-lg border font-medium transition-colors ${
                        donationAmount === amount.toString()
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-500'
                      }`}
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  name="amount"
                  placeholder={t('donate.customAmount')}
                  value={donationAmount}
                  onChange={handleInputChange}
                  min="100"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Donor Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('donate.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={donorInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('donate.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={donorInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('donate.message')} (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={donorInfo.message}
                  onChange={handleInputChange}
                  placeholder={t('donate.messagePlaceholder')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  checked={donorInfo.anonymous}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                 {t('donate.anonymous')}
                </label>
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 text-lg font-medium"
              >
               {t('donate.submit')}
              </button>
            </form>
          </div>

          {/* Payment Methods & Info */}
          <div className="space-y-8">
            {/* Payment Methods */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {t('donate.payment.title')}
              </h3>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <method.icon className="h-5 w-5 text-primary-600 mr-2" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {t('donate.payment.bank')}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                     {t('donate.payment.bankDesc')}
                    </p>
                    <p className="text-xs text-primary-600 font-mono">
                      {t('donate.payment.details')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            
            {/* UPI QR Code */}
            {/*
            <div className="card p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Quick UPI Payment
              </h3>
              <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">QR Code</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scan with any UPI app to donate instantly
              </p>
              <p className="text-primary-600 font-mono text-sm mt-2">
                samudaya@upi
              </p>
            </div> 
            */}

            {/* Tax Benefits */}
            <div className="card p-6">
              <div className="flex items-center mb-3">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t('donate.tax.title')}
                </h3>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                {(() => {
                  const taxPoints = t('donate.tax.points', { returnObjects: true });
                  if (Array.isArray(taxPoints)) {
                    return taxPoints.map((point, index) => (
                      <li key={index}>• {point}</li>
                    ));
                  } else if (typeof taxPoints === 'string') {
                    return <li>• {taxPoints}</li>;
                  } else {
                    return <li>• {t('donate.tax.default', 'Tax benefits available')}</li>;
                  }
                })()}
                </ul>

            </div>
          </div>
        </div>

        {/* Recent Donors */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('donate.recent')}
          </h2>
          <div className="card p-6">
            <div className="space-y-4">
              {recentDonors.map((donor, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                        <Heart className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {donor.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {donor.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary-600">
                      ₹{donor.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(donor.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-8 text-center">
          <Star className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-2xl font-bold mb-4">{t('donate.thankYou.title')}</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            {t('donate.thankYou.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              {t('donate.buttons.impact')}
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
             {t('donate.buttons.share')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;