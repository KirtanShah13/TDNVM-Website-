// project/src/pages/admin/GalleryAdmin.tsx
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [newGallery, setNewGallery] = useState<Omit<GalleryItem, "id">>({
    title: "",
    description: "",
    year: "2024",
    tag: "Cultural",
    date: "",
    location: "",
    folderUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editId, setEditId] = useState<number | null>(null);

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("gallery");
    if (stored) setGallery(JSON.parse(stored));
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("gallery", JSON.stringify(gallery));
  }, [gallery]);

  // ✅ Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!newGallery.title.trim()) newErrors.title = "Title is required";
    if (!newGallery.description.trim()) newErrors.description = "Description is required";
    if (!newGallery.year.trim()) newErrors.year = "Year is required";
    if (!newGallery.tag.trim()) newErrors.tag = "Tag is required";
    if (!newGallery.date.trim()) newErrors.date = "Date is required";
    if (!newGallery.location.trim()) newErrors.location = "Location is required";
    if (!newGallery.folderUrl.trim()) newErrors.folderUrl = "Folder URL is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted errors", { autoClose: 5000 });
      return false;
    }
    return true;
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
    setErrors({});
    setEditId(null);
  };

  // ✅ Add or Update Gallery
  const handleSaveGallery = () => {
    if (!validateForm()) return;

    if (editId !== null) {
      setGallery(
        gallery.map((item) =>
          item.id === editId ? { id: editId, ...newGallery } : item
        )
      );
      toast.success("Gallery event updated successfully!");
    } else {
      setGallery([...gallery, { id: Date.now(), ...newGallery }]);
      toast.success("Gallery event added successfully!");
    }

    resetForm();
  };

  const handleDelete = (id: number) => {
    setGallery(gallery.filter((item) => item.id !== id));
    toast.info("Gallery event deleted");
    if (editId === id) resetForm(); // clear form if deleting item being edited
  };

  const handleEdit = (item: GalleryItem) => {
    setNewGallery({
      title: item.title,
      description: item.description,
      year: item.year,
      tag: item.tag,
      date: item.date,
      location: item.location,
      folderUrl: item.folderUrl,
    });
    setEditId(item.id);
  };

  return (
    <AdminLayout>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Gallery
        </h1>

        {/* Add / Edit Gallery Item */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">
            {editId !== null ? "Edit Gallery Event" : "Add New Gallery Event"}
          </h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Title */}
            <div>
              <label className="block mb-1 text-sm font-medium">Title</label>
              <input
                type="text"
                placeholder="Event Title"
                value={newGallery.title}
                onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                className="input w-full"
              />
              {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
            </div>

            {/* Year */}
            <div>
              <label className="block mb-1 text-sm font-medium">Year</label>
              <select
                value={newGallery.year}
                onChange={(e) => setNewGallery({ ...newGallery, year: e.target.value })}
                className="input w-full"
              >
                {yearOptions.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
              {errors.year && <p className="text-red-600 text-sm">{errors.year}</p>}
            </div>

            {/* Tag */}
            <div>
              <label className="block mb-1 text-sm font-medium">Tag</label>
              <select
                value={newGallery.tag}
                onChange={(e) => setNewGallery({ ...newGallery, tag: e.target.value })}
                className="input w-full"
              >
                {tagOptions.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              {errors.tag && <p className="text-red-600 text-sm">{errors.tag}</p>}
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1 text-sm font-medium">Date</label>
              <input
                type="date"
                value={newGallery.date}
                onChange={(e) => setNewGallery({ ...newGallery, date: e.target.value })}
                className="input w-full"
              />
              {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block mb-1 text-sm font-medium">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                value={newGallery.location}
                onChange={(e) => setNewGallery({ ...newGallery, location: e.target.value })}
                className="input w-full"
              />
              {errors.location && <p className="text-red-600 text-sm">{errors.location}</p>}
            </div>

            {/* Folder URL */}
            <div>
              <label className="block mb-1 text-sm font-medium">Folder URL</label>
              <input
                type="text"
                placeholder="Paste folder URL"
                value={newGallery.folderUrl}
                onChange={(e) => setNewGallery({ ...newGallery, folderUrl: e.target.value })}
                className="input w-full"
              />
              {errors.folderUrl && <p className="text-red-600 text-sm">{errors.folderUrl}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              placeholder="Event description..."
              value={newGallery.description}
              onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
              className="input w-full"
              rows={3}
            />
            {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
          </div>

          <button
            onClick={handleSaveGallery}
            className="btn-primary mt-4 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> {editId !== null ? "Update Gallery Event" : "Add Gallery Event"}
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
              <div className="flex gap-2 mt-4 self-end">
                <button
                  onClick={() => handleEdit(item)}
                  className="btn-secondary flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
        position="top-center"
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

export default GalleryAdmin;
