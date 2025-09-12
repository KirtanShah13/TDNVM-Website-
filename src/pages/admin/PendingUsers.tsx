// project/src/pages/admin/PendingUsers.tsx
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // ✅ Load pending users from localStorage, seed if empty
  useEffect(() => {
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

    // Move user to approved members
    const members = JSON.parse(localStorage.getItem("members") || "[]");
    localStorage.setItem("members", JSON.stringify([...members, user]));

    setPendingUsers(pendingUsers.filter((u) => u.id !== id));
    toast.success(`${user.firstName} approved successfully!`);
  };

  const handleReject = (id: string) => {
    const user = pendingUsers.find((u) => u.id === id);
    if (!user) {
      toast.error("User not found!");
      return;
    }

    // ✅ Show confirmation toast instead of window.confirm
    toast.info(
      <div>
        <p>
          Are you sure you want to reject{" "}
          <strong>
            {user.firstName} {user.lastName}
          </strong>
          ?
        </p>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => {
              setPendingUsers(pendingUsers.filter((u) => u.id !== id));
              toast.success(`${user.firstName} rejected`);
              toast.dismiss(); // Close the confirmation toast
            }}
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Yes, Reject
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 rounded bg-gray-400 text-white hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
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
                        onClick={() => handleReject(user.id)}
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
