// project/src/pages/admin/EventsAdmin.tsx
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit, X, Image as ImageIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../components/AdminLayout";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  thumbnail: string;
  location: string;
  galleryImages?: string[]; // Added to replace standalone Gallery Events
}

const EventsAdmin: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState<Omit<Event, "id">>({
    title: "",
    date: "",
    time: "",
    description: "",
    thumbnail: "",
    location: "",
    galleryImages: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editId, setEditId] = useState<string | null>(null);

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("events");
    if (stored) setEvents(JSON.parse(stored));
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be under 2MB");
        return;
      }
      // Simulate file upload
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, thumbnail: imageUrl });
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => {
        if (file.size > 2 * 1024 * 1024) {
          toast.error(`${file.name} is over 2MB and was skipped.`);
          return null;
        }
        return URL.createObjectURL(file);
      }).filter(Boolean) as string[];

      setFormData(prev => ({ 
        ...prev, 
        galleryImages: [...(prev.galleryImages || []), ...newImages] 
      }));
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages?.filter((_, index) => index !== indexToRemove)
    }));
  };

  // ✅ Validate Form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.date.trim()) newErrors.date = "Date is required";
    if (!formData.time.trim()) newErrors.time = "Time is required";
    if (!formData.thumbnail.trim()) newErrors.thumbnail = "Thumbnail image is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted errors");
      return false;
    }
    return true;
  };

  // ✅ Add Event
  const handleAddEvent = () => {
    if (!validateForm()) return;

    const newEvent: Event = { id: Date.now().toString(), ...formData };
    setEvents([...events, newEvent]);

    setFormData({
      title: "",
      date: "",
      time: "",
      description: "",
      thumbnail: "",
      location: "",
      galleryImages: [],
    });

    toast.success("Event added successfully!");
  };

  // ✅ Update Event
  const handleUpdateEvent = () => {
    if (!validateForm() || !editId) return;

    setEvents(events.map((event) => (event.id === editId ? { id: editId, ...formData } : event)));

    setFormData({
      title: "",
      date: "",
      time: "",
      description: "",
      thumbnail: "",
      location: "",
      galleryImages: [],
    });
    setEditId(null);

    toast.success("Event updated successfully!");
  };

  // ✅ Delete Event
  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event? This action cannot be undone.");
    if (confirmDelete) {
      setEvents(events.filter((event) => event.id !== id));
      toast.info("Event deleted");
    }
  };

  // ✅ Edit Event
  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      description: event.description || "",
      thumbnail: event.thumbnail,
      location: event.location,
      galleryImages: event.galleryImages || [],
    });
    setEditId(event.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AdminLayout>
      <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Events & Gallery
        </h1>

        {/* Add / Edit Event Form */}
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {editId ? "Edit Event" : "Add New Event"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Event title"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Event location"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.location && (
                <p className="text-red-600 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Time *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time}</p>}
            </div>

            {/* Thumbnail */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Event Cover Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer text-sm text-gray-600 dark:text-gray-300"
              />
              <p className="text-xs text-gray-500 mt-2">Recommended dimensions: 800x600px. Maximum size: 2MB.</p>
              {errors.thumbnail && (
                <p className="text-red-600 text-sm mt-1">{errors.thumbnail}</p>
              )}
              {formData.thumbnail && (
                <img
                  src={formData.thumbnail}
                  alt="Preview"
                  className="w-48 h-32 object-cover rounded-lg mt-3 shadow-sm border border-gray-200 dark:border-gray-600"
                />
              )}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description (Optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Event details"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            {/* Gallery Images */}
            <div className="sm:col-span-2 mt-4 pt-6 border-t border-gray-100 dark:border-gray-700">
              <label className="block text-sm font-bold mb-1 text-gray-900 dark:text-white">Event Gallery Photos (Optional)</label>
              <p className="text-xs text-gray-500 mb-3">Upload multiple photos from this event. These will automatically populate the public Gallery page.</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleGalleryChange}
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer text-sm text-gray-600 dark:text-gray-300"
              />
              
              {formData.galleryImages && formData.galleryImages.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  {formData.galleryImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img src={img} alt={`Gallery ${idx}`} className="w-24 h-24 object-cover rounded-lg shadow-sm border border-gray-200 dark:border-gray-600" />
                      <button 
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                        title="Remove image"
                        type="button"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={editId ? handleUpdateEvent : handleAddEvent}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-medium shadow-md transition-all ${
                editId
                  ? "bg-green-600 hover:bg-green-700 shadow-green-600/20"
                  : "bg-orange-600 hover:bg-orange-700 shadow-orange-600/20"
              }`}
            >
              {editId ? (
                <>
                  <Edit className="h-5 w-5" /> Update Event
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" /> Save Event
                </>
              )}
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col group hover:border-orange-300 transition-colors"
            >
              {event.thumbnail && (
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{event.title}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <p><strong>Date:</strong> {event.date} at {event.time}</p>
                <p><strong>Location:</strong> {event.location}</p>
              </div>
              
              {event.description && (
                <p className="text-sm text-gray-500 mt-4 line-clamp-3">{event.description}</p>
              )}

              {event.galleryImages && event.galleryImages.length > 0 && (
                <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 w-fit">
                  <ImageIcon size={14} /> {event.galleryImages.length} Gallery Photos
                </div>
              )}

              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                <button
                  onClick={() => handleEdit(event)}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 dark:text-blue-400 rounded-lg py-2 transition-colors flex items-center justify-center gap-1.5 font-medium text-sm"
                >
                  <Edit className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 rounded-lg py-2 transition-colors flex items-center justify-center gap-1.5 font-medium text-sm"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick draggable theme="colored" />
    </AdminLayout>
  );
};

export default EventsAdmin;
