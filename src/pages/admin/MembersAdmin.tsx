// project/src/pages/admin/MembersAdmin.tsx
import React, { useState, useEffect } from "react";
import { Plus, Trash2, User, Edit } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../components/AdminLayout";

interface Member {
  srno: number;
  fullname: string;
  address: string;
  birthdate: string;
}

const MembersAdmin: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    birthdate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("members");
    if (stored) setMembers(JSON.parse(stored));
  }, []);

  // Save to localStorage
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
    if (!formData.fullname.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.birthdate.trim()) newErrors.dob = "Date of birth is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted errors");
      return false;
    }
    return true;
  };

  const handleAddMember = () => {
    if (!validateForm()) return;

    fetch("http://127.0.0.1:8000/add_member_en", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(
              err.detail || `HTTP error! Status: ${response.status}`
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        setMembers((prev) => [...prev, data.member]);
        toast.success("Member added successfully!");
        setFormData({ fullname: "", address: "", birthdate: "" });
      })
      .catch((error) => {
        console.error("Error adding member:", error);
        toast.error(error.message || "Failed to add member");
      });
  };

  const handleEdit = (member: Member) => {
    setFormData({
      fullname: member.fullname,
      address: member.address,
      birthdate: member.birthdate ? member.birthdate.split("T")[0] : "",
    });
    setEditId(member.srno);
  };

  const handleUpdateMember = () => {
    if (!validateForm() || !editId) return;

    const tempMember = { srno: editId, ...formData };
    fetch(`http://127.0.0.1:8000/update_member_en`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempMember),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.detail || "Failed to update member");
          });
        }
        return response.json();
      })
      .then((data) => {
        setMembers((prev) =>
          prev.map((m) => (m.srno === editId ? { ...m, ...formData } : m))
        );
        toast.success(data.message || "Member updated successfully!");
        setFormData({ fullname: "", address: "", birthdate: "" });
        setEditId(null);
      })
      .catch((error) => {
        console.error("Error updating member:", error);
        toast.error(error.message || "Something went wrong");
      });
  };

  const handleDelete = (srno: number) => {
    fetch(`http://127.0.0.1:8000/delete_member_en`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ srno }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.detail || "Failed to delete member");
          });
        }
        return response.json();
      })
      .then(() => {
        setMembers((prev) => prev.filter((m) => m.srno !== srno));
        toast.success("Member deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting member:", error);
        toast.error(error.message || "Something went wrong while deleting.");
      });
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
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter full name"
                className="input w-full"
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
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
              <label className="block text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                className="input w-full"
              />
              {errors.dob && (
                <p className="text-red-600 text-sm">{errors.dob}</p>
              )}
            </div>
          </div>

          <button
            onClick={editId ? handleUpdateMember : handleAddMember}
            className="mt-6 btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />{" "}
            {editId ? "Update Member" : "Add Member"}
          </button>
        </div>

        {/* Members List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.srno}
              className="relative group bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 mb-3">
                <User className="h-12 w-12 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold">{member.fullname}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {member.address}
              </p>
              <p className="text-sm text-gray-500">{member.birthdate}</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="btn-secondary flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => setConfirmDeleteId(member.srno)}
                  className="btn-danger flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
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
              Are you sure you want to delete this member?
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

export default MembersAdmin;
