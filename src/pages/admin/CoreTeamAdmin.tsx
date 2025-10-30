// project/src/pages/admin/CoreTeamAdmin.tsx
import React, { useEffect, useState } from "react";
import { Plus, Trash2, Mail, Phone, Linkedin } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../components/AdminLayout";

interface CoreMember {
  id: string;
  name: string;
  designation: string;
  description: string;
  experience: string;
  achievements: string;
  email: string;
  phone: string;
  linkedin: string;
  photo?: string;
}

const CoreTeamAdmin: React.FC = () => {
  const [coreMembers, setCoreMembers] = useState<CoreMember[]>([]);
  const [formData, setFormData] = useState<Omit<CoreMember, "id">>({
    name: "",
    designation: "",
    description: "",
    experience: "",
    achievements: "",
    email: "",
    phone: "",
    linkedin: "",
    photo: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("coreMembers");
    if (stored) setCoreMembers(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("coreMembers", JSON.stringify(coreMembers));
  }, [coreMembers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted errors");
      return false;
    }
    return true;
  };

  const handleAddMember = () => {
    if (!validateForm()) return;

    fetch("http://127.0.0.1:8000/add_coreteam_en", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCoreMembers((prev) => [...prev, data.member]);
        setFormData({
          name: "",
          designation: "",
          photo: "",
          description: "",
          email: "",
          phone: "",
          linkedin: "",
          experience: "",
          achievements: "",
        });
        toast.success("Core team member added successfully!");
      })
      .catch((error) => {
        console.error("Error adding core team member:", error);
        toast.error("Failed to add core team member.");
      });
  };

  const handleDelete = (id: string) => {
    fetch("http://127.0.0.1:8000/delete_coreteam_en", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(
              errorData.detail || "Failed to delete core team member"
            );
          });
        }
        return res.json();
      })
      .then(() => {
        setCoreMembers((prev) => prev.filter((m) => m.id !== id));
        toast.success("Core team member deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting core team member:", error);
        toast.error(error.message || "Something went wrong while deleting.");
      });
  };

  return (
    <AdminLayout>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Core Team
        </h1>

        {/* Add Core Team Member Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">
            Add New Core Team Member
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="input w-full"
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Designation / Position
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. Secretary"
                className="input w-full"
              />
              {errors.designation && (
                <p className="text-red-600 text-sm">{errors.designation}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Bio / Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Short description"
                className="input w-full"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Experience (Years)
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 3 years"
                className="input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Achievements
              </label>
              <input
                type="text"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                placeholder="Awards, Recognition"
                className="input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="input w-full"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn profile URL"
                className="input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Profile Picture URL
              </label>
              <input
                type="url"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                placeholder="Enter Image Link"
                className="input w-full"
              />
              {formData.photo && (
                <img
                  src={formData.photo}
                  alt="Preview"
                  className="w-16 h-16 mt-2 rounded-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
            </div>
          </div>

          <button
            onClick={handleAddMember}
            className="mt-6 btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Core Team Member
          </button>
        </div>

        {/* Core Team List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreMembers.map((member) => (
            <div
              key={member.id}
              className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex flex-col items-center"
            >
              <img
                src={member.photo || "/default-photo.png"}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {member.designation}
              </p>
              <p className="text-sm text-gray-500 mt-1">{member.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                <strong>Experience:</strong> {member.experience}
              </p>
              <p className="text-sm text-gray-500">{member.achievements}</p>

              <div className="flex gap-4 mt-3 text-blue-600 dark:text-blue-400">
                {member.email && (
                  <a href={`mailto:${member.email}`} aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </a>
                )}
                {member.phone && (
                  <a href={`tel:${member.phone}`} aria-label="Phone">
                    <Phone className="h-5 w-5" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
              </div>

              <button
                onClick={() => setConfirmDeleteId(member.id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 transition"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this core team member?
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

export default CoreTeamAdmin;
