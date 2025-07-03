import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Camera, Heart, ArrowRight, Star } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const HomePage: React.FC = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Diwali Celebration 2024',
      date: '2024-11-12',
      time: '6:00 PM',
      location: 'Community Hall',
      image: 'https://images.pexels.com/photos/6479178/pexels-photo-6479178.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Cultural Music Evening',
      date: '2024-11-25',
      time: '7:00 PM',
      location: 'Open Grounds',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const stats = [
    { label: 'Active Members', value: 650, icon: Users },
    { label: 'Events Organized', value: 250, icon: Calendar },
    { label: 'Years of Service', value: 74, icon: Star },
    { label: 'Community Impact', value: 1000, icon: Heart }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Welcome to
                <span className="block text-yellow-300">TDNVM Vadodara</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                Celebrating our rich Indian heritage while building stronger community bonds through cultural events, festivals, and meaningful connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/events" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
                  View Events
                </Link>
                <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3">
                  Join Us
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Community celebration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-800 font-medium">Active Community</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
              return (
                <div key={index} ref={ref} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4">
                    <stat.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {inView ? <CountUp end={stat.value} duration={3.5} separator="," /> : '0'}+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                We are dedicated to preserving and celebrating Indian culture while fostering unity and support within our community. Through festivals, cultural programs, and social initiatives, we create spaces where traditions thrive and new friendships bloom.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Preserve and promote Indian cultural heritage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Build strong community connections</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Support community members in need</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/6479178/pexels-photo-6479178.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Cultural celebration"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Community gathering"
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Join us for our next celebrations and cultural gatherings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="card overflow-hidden group">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button className="mt-4 btn-primary w-full">
                    RSVP Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/events" className="btn-outline inline-flex items-center space-x-2">
              <span>View All Events</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What's New */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What's New
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Stay updated with our latest news and announcements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">New Gallery</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Check out photos from our recent Navratri celebration
              </p>
              <Link to="/gallery" className="text-primary-600 hover:text-primary-700 font-medium">
                View Gallery →
              </Link>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">New Members</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Welcome 15 new families who joined us this month
              </p>
              <Link to="/members" className="text-secondary-600 hover:text-secondary-700 font-medium">
                Meet Members →
              </Link>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Community Support</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Help us continue our mission with your support
              </p>
              <Link to="/donate" className="text-accent-600 hover:text-accent-700 font-medium">
                Support Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <section className="py-8 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-sm">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Advertisement</p>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-2">Support Local Businesses</h3>
              <p className="text-blue-100">Your advertisement could be here. Contact us for sponsorship opportunities.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
