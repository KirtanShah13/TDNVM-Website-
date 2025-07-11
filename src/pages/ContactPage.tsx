import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';




const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'community@samudaya.org',
      description: 'Send us an email and we\'ll respond within 24 hours',
      action: 'mailto:community@samudaya.org'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+91 98765 43210',
      description: 'Available Monday to Friday, 9 AM to 6 PM',
      action: 'tel:+919876543210'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Community Center, Bandra West, Mumbai - 400050',
      description: 'Open for visits during event hours',
      action: '#'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      details: '+91 98765 43211',
      description: 'Quick responses for urgent matters',
      action: 'https://wa.me/919876543211'
    }
  ];

  const topics = [
    'General Inquiry',
    'Membership Information',
    'Event Participation',
    'Volunteer Opportunities',
    'Sponsorship & Partnerships',
    'Donations & Support',
    'Feedback & Suggestions',
    'Technical Support'
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'By Appointment Only' },
    { day: 'Event Days', hours: 'Extended Hours' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', topic: '', message: '' });
  };

  const location = useLocation();

useEffect(() => {
  if (location.hash === '#event-form') {
    const element = document.querySelector(location.hash);
    if (element) {
      setTimeout(() => {
        const yOffset = -120; // adjust this value based on your header height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 200);
    }
  }
}, [location]);


  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have questions, want to join our community, 
            or need assistance, we're here to help.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.action}
              className="card p-6 text-center hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/40 transition-colors">
                <info.icon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {info.title}
              </h3>
              <p className="text-primary-600 font-medium mb-2">{info.details}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{info.description}</p>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Contact Form */}
          <div id="event-form" className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
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
                    Email Address *
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
                  Phone Number
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
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Topic of Inquiry *
                </label>
                <select
                  id="topic"
                  name="topic"
                  required
                  value={formData.topic}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select a topic</option>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please describe your inquiry in detail..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 text-lg font-medium flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* Office Hours */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-primary-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Office Hours
                </h3>
              </div>
              <div className="space-y-3">
                {officeHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <span className="text-gray-700 dark:text-gray-300">{schedule.day}</span>
                    <span className="text-primary-600 font-medium">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="card overflow-hidden">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400">Interactive Map</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Community Center Location
                  </p>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Community Center
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Bandra West, Mumbai - 400050<br />
                  Near Bandra Railway Station
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <a
                  href="/volunteer"
                  className="block w-full btn-outline text-center"
                >
                  Become a Volunteer
                </a>
                <a
                  href="/events"
                  className="block w-full btn-outline text-center"
                >
                  View Upcoming Events
                </a>
                <a
                  href="/donate"
                  className="block w-full btn-primary text-center"
                >
                  Support Our Community
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Join Community CTA */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Become part of our vibrant community and experience the joy of cultural celebrations, 
            meaningful connections, and shared traditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Join as Member
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;