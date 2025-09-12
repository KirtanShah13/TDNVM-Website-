// project/src/pages/admin/EventsAdmin.tsx
import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Edit, X } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  category: string;
  time: string;
  location: string;
  thumbnail?: string;
}

type NewEvent = Omit<Event, "id">;

const categoryOptions = ["Cultural", "Sports", "Technical", "Academic", "Other"];

const EventsAdmin: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<NewEvent>({
    title: "",
    date: "",
    description: "",
    category: "Cultural",
    time: "",
    location: "",
    thumbnail: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  // Auto-hide alert after 3s
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // Trap focus inside modal when open
  useEffect(() => {
    if (editingEvent && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>("input, textarea, select, button");
      focusable[0]?.focus();

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setEditingEvent(null);
        if (e.key === "Tab") {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [editingEvent]);

  const validateForm = (data: NewEvent) => {
    const newErrors: { [key: string]: string } = {};
    if (!data.title) newErrors.title = "Title is required";
    if (!data.date) newErrors.date = "Date is required";
    if (!data.location) newErrors.location = "Location is required";

    if (data.thumbnail && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(data.thumbnail)) {
      newErrors.thumbnail = "Thumbnail must be a valid image URL";
    }

    if (data.time && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]( ?[APMapm]{2})?$/.test(data.time) && data.time.toLowerCase() !== "tbd") {
      newErrors.time = "Time must be in HH:mm format or 'TBD'";
    }

    if (data.description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddEvent = () => {
    if (!validateForm(newEvent)) return;
    setEvents([...events, { id: Date.now(), ...newEvent }]);
    resetForm();
    setAlert({ type: "success", msg: "Event added successfully!" });
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
    setDeleteConfirmId(null);
    setAlert({ type: "success", msg: "Event deleted." });
  };

  const handleUpdateEvent = () => {
    if (!editingEvent) return;
    if (!validateForm(editingEvent)) return;
    setEvents(events.map((ev) => (ev.id === editingEvent.id ? editingEvent : ev)));
    setEditingEvent(null);
    setAlert({ type: "success", msg: "Event updated successfully!" });
  };

  const resetForm = () => {
    setNewEvent({
      title: "",
      date: "",
      description: "",
      category: "Cultural",
      time: "",
      location: "",
      thumbnail: "",
    });
    setErrors({});
  };

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <AdminLayout>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Events
        </h1>

        {alert && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              alert.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {alert.msg}
          </div>
        )}

        {/* Add new event */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block mb-1 text-sm font-medium">
                Event Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="input w-full"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block mb-1 text-sm font-medium">
                Date
              </label>
              <input
                id="date"
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="input w-full"
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block mb-1 text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                className="input w-full"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Time */}
            <div>
              <label htmlFor="time" className="block mb-1 text-sm font-medium">
                Time
              </label>
              <input
                id="time"
                type="text"
                placeholder="e.g. 18:00 or TBD"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="input w-full"
              />
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block mb-1 text-sm font-medium">
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="Enter location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="input w-full"
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            {/* Thumbnail */}
            <div>
              <label htmlFor="thumbnail" className="block mb-1 text-sm font-medium">
                Thumbnail Link
              </label>
              <input
                id="thumbnail"
                type="text"
                placeholder="Paste thumbnail URL"
                value={newEvent.thumbnail}
                onChange={(e) => setNewEvent({ ...newEvent, thumbnail: e.target.value })}
                className="input w-full"
              />
              {errors.thumbnail && <p className="text-red-500 text-xs mt-1">{errors.thumbnail}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label htmlFor="description" className="block mb-1 text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Event details..."
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="input w-full"
              rows={3}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <button
            onClick={handleAddEvent}
            className="btn-primary mt-4 flex items-center gap-2"
            aria-label="Add new event"
          >
            <Plus className="h-4 w-4" /> Add Event
          </button>
        </div>

        {/* Events list */}
        <div className="grid gap-4">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {event.title} <span className="text-sm text-gray-500">({event.category})</span>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {event.date} — {event.description}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ⏰ {event.time} | 📍 {event.location}
                </p>
                {event.thumbnail && (
                  <img
                    src={event.thumbnail}
                    alt={`${event.title} thumbnail`}
                    className="mt-2 w-32 h-20 object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingEvent(event)}
                  className="btn-secondary flex items-center gap-1"
                  aria-label={`Edit event ${event.title}`}
                >
                  <Edit className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => setDeleteConfirmId(event.id)}
                  className="btn-danger flex items-center gap-1"
                  aria-label={`Delete event ${event.title}`}
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {editingEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-2">
            <div
              ref={modalRef}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md relative"
            >
              <button
                onClick={() => setEditingEvent(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                aria-label="Close edit modal"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-semibold mb-4">Edit Event</h2>

              <input
                type="text"
                value={editingEvent.title}
                onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                className="input mb-2 w-full"
              />
              <input
                type="date"
                value={editingEvent.date}
                onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                className="input mb-2 w-full"
              />
              <select
                value={editingEvent.category}
                onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                className="input mb-2 w-full"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={editingEvent.time}
                onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                className="input mb-2 w-full"
              />
              <input
                type="text"
                value={editingEvent.location}
                onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                className="input mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Paste thumbnail URL"
                value={editingEvent.thumbnail}
                onChange={(e) => setEditingEvent({ ...editingEvent, thumbnail: e.target.value })}
                className="input mb-2 w-full"
              />
              <textarea
                value={editingEvent.description}
                onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                className="input mb-2 w-full"
                rows={3}
              />

              <button onClick={handleUpdateEvent} className="btn-primary mt-2 w-full">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirm Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-sm relative">
              <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete this event?</p>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setDeleteConfirmId(null)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteConfirmId)} className="btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default EventsAdmin;
