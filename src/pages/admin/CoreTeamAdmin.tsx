// project/src/pages/admin/CoreTeamAdmin.tsx
import React, { useEffect, useState } from "react";
import { Plus, Trash2, Mail, Phone, Linkedin, Pencil, XCircle, ChevronUp, ChevronDown } from "lucide-react";
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
  displayOrder: number;
}

const CoreTeamAdmin: React.FC = () => {
  const [coreMembers, setCoreMembers] = useState<CoreMember[]>([]);
  const [formData, setFormData] = useState<Omit<CoreMember, "id" | "displayOrder">>({
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be under 2MB");
        return;
      }
      // Simulate file upload
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, avatar: imageUrl });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";

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
      // ➕ Add new member at the end of the list
      const nextOrder = coreMembers.length > 0 
        ? Math.max(...coreMembers.map(m => m.displayOrder || 0)) + 1 
        : 1;

      setCoreMembers([...coreMembers, { id: uuidv4(), ...formData, displayOrder: nextOrder }]);
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
      window.scrollTo({ top: 0, behavior: "smooth" });
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
    const confirmDelete = window.confirm("Are you sure you want to delete this team member? This action cannot be undone.");
    if (confirmDelete) {
      setCoreMembers(coreMembers.filter((member) => member.id !== id));
      toast.info("Core team member deleted");
      if (editingMemberId === id) handleCancelEdit();
    }
  };

  // 🔄 Ordering Logic
  const moveUp = (index: number) => {
    if (index === 0) return; // Already at the top
    const newMembers = [...sortedMembers];
    
    // Swap display orders
    const tempOrder = newMembers[index].displayOrder;
    newMembers[index].displayOrder = newMembers[index - 1].displayOrder;
    newMembers[index - 1].displayOrder = tempOrder;

    setCoreMembers(newMembers);
  };

  const moveDown = (index: number) => {
    if (index === sortedMembers.length - 1) return; // Already at the bottom
    const newMembers = [...sortedMembers];
    
    // Swap display orders
    const tempOrder = newMembers[index].displayOrder;
    newMembers[index].displayOrder = newMembers[index + 1].displayOrder;
    newMembers[index + 1].displayOrder = tempOrder;

    setCoreMembers(newMembers);
  };

  // Sort members by displayOrder
  const sortedMembers = [...coreMembers].sort(
    (a, b) => (Number(a.displayOrder) || 0) - (Number(b.displayOrder) || 0)
  );

  return (
    <AdminLayout>
      <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Core Team
        </h1>

        {/* Add or Edit Core Team Member Form */}
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {editingMemberId ? "Edit Core Team Member" : "Add New Core Team Member"}
            </h2>
            {editingMemberId && (
              <button
                onClick={handleCancelEdit}
                className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
              >
                <XCircle className="h-5 w-5" /> Cancel Edit
              </button>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Role / Position *</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Secretary"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
            </div>

            {/* Bio */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Bio / Description</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Short description about their role and vision..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={3}
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 10 Years in Community Service"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Achievements */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Achievements</label>
              <input
                type="text"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                placeholder="Awards or Recognition"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">LinkedIn Profile URL</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Avatar */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer text-sm text-gray-600 dark:text-gray-300"
              />
              <p className="text-xs text-gray-500 mt-2">Recommended: 400x400px (Square). Max size: 2MB.</p>
              {formData.avatar && (
                <img
                  src={formData.avatar}
                  alt="Preview"
                  className="w-16 h-16 mt-3 rounded-full object-cover shadow-md border-2 border-orange-100 dark:border-gray-600"
                />
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleAddOrUpdate}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-medium shadow-md transition-all ${
                editingMemberId
                  ? "bg-green-600 hover:bg-green-700 shadow-green-600/20"
                  : "bg-orange-600 hover:bg-orange-700 shadow-orange-600/20"
              }`}
            >
              {editingMemberId ? (
                <>
                  <Pencil className="h-5 w-5" /> Save Changes
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" /> Add Team Member
                </>
              )}
            </button>
          </div>
        </div>

        {/* Core Team List */}
        {sortedMembers.length > 0 && (
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Current Team Roster</h2>
        )}
        
        <div className="space-y-4">
          {sortedMembers.map((member, index) => (
            <div
              key={member.id}
              className="relative bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-6 group hover:border-orange-300 dark:hover:border-orange-500/50 transition-colors"
            >
              {/* Order Controls */}
              <div className="flex flex-row sm:flex-col items-center gap-2 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                <button 
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="p-1 rounded bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-orange-100 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
                  title="Move Up"
                >
                  <ChevronUp size={20} />
                </button>
                <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                <button 
                  onClick={() => moveDown(index)}
                  disabled={index === sortedMembers.length - 1}
                  className="p-1 rounded bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-orange-100 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
                  title="Move Down"
                >
                  <ChevronDown size={20} />
                </button>
              </div>

              {/* Avatar */}
              <img
                src={member.avatar || "/default-avatar.png"}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover shadow-sm border border-gray-100 dark:border-gray-600"
              />
              
              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-orange-600 dark:text-orange-400 font-medium text-sm mb-2">{member.role}</p>
                
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-600">
                      <Mail size={14} /> {member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a href={`tel:${member.phone}`} className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-600">
                      <Phone size={14} /> {member.phone}
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-600">
                      <Linkedin size={14} /> LinkedIn
                    </a>
                  )}
                </div>
              </div>

              {/* Edit + Delete buttons */}
              <div className="flex gap-2 sm:flex-col">
                <button
                  onClick={() => handleEdit(member.id)}
                  className="bg-gray-100 hover:bg-yellow-100 text-gray-700 hover:text-yellow-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-yellow-900/40 dark:hover:text-yellow-400 rounded-lg p-2.5 transition flex items-center justify-center"
                  title="Edit Member"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-900/40 dark:hover:text-red-400 rounded-lg p-2.5 transition flex items-center justify-center"
                  title="Delete Member"
                >
                  <Trash2 className="h-4 w-4" />
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

export default CoreTeamAdmin;
