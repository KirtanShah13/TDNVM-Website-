// project/src/pages/admin/GalleryAdmin.tsx
import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  year: string;
  tag: string;
  date: string;
  location: string;
  folderUrl: string;
}

const yearOptions = ["2021", "2022", "2023", "2024", "2025"];
const tagOptions = ["Cultural", "Sports", "Technical", "Academic", "Other"];

const GalleryAdmin: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [newGallery, setNewGallery] = useState({
    title: "",
    description: "",
    year: "2024",
    tag: "Cultural",
    date: "",
    location: "",
    folderUrl: "",
  });

  const handleAddGallery = () => {
    if (!newGallery.title || !newGallery.folderUrl) return;
    setGallery([...gallery, { id: Date.now(), ...newGallery }]);
    resetForm();
  };

  const handleDelete = (id: number) => {
    setGallery(gallery.filter((item) => item.id !== id));
  };

  const resetForm = () => {
    setNewGallery({
      title: "",
      description: "",
      year: "2024",
      tag: "Cultural",
      date: "",
      location: "",
      folderUrl: "",
    });
  };

  return (
    <AdminLayout>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Gallery
        </h1>

        {/* Add new gallery item */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Add New Gallery Event</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block mb-1 text-sm font-medium">Title</label>
              <input
                type="text"
                placeholder="Event Title"
                value={newGallery.title}
                onChange={(e) =>
                  setNewGallery({ ...newGallery, title: e.target.value })
                }
                className="input w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Year</label>
              <select
                value={newGallery.year}
                onChange={(e) =>
                  setNewGallery({ ...newGallery, year: e.target.value })
                }
                className="input w-full"
              >
                {yearOptions.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Tag</label>
              <select
                value={newGallery.tag}
                onChange={(e) =>
                  setNewGallery({ ...newGallery, tag: e.target.value })
                }
                className="input w-full"
              >
                {tagOptions.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Date</label>
              <input
                type="date"
                value={newGallery.date}
                onChange={(e) =>
                  setNewGallery({ ...newGallery, date: e.target.value })
                }
                className="input w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                value={newGallery.location}
                onChange={(e) =>
                  setNewGallery({ ...newGallery, location: e.target.value })
                }
                className="input w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Folder URL</label>
              <input
                type="text"
                placeholder="Paste folder URL"
                value={newGallery.folderUrl}
                onChange={(e) =>
                  setNewGallery({ ...newGallery, folderUrl: e.target.value })
                }
                className="input w-full"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-1 text-sm font-medium">
              Description
            </label>
            <textarea
              placeholder="Event description..."
              value={newGallery.description}
              onChange={(e) =>
                setNewGallery({ ...newGallery, description: e.target.value })
              }
              className="input w-full"
              rows={3}
            />
          </div>

          <button
            onClick={handleAddGallery}
            className="btn-primary mt-4 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Gallery Event
          </button>
        </div>

        {/* Gallery list */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  🏷 {item.tag} | 📅 {item.date} | 📍 {item.location} | 📂{" "}
                  <a
                    href={item.folderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Open Folder
                  </a>
                </p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="btn-danger flex items-center gap-1 mt-4 self-end"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default GalleryAdmin;
