// project/src/pages/admin/EventsAdmin.tsx
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../components/AdminLayout";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  category: string;
  thumbnail: string;
  location: string;
}

const EventsAdmin: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState<Omit<Event, "id">>({
    title: "",
    date: "",
    time: "",
    description: "",
    category: "",
    thumbnail: "",
    location: "",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validate Form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.date.trim()) newErrors.date = "Date is required";
    if (!formData.time.trim()) newErrors.time = "Time is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.thumbnail.trim()) newErrors.thumbnail = "Thumbnail URL is required";
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
      category: "",
      thumbnail: "",
      location: "",
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
      category: "",
      thumbnail: "",
      location: "",
    });
    setEditId(null);

    toast.success("Event updated successfully!");
  };

  // ✅ Delete Event
  const handleDelete = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
    toast.info("Event deleted");
  };

  // ✅ Edit Event
  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      description: event.description,
      category: event.category,
      thumbnail: event.thumbnail,
      location: event.location,
    });
    setEditId(event.id);
  };

  return (
    <AdminLayout>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Events
        </h1>

        {/* Add / Edit Event Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">
            {editId ? "Edit Event" : "Add New Event"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Event title"
                className="input w-full"
              />
              {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input w-full"
              />
              {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="input w-full"
              />
              {errors.time && <p className="text-red-600 text-sm">{errors.time}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input w-full"
              >
                <option value="">Select category</option>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Meetup">Meetup</option>
                <option value="Webinar">Webinar</option>
              </select>
              {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
              <input
                type="text"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="input w-full"
              />
              {errors.thumbnail && (
                <p className="text-red-600 text-sm">{errors.thumbnail}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Event location"
                className="input w-full"
              />
              {errors.location && (
                <p className="text-red-600 text-sm">{errors.location}</p>
              )}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Event details"
                rows={3}
                className="input w-full"
              />
              {errors.description && (
                <p className="text-red-600 text-sm">{errors.description}</p>
              )}
            </div>
          </div>

          <button
            onClick={editId ? handleUpdateEvent : handleAddEvent}
            className="mt-6 btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> {editId ? "Update Event" : "Add Event"}
          </button>
        </div>

        {/* Events List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex flex-col"
            >
              {event.thumbnail && (
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {event.date} at {event.time}
              </p>
              <p className="text-sm text-gray-500 mt-1">{event.description}</p>
              <p className="text-sm text-gray-500 mt-1">📍 {event.location}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                Category: {event.category}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(event)}
                  className="btn-secondary flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="btn-danger flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer
        position="top-center"   // ✅ Better for mobile screens
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        theme="colored"
      />
    </AdminLayout>
  );
};

export default EventsAdmin;
