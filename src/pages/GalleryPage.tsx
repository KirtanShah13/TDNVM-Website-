import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/SupabaseClient";
import { useTranslation } from "react-i18next";
import { GalleryEvent } from "../types";

import {
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
} from "lucide-react";

const GalleryPage: React.FC = () => {
  const { t, i18n } = useTranslation(["gallery"]);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [galleryData, setGalleryData] = useState<any[]>([]);
  const [galleryEvents, setGalleryEvents] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const filters = [
    "all",
    "2024",
    "2023",
    "2022",
    "2021",
    "festivals",
    "cultural",
    "sports",
    "community",
  ];

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchGalleryEvents = async () => {
      setLoading(true);

      const tableName =
        i18n.language === "gu" ? "gallery_events_gu" : "gallery_events_en";
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
        .then((data: GalleryEvent[]) => {
          // data = data.sort((a, b) => (a.id || 0) - (b.id || 0));
          setGalleryEvents(data);
          console.log("Gallery Events data:", data);
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

    fetchGalleryEvents();
    // fetchGallery();
  }, [i18n.language]);

  const filteredImages = useMemo(() => {
    if (selectedFilter === "all") return galleryEvents;
    return galleryEvents.filter(
      (img) => img.category === selectedFilter || img.year === selectedFilter
    );
  }, [selectedFilter, galleryEvents]);

  const openLightbox = (image: any) => {
    setLightboxImage(image);
    setActiveImageIndex(0);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setActiveImageIndex(0);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleDownload = async () => {
    try {
      const imageUrl = lightboxImage.images[activeImageIndex];
      const response = await fetch(imageUrl, { mode: "cors" });
      if (!response.ok) throw new Error("Failed to fetch image");
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `image-${activeImageIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Image download failed. Please try again.");
    }
  };

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.innerWidth > 768) return;
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (window.innerWidth > 768) return;
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (window.innerWidth > 768) return;
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      setActiveImageIndex((prev) =>
        prev === lightboxImage.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setActiveImageIndex((prev) =>
        prev === 0 ? lightboxImage.images.length - 1 : prev - 1
      );
    }
  };

  if (!isLoggedIn) {
    // Redirect to login if not authenticated limiting the user access to gallery
    return (
      <div className="py-16 flex items-center justify-center min-h-[60vh]">
        <div className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please log in to view this page
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Gallery content is only available to registered users.
          </p>
          <a
            href="/login"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Log in
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indian-pattern bg-repeat bg-[length:60px_60px] dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            {t("gallery.title")}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t("gallery.subtitle")}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mt-6" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedFilter === filter
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-lg"
                  : "bg-gray-800/50 text-gray-300 hover:bg-amber-500/20 hover:text-amber-400 border border-gray-700/50"
              }`}
            >
              {t(`gallery.filters.${filter}`, filter)}
            </button>
          ))}
        </div>

        {/* Cards */}
        {loading ? (
          <p className="text-white text-center">{t("gallery.loading")}</p>
        ) : filteredImages.length === 0 ? (
          <p className="text-white text-center">{t("gallery.noResults")} </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => openLightbox(image)}
                className="cursor-pointer bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 hover:border-amber-500/50 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={image.images?.[0]}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-6 space-y-3 text-white">
                  <h3 className="text-xl font-bold">{image.title}</h3>
                  <p className="text-sm text-gray-300 line-clamp-3">
                    {image.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-black">
                    <span className="bg-amber-400 px-3 py-1 rounded-full">
                      {image.year}
                    </span>
                    <span className="bg-orange-500 px-3 py-1 rounded-full">
                      {image.category}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-amber-500" />
                      <span>{formatDate(image.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-amber-500" />
                      <span>{image.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div
              className="relative bg-gray-900 p-6 rounded-2xl max-w-4xl w-full shadow-xl border border-amber-500"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-red-500"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Display with Swipe */}
              <div className="relative">
                <img
                  src={lightboxImage.images?.[activeImageIndex]}
                  alt={lightboxImage.title}
                  className="w-full max-h-[60vh] sm:max-h-[70vh] object-contain rounded-xl mt-6 sm:mt-0"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                  {activeImageIndex + 1} / {lightboxImage.images?.length}
                </div>

                {/* Arrows */}
                <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? lightboxImage.images.length - 1 : prev - 1
                      )
                    }
                    className="text-white bg-black/50 rounded-full p-2 hover:bg-black"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === lightboxImage.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="text-white bg-black/50 rounded-full p-2 hover:bg-black"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mt-4 mb-2">
                {lightboxImage.title}
              </h2>
              <p className="text-gray-300 mb-3">{lightboxImage.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(lightboxImage.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{lightboxImage.location}</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>{t("gallery.download")}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
