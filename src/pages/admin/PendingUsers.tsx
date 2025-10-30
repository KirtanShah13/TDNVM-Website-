// project/src/pages/admin/PendingUsers.tsx
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PendingUser {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  state: string;
}

const PendingUsers: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [confirmRejectId, setConfirmRejectId] = useState<string | null>(null);

  // ✅ Load pending users from localStorage, seed if empty
  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/pending")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPendingUsers(data.pending_users); // assuming API returns an array of PendingUser
        localStorage.setItem("pendingUsers", JSON.stringify(data)); // optional caching
        localStorage.setItem("pendingUsersCount", String(data.length));
      })
      .catch((err) => {
        console.error("Error fetching pending users:", err);
        toast.error("Failed to load pending users");
      });
  }, []);

  // ✅ Save back to localStorage whenever changes happen + save count for sidebar
  useEffect(() => {
    localStorage.setItem("pendingUsers", JSON.stringify(pendingUsers));
    localStorage.setItem("pendingUsersCount", String(pendingUsers.length));
  }, [pendingUsers]);

  const handleApprove = (id: string) => {
    const user = pendingUsers.find((u) => u.id === id);
    if (!user) {
      toast.error("User not found!");
      return;
    }

    fetch(`http://127.0.0.1:8000/users/update_status`, {
      method: "PUT",
      body: JSON.stringify({ phone: user.phone, status: "approved" }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setPendingUsers(pendingUsers.filter((u) => u.id !== id));
        toast.success(
          `${user.first_name} ${user.last_name} approved successfully!`
        );
      })
      .catch(() => toast.error("Failed to approve user"));
  };

  const handleRejectConfirm = (id: string) => {
    const user = pendingUsers.find((u) => u.id === id);
    if (!user) {
      toast.error("User not found!");
      return;
    }
    fetch(`http://127.0.0.1:8000/users/update_status`, {
      method: "PUT",
      body: JSON.stringify({ phone: user.phone, status: "denied" }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setPendingUsers(pendingUsers.filter((u) => u.id !== id));
        toast.success(
          `${user.first_name} ${user.last_name} denied successfully!`
        );
        setConfirmRejectId(null);
      })
      .catch(() => toast.error("Failed to approve user"));
  };

  return (
    <AdminLayout>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Pending User Approvals
        </h1>

        {pendingUsers.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No users are waiting for approval.
          </p>
        ) : (
          <div className="overflow-x-auto">
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
                {pendingUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-3 text-sm font-medium">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="p-3 text-sm">{user.phone}</td>
                    <td className="p-3 text-sm">{user.city}</td>
                    <td className="p-3 text-sm">{user.state}</td>
                    <td className="p-3 flex gap-4">
                      <button
                        onClick={() => handleApprove(user.id)}
                        className="flex items-center gap-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                      >
                        <CheckCircle className="h-4 w-4" /> Approve
                      </button>
                      <button
                        onClick={() => setConfirmRejectId(user.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <XCircle className="h-4 w-4" /> Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Confirmation Dialog (same style as ApprovedMembers) */}
      {confirmRejectId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Rejection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to reject this user?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmRejectId(null)}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRejectConfirm(confirmRejectId)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Reject
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

export default PendingUsers;
