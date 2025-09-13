// project/src/pages/admin/ApprovedMembers.tsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Search, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  state: string;
}

const ApprovedMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // ✅ Load approved members from localStorage OR add mock data
  useEffect(() => {
    const stored = localStorage.getItem("members");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) {
        setMembers(parsed);
        return;
      }
    }

    // 🔹 If nothing in storage → seed mock data
    const mockMembers: Member[] = [
      {
        id: "1",
        firstName: "Amit",
        lastName: "Sharma",
        phone: "9876543210",
        city: "Delhi",
        state: "Delhi",
      },
      {
        id: "2",
        firstName: "Priya",
        lastName: "Verma",
        phone: "9123456780",
        city: "Mumbai",
        state: "Maharashtra",
      },
      {
        id: "3",
        firstName: "Rohit",
        lastName: "Patel",
        phone: "9988776655",
        city: "Ahmedabad",
        state: "Gujarat",
      },
    ];
    setMembers(mockMembers);
    localStorage.setItem("members", JSON.stringify(mockMembers));
  }, []);

  // ✅ Save back to localStorage when members update
  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  const handleDelete = (id: string) => {
    const user = members.find((m) => m.id === id);
    if (!user) return;

    setMembers(members.filter((m) => m.id !== id));
    toast.info(`${user.firstName} removed from approved members`);
    setConfirmDeleteId(null);
  };

  // ✅ Filtered members based on search term
  const filteredMembers = members.filter((m) =>
    `${m.firstName} ${m.lastName} ${m.city} ${m.state}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Approved Members
        </h1>

        {/* 🔍 Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search members..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ✅ Empty State */}
        {filteredMembers.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No approved members found.
          </p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                    <th className="p-3 text-sm font-semibold">Name</th>
                    <th className="p-3 text-sm font-semibold">Phone</th>
                    <th className="p-3 text-sm font-semibold">City</th>
                    <th className="p-3 text-sm font-semibold">State</th>
                    <th className="p-3 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="p-3 text-sm">
                        {member.firstName} {member.lastName}
                      </td>
                      <td className="p-3 text-sm">{member.phone}</td>
                      <td className="p-3 text-sm">{member.city}</td>
                      <td className="p-3 text-sm">{member.state}</td>
                      <td className="p-3">
                        <button
                          onClick={() => setConfirmDeleteId(member.id)}
                          className="flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded"
                        >
                          <Trash2 className="h-4 w-4" /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-4">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.phone}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.city}, {member.state}
                  </p>
                  <button
                    onClick={() => setConfirmDeleteId(member.id)}
                    className="mt-2 flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ✅ Confirmation Dialog */}
        {confirmDeleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Confirm Removal
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to remove this member?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmDeleteId)}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </AdminLayout>
  );
};

export default ApprovedMembers;

// just make the uniformity in the pending and approved member when the choice is made to reject or approve the user