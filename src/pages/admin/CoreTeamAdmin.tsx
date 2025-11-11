// project/src/pages/admin/CoreTeamAdmin.tsx
import React, { useEffect, useState } from "react";
import { Plus, Trash2, Mail, Phone, Linkedin, Pencil, XCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../components/AdminLayout";

interface CoreMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  experience: string;
  achievements: string;
  email: string;
  phone: string;
  linkedin: string;
  avatar?: string;
}

const CoreTeamAdmin: React.FC = () => {
  const [coreMembers, setCoreMembers] = useState<CoreMember[]>([]);
  const [formData, setFormData] = useState<Omit<CoreMember, "id">>({
    name: "",
    role: "",
    bio: "",
    experience: "",
    achievements: "",
    email: "",
    phone: "",
    linkedin: "",
    avatar: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("coreMembers");
    if (stored) setCoreMembers(JSON.parse(stored));
  }, []);

  // ✅ Save to localStorage
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
    if (!formData.role.trim()) newErrors.role = "Role is required";
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

  const handleAddOrUpdate = () => {
    if (!validateForm()) return;

    if (editingMemberId) {
      // 🧩 Update existing member
      setCoreMembers((prev) =>
        prev.map((m) =>
          m.id === editingMemberId ? { ...m, ...formData } : m
        )
      );
      toast.success("Core team member updated successfully!");
      setEditingMemberId(null);
    } else {
      // ➕ Add new member
      setCoreMembers([...coreMembers, { id: uuidv4(), ...formData }]);
      toast.success("Core team member added successfully!");
    }

    // Reset form
    setFormData({
      name: "",
      role: "",
      bio: "",
      experience: "",
      achievements: "",
      email: "",
      phone: "",
      linkedin: "",
      avatar: "",
    });
  };

  const handleEdit = (id: string) => {
    const member = coreMembers.find((m) => m.id === id);
    if (member) {
      setFormData({
        name: member.name,
        role: member.role,
        bio: member.bio,
        experience: member.experience,
        achievements: member.achievements,
        email: member.email,
        phone: member.phone,
        linkedin: member.linkedin,
        avatar: member.avatar || "",
      });
      setEditingMemberId(id);
      toast.info("Editing mode activated");
    }
  };

  const handleCancelEdit = () => {
    setEditingMemberId(null);
    setFormData({
      name: "",
      role: "",
      bio: "",
      experience: "",
      achievements: "",
      email: "",
      phone: "",
      linkedin: "",
      avatar: "",
    });
    toast.info("Edit cancelled");
  };

  const handleDelete = (id: string) => {
    setCoreMembers(coreMembers.filter((member) => member.id !== id));
    toast.info("Core team member deleted");
    if (editingMemberId === id) handleCancelEdit();
  };

  return (
    <AdminLayout>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Core Team
        </h1>

        {/* Add or Edit Core Team Member Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {editingMemberId ? "Edit Core Team Member" : "Add New Core Team Member"}
            </h2>
            {editingMemberId && (
              <button
                onClick={handleCancelEdit}
                className="text-red-600 flex items-center gap-1"
              >
                <XCircle className="h-5 w-5" /> Cancel Edit
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="input w-full"
              />
              {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1">Role / Position</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Secretary"
                className="input w-full"
              />
              {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}
            </div>

            {/* Bio */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Bio / Description</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Short description"
                className="input w-full"
                rows={2}
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium mb-1">Experience (Years)</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 3 years"
                className="input w-full"
              />
            </div>

            {/* Achievements */}
            <div>
              <label className="block text-sm font-medium mb-1">Achievements</label>
              <input
                type="text"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                placeholder="Awards, Recognition"
                className="input w-full"
              />
            </div>

            {/* Email */}
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
              {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            </div>

            {/* Phone */}
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

            {/* LinkedIn */}
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

            {/* Avatar */}
            <div>
              <label className="block text-sm font-medium mb-1">Profile Picture (URL)</label>
              <input
                type="url"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="enter the image link"
                className="input w-full"
              />
              {formData.avatar && (
                <img
                  src={formData.avatar}
                  alt="Preview"
                  className="w-16 h-16 mt-2 rounded-full object-cover"
                />
              )}
            </div>
          </div>

          <button
  onClick={handleAddOrUpdate}
  className={`mt-6 flex items-center gap-2 px-4 py-2 rounded-lg text-white transition ${
    editingMemberId
      ? "bg-green-600 hover:bg-green-700"
      : "bg-orange-500 hover:bg-orange-600"
  }`}
>
  {editingMemberId ? (
    <>
      <Pencil className="h-4 w-4" /> Update Member
    </>
  ) : (
    <>
      <Plus className="h-4 w-4" /> Add Core Team Member
    </>
  )}
</button>

        </div>

        {/* Core Team Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreMembers.map((member) => (
            <div
              key={member.id}
              className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex flex-col items-center"
            >
              <img
                src={member.avatar || "/default-avatar.png"}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
              <p className="text-sm text-gray-500 mt-1">{member.bio}</p>
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

              {/* Edit + Delete buttons */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEdit(member.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-2 transition"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
