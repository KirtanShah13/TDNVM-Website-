import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Clock, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/SupabaseClient";
import { useTranslation } from "react-i18next";
import type { Event } from "../types.tsx";
import { toast } from "react-hot-toast";

const EventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { t, i18n } = useTranslation(["events"]); // add i18n

  const [errorAds, setErrorAds] = useState<string | null>(null);

  const [adImages, setAdImages] = useState<string[]>([]);

  const [eventsAll, setEventsAll] = useState<Event[]>([]);

  {
    /*
    const adImages = [
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%2011.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%2012.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%2013.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%2014.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%2015.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%2016.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%2017.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%2018.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//back%20inside.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//back%20title.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//Parivar.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//prastavna.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//report.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//shradd%201.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//shradd%202.jpg", 
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%201.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%202.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%203.jpg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/ads//adv%204.jpg",
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
*/
  }

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      const tableName = i18n.language === "gu" ? "events_gu" : "events";
      console.log("🌐 Language:", i18n.language);
      console.log("📦 Fetching from table:", tableName);

      const { data, error } = await supabase.from(tableName).select("*");

      if (error) {
        console.error("❌ Supabase fetch error:", error.message);
        setError(t("events.error", "Failed to load events"));
        setEvents([]);
      } else {
        console.log("✅ Data received:", data);
        setEvents(data || []);
      }

      setLoading(false);
    };

    // fetchEvents();
  }, [i18n.language]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(adImages.length / 3));
    }, 5000);
    return () => clearInterval(interval);
  }, [adImages.length]);

  useEffect(() => {
    const fetchAdImages = async () => {
      const { data, error } = await supabase.from("ads").select("imageurl");

      if (error) {
        setErrorAds(t("ads.error"));
      } else {
        setAdImages(data.map((item) => item.imageurl));
      }
    };

    const fetchEventsAll = async () => {
      const tableName = i18n.language === "gu" ? "events_gu" : "events_en";
      // const tableName = isGujarati ? "core_team_gu" : "core_team_en";
      const url = "http://127.0.0.1:8000/" + tableName;
      fetch(url)
        .then((res) => {
          if (res.ok) {
            // throw new Error("Failed to fetch members");
            // console.log("Fetched members successfully");
          } else {
            throw new Error("Failed to fetch members");
          }
          return res.json();
        })
        .then((data: Event[]) => {
          // data = data.sort((a, b) => (a.id || 0) - (b.id || 0));
          setEventsAll(data);
          console.log("Events data:", data);
          console.log("language:", i18n.language);
          // setIsLoading(false);
        })
        .catch((err) => {
          // setError(err.message);
          console.error("Error fetching leadership history:", err);
          // setIsLoading(false);
        });
      setLoading(false);
    };

    fetchEventsAll();
    fetchAdImages();
  }, [i18n.language]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Share handler (simple: always share the events list)
  const handleShare = async () => {
    const eventUrl = `${window.location.origin}/events`;
    try {
      await navigator.clipboard.writeText(eventUrl);
      toast.success("🔗 Link copied! You can paste it to share.");
    } catch (err) {
      toast.error("❌ Failed to copy link.");
    }
  };

  const EventCard = ({
    event,
    isPast = false,
  }: {
    event: any;
    isPast?: boolean;
  }) => (
    <div className="card overflow-hidden group">
      <div className="relative">
        <img
          src={
            event.images?.[0] ||
            "https://via.placeholder.com/400x200.png?text=No+Image"
          }
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {event.category}
        </div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
          {new Date(event.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {event.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 text-primary-500" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4 text-primary-500" />
            <span>{event.date || "TBD"}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 text-primary-500" />
            <span>{event.location || "Not specified"}</span>
          </div>
        </div>

        {!isPast ? (
          <div className="flex space-x-2">
            <button className="btn-primary flex-1">RSVP Now</button>
            <button
              className="btn-outline flex items-center justify-center space-x-1"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        ) : (
          <button
            className="btn-outline flex items-center justify-center space-x-1"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        )}
      </div>
    </div>
  );

  const now = new Date();
  const upcomingEvents = eventsAll.filter((e) => new Date(e.date) >= now);
  const pastEvents = eventsAll.filter((e) => new Date(e.date) < now);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("events.title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("events.subtitle")}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "upcoming"
                  ? "bg-primary-500 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-primary-600"
              }`}
            >
              {t("events.tabs.upcoming")}
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "past"
                  ? "bg-primary-500 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-primary-600"
              }`}
            >
              {t("events.tabs.past")}
            </button>
          </div>
        </div>

        {/* Loading/Error */}
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            {t("ads.loading")}
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{t("ads.error")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeTab === "upcoming" ? upcomingEvents : pastEvents).map(
              (event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isPast={activeTab === "past"}
                />
              )
            )}
          </div>
        )}

        {/* Ad Section */}
        <section className="mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-6 py-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {t("ads.title")}
              </p>

              {/* Carousel */}
              <div className="relative w-full max-w-5xl mx-auto">
                <div className="overflow-hidden rounded-lg w-full">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {Array.from({ length: Math.ceil(adImages.length / 3) }).map(
                      (_, slideIndex) => (
                        <div
                          key={slideIndex}
                          className="flex-shrink-0 w-full flex flex-col md:flex-row justify-center items-center gap-4 px-4"
                        >
                          {adImages
                            .slice(slideIndex * 3, slideIndex * 3 + 3)
                            .map((img, index) => (
                              <div
                                key={index}
                                className="w-full md:w-1/3 flex justify-center items-center"
                              >
                                <img
                                  src={img}
                                  alt={`ad-${slideIndex * 3 + index}`}
                                  className="max-h-[200px] w-full object-contain rounded-md shadow"
                                />
                              </div>
                            ))}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Dots */}
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: Math.ceil(adImages.length / 3) }).map(
                    (_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          currentSlide === idx
                            ? "bg-gray-800 dark:bg-white"
                            : "bg-gray-400"
                        }`}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">{t("cta.title")}</h2>
            <p className="text-primary-100 mb-6">{t("cta.description")}</p>
            <Link to="/contact?topic=Event%20Proposal">
              <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                {t("cta.button")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
