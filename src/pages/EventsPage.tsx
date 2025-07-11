

import React, { useState, useEffect } from 'react';

import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [currentSlide, setCurrentSlide] = useState(0);


useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % adImages.length);
  }, 5000);
  return () => clearInterval(interval);
}, []);



  const adImages = [
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%201.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%202.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%203.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%204.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%204.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%205.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%205.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%206.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%207.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%208.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%209.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%2010.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//shradd%204.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//title.jpg", 
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//shradd%203.jpg", 
];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Diwali Celebration 2024',
      description: 'Join us for a grand Diwali celebration with traditional performances, delicious food, and community bonding.',
      date: '2024-11-12',
      time: '6:00 PM - 10:00 PM',
      location: 'Community Hall, Downtown',
      image: 'https://images.pexels.com/photos/6479178/pexels-photo-6479178.jpeg?auto=compress&cs=tinysrgb&w=600',
      attendees: 150,
      category: 'Festival'
    },
    {
      id: 2,
      title: 'Cultural Music Evening',
      description: 'An evening of classical Indian music featuring local artists and traditional instruments.',
      date: '2024-11-25',
      time: '7:00 PM - 9:00 PM',
      location: 'Open Air Amphitheater',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600',
      attendees: 80,
      category: 'Cultural'
    },
    {
      id: 3,
      title: 'Youth Cricket Tournament',
      description: 'Inter-community cricket tournament for youth aged 16-25. Registration required.',
      date: '2024-12-08',
      time: '9:00 AM - 5:00 PM',
      location: 'Sports Complex',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=600',
      attendees: 120,
      category: 'Sports'
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: 'Navratri Celebration 2024',
      description: 'Nine nights of traditional Garba and Dandiya with authentic Gujarati cuisine.',
      date: '2024-10-15',
      time: '7:00 PM - 11:00 PM',
      location: 'Community Hall',
      image: 'https://images.pexels.com/photos/6479264/pexels-photo-6479264.jpeg?auto=compress&cs=tinysrgb&w=600',
      attendees: 200,
      category: 'Festival',
      recap: 'Amazing turnout with traditional dances and delicious food!'
    },
    {
      id: 5,
      title: 'Independence Day Celebration',
      description: 'Celebrating India\'s Independence Day with flag hoisting, cultural programs, and patriotic songs.',
      date: '2024-08-15',
      time: '8:00 AM - 12:00 PM',
      location: 'Community Park',
      image: 'https://images.pexels.com/photos/7976239/pexels-photo-7976239.jpeg?auto=compress&cs=tinysrgb&w=600',
      attendees: 180,
      category: 'National',
      recap: 'Proud moment for our community with inspiring speeches and performances.'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const EventCard = ({ event, isPast = false }: { event: any; isPast?: boolean }) => (
    <div className="card overflow-hidden group">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {event.category}
        </div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 text-primary-500" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4 text-primary-500" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 text-primary-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4 text-primary-500" />
            <span>{event.attendees} attendees</span>
          </div>
        </div>

        {isPast && event.recap && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
            <p className="text-green-700 dark:text-green-300 text-sm">
              <strong>Event Recap:</strong> {event.recap}
            </p>
          </div>
        )}

        {!isPast ? (
          <div className="flex space-x-2">
            <button className="btn-primary flex-1">RSVP Now</button>
            <button className="btn-outline">Share</button>
          </div>
        ) : (
          <button className="btn-outline w-full">View Photos</button>
        )}
      </div>
    </div>
  );

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Community Events
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover and participate in our vibrant community events that celebrate culture, 
            build connections, and create lasting memories.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-600'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'past'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-600'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === 'upcoming' 
            ? upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            : pastEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast={true} />
              ))
          }
        </div>

{/* Ad Section */}
<div className="mt-16 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-6 text-center">
  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Sponsored Content</p>

  {/* Carousel */}
  <div className="relative w-full max-w-xl mx-auto">
    <div className="overflow-hidden rounded-lg w-full">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {adImages.map((img, index) => (
          <div key={index} className="flex-shrink-0 w-full flex justify-center items-center">
            <img
              src={img}
              alt={`ad-${index}`}
              className="max-h-[400px] w-auto h-auto object-contain rounded-md"
            />
          </div>
        ))}
      </div>
    </div>

    {/* Dots */}
    <div className="flex justify-center mt-4 space-x-2">
      {adImages.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentSlide(idx)}
          className={`w-3 h-3 rounded-full transition-all ${
            currentSlide === idx ? 'bg-gray-800 dark:bg-white' : 'bg-gray-400'
          }`}
        />
      ))}
    </div>
  </div>
</div>




        {/* Call to Action */}
  <div className="mt-16 text-center">
  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-8">
    <h2 className="text-2xl font-bold mb-4">Want to Organize an Event?</h2>
    <p className="text-primary-100 mb-6">
      Have an idea for a community event? We'd love to hear from you and help make it happen!
    </p>
    <Link to="/contact?topic=Event%20Proposal">
      <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
        Propose an Event
      </button>
    </Link>
  </div>
</div>
      </div>
    </div>
  );
};

export default EventsPage;