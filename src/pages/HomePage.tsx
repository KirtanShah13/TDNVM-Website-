import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Camera, Heart, ArrowRight, Star } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { supabase } from '../lib/SupabaseClient'; // ✅ Your configured client
import { useTranslation } from 'react-i18next'; // ✅ ADD THIS


const heroImages = [
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//shradd%204.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//title.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//shradd%203.jpg",
];

const HomePage: React.FC = () => {
const { t } = useTranslation('home'); // ✅ ADD THIS

const { i18n } = useTranslation();
const isGujarati = i18n.language === 'gu';


  const [heroSlide, setHeroSlide] = useState(0);
  const [adSlide, setAdSlide] = useState(0);
  const [adImages, setAdImages] = useState<string[]>([]);
  const [loadingAds, setLoadingAds] = useState(true);
  const [errorAds, setErrorAds] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      setLoadingAds(true);
      const { data, error } = await supabase.from('ads').select('imageurl');
      if (error) {
        setErrorAds('Failed to load ads');
        console.error('Supabase error:', error.message);
      } else {
        setAdImages(data.map((ad: { imageurl: string }) => ad.imageurl));
        setErrorAds(null);
      }
      setLoadingAds(false);
    };

    fetchAds();
  }, []);

 useEffect(() => {
  const fetchUpcomingEvents = async () => {
    const today = new Date().toISOString();
    const currentLang = i18n.language;

    // ✅ Pick the right table based on selected language
    const tableName = currentLang === 'gu' ? 'events_gu' : 'events';

    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .gte('date', today)
      .order('date', { ascending: true })
      .limit(2);

    if (error) {
      setErrorAds(t('adsLoadError'));
    } else {
      const formatted = data.map((event: any) => ({
        ...event,
        image: event.images?.[0] || '',
        time: event.time || 'TBA',
      }));
      setUpcomingEvents(formatted);
    }
  };

  // ✅ Refetch when language changes
  fetchUpcomingEvents();
}, [i18n.language]);



  useEffect(() => {
    const interval = setInterval(() => {
      setAdSlide((prev) => (prev + 1) % Math.ceil(adImages.length / 3 || 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [adImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  {/*
    const upcomingEvents = [
    {


      id: 1,
      title: 'Diwali Celebration 2024',
      date: '2024-11-12',
      time: '6:00 PM',
      location: 'Community Hall',
      image: 'https://images.pexels.com/photos/6479178/pexels-photo-6479178.jpeg?auto=compress&cs=tinysrgb&w=400',
      image: 'https://images.pexels.com/photos/6479178/pexels-photo-6479178.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      title: 'Cultural Music Evening',
      date: '2024-11-25',
      time: '7:00 PM',
      location: 'Open Grounds',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];
  */}


const stats = [
  {
    label: t('stats.activeMembers'),
    valueEn: Number(t('statsData.activeMembers')),
    valueGu: t('statsData.activeMembers'),
    icon: Users,
  },
  {
    label: t('stats.eventsOrganized'),
    valueEn: Number(t('statsData.eventsOrganized')),
    valueGu: t('statsData.eventsOrganized'),
    icon: Calendar,
  },
  {
    label: t('stats.yearsOfService'),
    valueEn: Number(t('statsData.yearsOfService')),
    valueGu: t('statsData.yearsOfService'),
    icon: Star,
  },
  {
    label: t('stats.communityImpact'),
    valueEn: Number(t('statsData.communityImpact')),
    valueGu: t('statsData.communityImpact'),
    icon: Heart,
  },
];




  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
<section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white overflow-hidden">  // bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-600
  <div className="absolute inset-0 bg-black/20"></div>    // bg-gradient-to-tr from-pink-600 via-indigo-600 to-sky-500
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="animate-slide-up">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          {t('hero.title')}
          <span className="block text-yellow-300">{t('hero.status')}</span>
        </h1>
        <p className="text-xl lg:text-2xl mb-8 opacity-90">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/events" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
            {t('hero.cta.viewEvents')}
          </Link>
          <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3">
            {t('hero.cta.joinUs')}
          </Link>
        </div>
      </div>

            {/* Hero Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl w-full">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${heroSlide * 100}%)` }}
                >
                  {heroImages.map((img, index) => (
                    <div key={index} className="flex-shrink-0 w-full">
                      <img src={img} alt={`ad-${index}`} className="w-full h-full object-cover rounded-2xl" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-800 font-medium">{t('hero.status')}</span>
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
          <div
            key={index}
            ref={ref}
            className="text-center animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4">
              <stat.icon className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isGujarati ? (
                <>{stat.valueGu}+</>
              ) : (
                inView ? <CountUp end={stat.valueEn} duration={3.5} separator="," /> : '0'
              )}
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
          {t('mission.title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          {t('mission.description')}
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <span className="text-gray-700 dark:text-gray-300">{t('mission.point1')}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
            <span className="text-gray-700 dark:text-gray-300">{t('mission.point2')}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
            <span className="text-gray-700 dark:text-gray-300">{t('mission.point3')}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <img src="https://images.pexels.com/photos/6479178/pexels-photo-6479178.jpeg?auto=compress&cs=tinysrgb&w=400" className="rounded-lg shadow-lg" />
        <img src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400" className="rounded-lg shadow-lg mt-8" />
      </div>
    </div>
  </div>
</section>


      {/* Upcoming Events */}
<section className="py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {t('events.title')}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        {t('events.subtitle')}
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
              {new Date(event.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {event.title}
            </h3>
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
              {t('events.cta')}
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center">
      <Link to="/events" className="btn-outline inline-flex items-center space-x-2">
        <span>{t('events.viewAll')}</span>
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
        {t('whatsnew.title')}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        {t('whatsnew.subtitle')}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="card p-6 text-center">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="h-8 w-8 text-primary-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {t('whatsnew.gallery.title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('whatsnew.gallery.desc')}
        </p>
        <Link to="/gallery" className="text-primary-600 hover:text-primary-700 font-medium">
          {t('whatsnew.gallery.link')}
        </Link>
      </div>

      <div className="card p-6 text-center">
        <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="h-8 w-8 text-secondary-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {t('whatsnew.members.title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('whatsnew.members.desc')}
        </p>
        <Link to="/members" className="text-secondary-600 hover:text-secondary-700 font-medium">
          {t('whatsnew.members.link')}
        </Link>
      </div>

      <div className="card p-6 text-center">
        <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8 text-accent-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {t('whatsnew.support.title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('whatsnew.support.desc')}
        </p>
        <Link to="/donate" className="text-accent-600 hover:text-accent-700 font-medium">
          {t('whatsnew.support.link')}
        </Link>
      </div>
    </div>
  </div>
</section>


      {/* ✅ Dynamic Ads Section */}
<section className="mt-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-6 py-8 text-center">
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        {t('ads.sponsored')}
      </p>

      {loadingAds ? (
        <p className="text-gray-500">{t('ads.loading')}</p>
      ) : errorAds ? (
        <p className="text-red-500">{t('ads.failed')}</p>
      ) : (
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-lg w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${adSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(adImages.length / 3) }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex-shrink-0 w-full flex flex-col md:flex-row justify-center items-center gap-4 px-4"
                >
                  {adImages.slice(slideIndex * 3, slideIndex * 3 + 3).map((img, index) => (
                    <div key={index} className="w-full md:w-1/3 flex justify-center items-center">
                      <img
                        src={img}
                        alt={`ad-${slideIndex * 3 + index}`}
                        className="max-h-[200px] w-full object-contain rounded-md shadow"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</section>
    </div>
  );
};
export default HomePage;