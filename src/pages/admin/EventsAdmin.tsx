// project/src/pages/admin/EventsAdmin.tsx
import React, { useState } from "react";
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
  status: string;
}

const categoryOptions = ["Cultural", "Sports", "Technical", "Academic", "Other"];
const statusOptions = ["Upcoming", "Ongoing", "Completed"];

const EventsAdmin: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
    category: "Cultural",
    time: "",
    location: "",
    status: "Upcoming",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!newEvent.title) newErrors.title = "Title is required";
    if (!newEvent.date) newErrors.date = "Date is required";
    if (!newEvent.location) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddEvent = () => {
    if (!validateForm()) return;
    setEvents([...events, { id: Date.now(), ...newEvent }]);
    resetForm();
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleUpdateEvent = () => {
    if (!editingEvent) return;
    setEvents(events.map((ev) => (ev.id === editingEvent.id ? editingEvent : ev)));
    setEditingEvent(null);
  };

  const resetForm = () => {
    setNewEvent({
      title: "",
      date: "",
      description: "",
      category: "Cultural",
      time: "",
      location: "",
      status: "Upcoming",
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

        {/* Add new event */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label htmlFor="date" className="block mb-1 text-sm font-medium">
                Date
              </label>
              <input
                id="date"
                type="date"
                placeholder="6:00 PM or TBD"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="input w-full"
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="category"
                className="block mb-1 text-sm font-medium"
              >
                Category
              </label>
              <select
                id="category"
                value={newEvent.category}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, category: e.target.value })
                }
                className="input w-full"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="time" className="block mb-1 text-sm font-medium">
                Time
              </label>
              <input
                id="time"
                type="text"
                placeholder="e.g. 6:00 PM or TBD"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="input w-full"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block mb-1 text-sm font-medium"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="Enter location"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                className="input w-full"
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">{errors.location}</p>
              )}
            </div>

            <div>
              <label htmlFor="status" className="block mb-1 text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                value={newEvent.status}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, status: e.target.value })
                }
                className="input w-full"
              >
                {statusOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Event details..."
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="input w-full"
              rows={3}
            />
          </div>

          <button
            onClick={handleAddEvent}
            className="btn-primary mt-4 flex items-center gap-2"
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
                  {event.title}{" "}
                  <span className="text-sm text-gray-500">
                    ({event.category})
                  </span>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {event.date} — {event.description}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ⏰ {event.time} | 📍 {event.location} | 📌 {event.status}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingEvent(event)}
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

        {/* Edit Modal */}
        {editingEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setEditingEvent(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-semibold mb-4">Edit Event</h2>

              <input
                type="text"
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, title: e.target.value })
                }
                className="input mb-2 w-full"
              />
              <input
                type="date"
                value={editingEvent.date}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, date: e.target.value })
                }
                className="input mb-2 w-full"
              />
              <select
                value={editingEvent.category}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, category: e.target.value })
                }
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
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, time: e.target.value })
                }
                className="input mb-2 w-full"
              />
              <input
                type="text"
                value={editingEvent.location}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, location: e.target.value })
                }
                className="input mb-2 w-full"
              />
              <select
                value={editingEvent.status}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, status: e.target.value })
                }
                className="input mb-2 w-full"
              >
                {statusOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              <textarea
                value={editingEvent.description}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    description: e.target.value,
                  })
                }
                className="input mb-2 w-full"
                rows={3}
              />

              <button
                onClick={handleUpdateEvent}
                className="btn-primary mt-2 w-full"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default EventsAdmin;
