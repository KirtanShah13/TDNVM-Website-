// project/src/pages/admin/CoreTeamAdmin.tsx
import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";

interface CoreMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  experience: string;
  achievements: string;
  email: string;
  phone: string;
  linkedin: string;
  avatar: string;
}

// Random placeholder avatar (like Members)
const getRandomAvatar = () => {
  const seed = Math.floor(Math.random() * 10000);
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`;
};

const CoreTeamAdmin: React.FC = () => {
  const [coreMembers, setCoreMembers] = useState<CoreMember[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    experience: "",
    achievements: "",
    email: "",
    phone: "",
    linkedin: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMember = () => {
    if (!formData.name || !formData.role) return;
    setCoreMembers([
      ...coreMembers,
      { id: Date.now(), ...formData, avatar: getRandomAvatar() },
    ]);
    setFormData({
      name: "",
      role: "",
      bio: "",
      experience: "",
      achievements: "",
      email: "",
      phone: "",
      linkedin: "",
    });
  };

  const handleDelete = (id: number) => {
    setCoreMembers(coreMembers.filter((member) => member.id !== id));
  };

  return (
    <AdminLayout>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Core Team
        </h1>

        {/* Add Core Team Member Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Add New Core Team Member</h2>
          <div className="grid gap-4 sm:grid-cols-2">
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
            </div>

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
            </div>

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
              className="relative group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex flex-col items-center"
            >
              <img
                src={member.avatar}
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

              {/* Social Links */}
              <div className="flex gap-4 mt-3 text-blue-600 dark:text-blue-400">
                {member.email && (
                  <a href={`mailto:${member.email}`} title="Email">
                    📧
                  </a>
                )}
                {member.phone && (
                  <a href={`tel:${member.phone}`} title="Phone">
                    📞
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                  >
                    🔗
                  </a>
                )}
              </div>

              <button
                onClick={() => handleDelete(member.id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CoreTeamAdmin;
