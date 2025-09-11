// project/src/pages/admin/MembersAdmin.tsx
import React, { useState } from "react";
import { Plus, Trash2, User } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";

interface Member {
  id: number;
  name: string;
  address: string;
  dob: string;
}

const MembersAdmin: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    dob: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMember = () => {
    if (!formData.name || !formData.address || !formData.dob) return;
    setMembers([
      ...members,
      { id: Date.now(), ...formData },
    ]);
    setFormData({ name: "", address: "", dob: "" });
  };

  const handleDelete = (id: number) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <AdminLayout>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Members
        </h1>

        {/* Add Member Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Add New Member</h2>
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
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
          </div>

          <button
            onClick={handleAddMember}
            className="mt-6 btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Member
          </button>
        </div>

        {/* Members List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="relative group bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 mb-3">
                <User className="h-12 w-12 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {member.address}
              </p>
              <p className="text-sm text-gray-500">{member.dob}</p>

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

export default MembersAdmin;
