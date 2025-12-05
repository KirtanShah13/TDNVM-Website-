// project/src/pages/admin/EventsAdmin.tsx
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../components/AdminLayout";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  year: string;
  category: string;
  images: string;
}

const EventsAdmin: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState<Omit<Event, "id">>({
    title: "",
    description: "",
    date: "",
    location: "",
    year: "",
    category: "",
    images: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("events");
    loadGalleryFromBackend();
    if (stored) setEvents(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.date.trim()) newErrors.date = "Date is required";
    if (!formData.year.trim()) newErrors.year = "Year is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.images.trim()) newErrors.images = "Images URL is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted errors");
      return false;
    }
    return true;
  };

  
  const loadGalleryFromBackend = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/events_en");
    const data = await res.json();

    // Adjust depending on your backend response shape
    const events = data.events || data || [];
    console.log("Fetched gallery from backend:", events);
    // Save to localStorage
    localStorage.setItem("gallery", JSON.stringify(events));

    // Update React state
    setEvents(events);
  } catch (error) {
    console.error("Failed to load gallery from backend:", error);
  }
};

  const handleAddEvent = () => {
    if (!validateForm()) return;

    const payload = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      year: new Date(formData.date).getFullYear(),
      category: formData.category,
      images: formData.images
        ? formData.images.split(",").map((img) => img.trim())
        : [],
    };

    fetch("http://127.0.0.1:8000/add_events_en", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setEvents((prev) => [...prev, data.event]);
        setFormData({
          title: "",
          description: "",
          date: "",
          location: "",
          year: "",
          category: "",
          images: "",
        });
        toast.success("Event added successfully!");
      })
      .catch((error) => {
        console.error("Error adding event:", error);
        toast.error("Failed to add event.");
      });
  };

  const handleUpdateEvent = () => {
    if (!editId) return;

    const payload = { id: editId, ...formData };

    fetch("http://127.0.0.1:8000/update_event_en", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((errorData) => {
            throw new Error(errorData.detail || "Failed to update event");
          });
        console.log("Update response:", res);

        return res.json();
      })
      .then((data) => {
        setEvents((prev) =>
          prev.map((e) => (e.id === editId ? { ...e, ...data } : e))
        );
        toast.success(data.message || "Event updated successfully!");
        setFormData({
          title: "",
          description: "",
          date: "",
          location: "",
          year: "",
          category: "",
          images: "",
        });
        setEditId(null);
      })
      .catch((error) => {
        console.error("Error updating event:", error);
        toast.error(error.message || "Something went wrong");
      });
  };

  const handleDelete = (id: string) => {
    fetch("http://127.0.0.1:8000/delete_event_en", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((errorData) => {
            throw new Error(errorData.detail || "Failed to delete event");
          });
        return res.json();
      })
      .then(() => {
        setEvents((prev) => prev.filter((e) => e.id !== id));
        toast.success("Event deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        toast.error(error.message || "Something went wrong while deleting.");
      });
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      year: event.year,
      category: event.category,
      images: event.images,
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
                className="input w-full"
              />
              {errors.title && (
                <p className="text-red-600 text-sm">{errors.title}</p>
              )}
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
              {errors.date && (
                <p className="text-red-600 text-sm">{errors.date}</p>
              )}
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="input w-full"
              />
              {errors.year && (
                <p className="text-red-600 text-sm">{errors.year}</p>
              )}
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
              {errors.category && (
                <p className="text-red-600 text-sm">{errors.category}</p>
              )}
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Images URL
              </label>
              <input
                type="text"
                name="images"
                value={formData.images}
                onChange={handleChange}
                className="input w-full"
              />
              {errors.images && (
                <p className="text-red-600 text-sm">{errors.images}</p>
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
                className="input w-full"
              />
              {errors.location && (
                <p className="text-red-600 text-sm">{errors.location}</p>
              )}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
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
              {event.images && (
                <img
                  src={event.images}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {event.date} at {event.year}
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
                  onClick={() => setConfirmDeleteId(event.id)}
                  className="btn-danger flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Confirmation Modal */}
        {confirmDeleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Confirm Delete
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete this event?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDelete(confirmDeleteId);
                    setConfirmDeleteId(null);
                  }}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </AdminLayout>
  );
};

export default EventsAdmin;
