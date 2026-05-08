// project/src/pages/admin/PendingUsers.tsx
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Search, Eye } from "lucide-react";
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
  middleName?: string;
  lastName: string;
  phone: string;
  email?: string;
  address: string;
  gender: string;
  birthdate?: string;
  marriageDate?: string;
}

const PendingUsers: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmRejectId, setConfirmRejectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewUser, setViewUser] = useState<PendingUser | null>(null);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        // Fetch from local storage logic (simulating backend)
        const stored = localStorage.getItem("pendingUsers");
        if (stored && JSON.parse(stored).length > 0) {
          setPendingUsers(JSON.parse(stored));
        } else {
          // Comprehensive mock data
          const mockUsers: PendingUser[] = [
            {
              id: "p1",
              firstName: "Aarav",
              middleName: "Kumar",
              lastName: "Patel",
              phone: "+919876543210",
              email: "aarav.p@example.com",
              address: "123 Ring Road, Vadodara, Gujarat",
              gender: "M",
              birthdate: "1990-05-15",
            },
            {
              id: "p2",
              firstName: "Meera",
              lastName: "Shah",
              phone: "+919123456780",
              email: "meera.shah@example.com",
              address: "45 Riverfront, Surat, Gujarat",
              gender: "F",
              birthdate: "1995-08-20",
              marriageDate: "2020-11-10",
            },
            {
              id: "p3",
              firstName: "Kiran",
              lastName: "Joshi",
              phone: "+919988776655",
              address: "SG Highway, Ahmedabad, Gujarat",
              gender: "Other",
              birthdate: "1988-12-05",
            },
          ];
          setPendingUsers(mockUsers);
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching pending users:", error);
      toast.error("Failed to load pending users.");
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    const user = pendingUsers.find((u) => u.id === id);
    if (!user) return;

    setLoading(true);
    try {
      // Simulate Backend Transfer
      // Move from 'pendingUsers' to 'members' table perfectly matching the schema
      const approvedMembers = JSON.parse(localStorage.getItem("members") || "[]");
      const newMember = { ...user, status: "approved" };
      localStorage.setItem("members", JSON.stringify([...approvedMembers, newMember]));

      const remainingPending = pendingUsers.filter((u) => u.id !== id);
      setPendingUsers(remainingPending);
      localStorage.setItem("pendingUsers", JSON.stringify(remainingPending));

      toast.success(`${user.firstName} ${user.lastName} has been approved!`);
      setViewUser(null);
    } catch (error) {
      console.error("Error approving user:", error);
      toast.error("Failed to approve user.");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectConfirm = async (id: string) => {
    const user = pendingUsers.find((u) => u.id === id);
    if (!user) return;

    setLoading(true);
    try {
      const remainingPending = pendingUsers.filter((u) => u.id !== id);
      setPendingUsers(remainingPending);
      localStorage.setItem("pendingUsers", JSON.stringify(remainingPending));

      toast.info(`${user.firstName} ${user.lastName} has been rejected.`);
      setConfirmRejectId(null);
      setViewUser(null);
    } catch (error) {
      console.error("Error rejecting user:", error);
      toast.error("Failed to reject user.");
    } finally {
      setLoading(false);
    }
  };

  // Filter pending users
  const filteredUsers = pendingUsers.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.phone} ${u.email} ${u.address}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Pending User Approvals
        </h1>

        {/* 🔍 Search bar */}
        <div className="relative mb-6 max-w-xl">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, phone, email, or address..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredUsers.length === 0 && !loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-10 text-center shadow-sm border border-gray-100 dark:border-gray-700">
            <CheckCircle className="mx-auto h-14 w-14 text-green-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">All caught up!</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              There are currently no new signups waiting for admin approval. When someone registers, they will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <table className="min-w-full table-auto border-collapse whitespace-nowrap bg-white dark:bg-gray-800">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 text-left border-b dark:border-gray-700">
                    <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Name</th>
                    <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Contact Details</th>
                    <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Address</th>
                    <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b dark:border-gray-700 hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="p-4">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {user.firstName} {user.middleName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">Gender: {user.gender}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{user.phone}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email || "No email provided"}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-300 truncate max-w-[200px]" title={user.address}>
                        {user.address}
                      </td>
                      <td className="p-4 flex gap-2 justify-center">
                        <button
                          onClick={() => setViewUser(user)}
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleApprove(user.id)}
                          className="p-2 text-green-600 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          onClick={() => setConfirmRejectId(user.id)}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <XCircle size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Cards */}
            <div className="lg:hidden space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email || "No email"}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-5 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p className="truncate"><strong>Address:</strong> {user.address}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewUser(user)}
                      className="flex-1 py-2 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg font-medium text-sm flex items-center justify-center gap-1"
                    >
                      <Eye size={16} /> Details
                    </button>
                    <button
                      onClick={() => handleApprove(user.id)}
                      className="flex-1 py-2 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400 rounded-lg font-medium text-sm flex items-center justify-center gap-1"
                    >
                      <CheckCircle size={16} /> Approve
                    </button>
                    <button
                      onClick={() => setConfirmRejectId(user.id)}
                      className="flex-1 py-2 text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg font-medium text-sm flex items-center justify-center gap-1"
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ✅ View Details Modal */}
      {viewUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-lg w-full relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setViewUser(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white bg-gray-100 dark:bg-gray-700 rounded-full"
            >
              <XCircle size={20} />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 dark:border-gray-700">
              Review Signup Request
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Full Name</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{viewUser.firstName} {viewUser.middleName} {viewUser.lastName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Gender</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{viewUser.gender}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{viewUser.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</p>
                  <p className="font-semibold text-gray-900 dark:text-white break-all">{viewUser.email || "N/A"}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Full Address</p>
                <p className="font-semibold text-gray-900 dark:text-white">{viewUser.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl mt-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Birthdate</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{viewUser.birthdate || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Marriage Date</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{viewUser.marriageDate || "N/A"}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8 pt-4 border-t dark:border-gray-700">
              <button
                onClick={() => setConfirmRejectId(viewUser.id)}
                className="flex-1 py-3 bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 rounded-xl font-bold transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => handleApprove(viewUser.id)}
                className="flex-[2] py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-md shadow-green-500/20 transition-all"
              >
                Approve Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Confirmation Dialog */}
      {confirmRejectId && !viewUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Confirm Rejection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to reject this user's signup request? This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmRejectId(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRejectConfirm(confirmRejectId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-md shadow-red-500/20 transition-all"
              >
                Reject Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Toast */}
      <ToastContainer position="top-center" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick draggable theme="colored" />

      {/* ✅ Global Loading Overlay */}
      {loading && <LoadingOverlay message="Processing..." />}
    </AdminLayout>
  );
};

export default PendingUsers;
