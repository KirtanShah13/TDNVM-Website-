// project/src/pages/admin/MembersAdmin.tsx
import React, { useState, useEffect } from "react";
import { Plus, Trash2, User, Edit } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../components/AdminLayout";

interface Member {
  id: string;
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editId, setEditId] = useState<string | null>(null);

  // 🔍 Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Member[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("members");
    if (stored) setMembers(JSON.parse(stored));
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.dob.trim()) newErrors.dob = "Date of birth is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted errors");
      return false;
    }
    return true;
  };

  const handleAddMember = () => {
    if (!validateForm()) return;

    setMembers([...members, { id: Date.now().toString(), ...formData }]);
    setFormData({ name: "", address: "", dob: "" });
    toast.success("Member added successfully!");
  };

  const handleEdit = (member: Member) => {
    setFormData({ name: member.name, address: member.address, dob: member.dob });
    setEditId(member.id);
  };

  const handleUpdateMember = () => {
    if (!validateForm() || !editId) return;

    setMembers(
      members.map((member) =>
        member.id === editId ? { id: editId, ...formData } : member
      )
    );
    setFormData({ name: "", address: "", dob: "" });
    setEditId(null);
    toast.success("Member updated successfully!");
  };

  const handleDelete = (id: string) => {
    setMembers(members.filter((member) => member.id !== id));
    toast.info("Member deleted");
  };

  // 🔍 Handle search input (debounced)
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      handleSearch(searchTerm);
    }, 600); // waits 600ms after typing stops

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // 🔍 API call to search members by name
  const handleSearch = async (term: string) => {
    try {
      setIsSearching(true);
      // Replace this URL with your actual backend endpoint
      const res = await fetch(`/api/members/search?name=${encodeURIComponent(term)}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      toast.error("Failed to fetch search results");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <AdminLayout>
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Members
        </h1>

        {/* Add/Edit Member Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">
            {editId ? "Edit Member" : "Add New Member"}
          </h2>
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
              {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
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
              {errors.address && (
                <p className="text-red-600 text-sm">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="input w-full"
              />
              {errors.dob && <p className="text-red-600 text-sm">{errors.dob}</p>}
            </div>
          </div>

          <button
            onClick={editId ? handleUpdateMember : handleAddMember}
            className="mt-6 btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> {editId ? "Update Member" : "Add Member"}
          </button>
        </div>

        {/* 🔍 Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Members List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isSearching ? (
            <p className="text-center text-gray-500">Searching...</p>
          ) : searchTerm.trim() && searchResults.length === 0 ? (
            <p className="text-center text-gray-500">No members found.</p>
          ) : (
            (searchTerm.trim() ? searchResults : members).map((member) => (
              <div
                key={member.id}
                className="relative group bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 mb-3">
                  <User className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.address}</p>
                <p className="text-sm text-gray-500">{member.dob}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="btn-secondary flex items-center gap-1"
                  >
                    <Edit className="h-4 w-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="btn-danger flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
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

export default MembersAdmin;
