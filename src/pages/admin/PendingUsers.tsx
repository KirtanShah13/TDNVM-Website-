// project/src/pages/admin/PendingUsers.tsx
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔹 Reusable Loading Overlay Component
const LoadingOverlay: React.FC<{ message?: string }> = ({ message }) => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/70 dark:bg-gray-900/70 z-50">
    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    {message && (
      <p className="mt-4 text-gray-800 dark:text-gray-200 font-medium">
        {message}
      </p>
    )}
  </div>
);


interface PendingUser {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  state: string;
}

const PendingUsers: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [confirmRejectId, setConfirmRejectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // ✅ New loading state

  // ✅ Load pending users (simulate API with timeout)
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const stored = localStorage.getItem("pendingUsers");
      if (stored && JSON.parse(stored).length > 0) {
        setPendingUsers(JSON.parse(stored));
      } else {
        const mockUsers: PendingUser[] = [
          {
            id: "1",
            firstName: "Aarav",
            lastName: "Patel",
            phone: "9876543210",
            city: "Vadodara",
            state: "Gujarat",
          },
          {
            id: "2",
            firstName: "Meera",
            lastName: "Shah",
            phone: "9123456780",
            city: "Surat",
            state: "Gujarat",
          },
          {
            id: "3",
            firstName: "Kiran",
            lastName: "Joshi",
            phone: "9988776655",
            city: "Ahmedabad",
            state: "Gujarat",
          },
        ];
        localStorage.setItem("pendingUsers", JSON.stringify(mockUsers));
        setPendingUsers(mockUsers);
      }
      setLoading(false);
    }, 1200); // ⏳ simulate API delay
  }, []);

  // ✅ Save back to localStorage whenever changes happen
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

    const members = JSON.parse(localStorage.getItem("members") || "[]");
    localStorage.setItem("members", JSON.stringify([...members, user]));

    setPendingUsers(pendingUsers.filter((u) => u.id !== id));
    toast.success(`${user.firstName} ${user.lastName} approved successfully!`);
  };

  const handleRejectConfirm = (id: string) => {
    const user = pendingUsers.find((u) => u.id === id);
    if (!user) {
      toast.error("User not found!");
      return;
    }

    setPendingUsers(pendingUsers.filter((u) => u.id !== id));
    toast.info(`${user.firstName} ${user.lastName} rejected`);
    setConfirmRejectId(null);
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
                      {user.firstName} {user.lastName}
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

      {/* ✅ Confirmation Dialog */}
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

      {/* ✅ Toast */}
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

      {/* ✅ Global Loading Overlay */}
      {loading && <LoadingOverlay message="Fetching pending users..." />}
    </AdminLayout>
  );
};

export default PendingUsers;
