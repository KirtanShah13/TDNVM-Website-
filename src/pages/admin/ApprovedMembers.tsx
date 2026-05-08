// project/src/pages/admin/ApprovedMembers.tsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Search, Trash2, Edit } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
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

interface Member {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  address: string;
  gender: string; // M / F
  phone: string;
  birthdate?: string;
  marriageDate?: string;
  deathDate?: string;
  email: string;
}

const ApprovedMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      // TODO (Backend): Replace this with actual API/Supabase call
      // Example: const { data, error } = await supabase.from('members').select('*').eq('status', 'approved');
      
      // Simulating API response with dummy data matching the new schema so UI can be tested
      setTimeout(() => {
        const mockMembers: Member[] = [
          {
            id: "1",
            firstName: "Amit",
            middleName: "Kumar",
            lastName: "Sharma",
            address: "123 Main St, Delhi",
            gender: "M",
            phone: "9876543210",
            email: "amit.sharma@example.com",
            birthdate: "1985-04-12",
            marriageDate: "2010-05-20",
          },
          {
            id: "2",
            firstName: "Priya",
            middleName: "",
            lastName: "Verma",
            address: "45 MG Road, Mumbai",
            gender: "F",
            phone: "9123456780",
            email: "priya.v@example.com",
            birthdate: "1990-08-25",
            deathDate: "2023-01-15", 
          },
          {
            id: "3",
            firstName: "Rahul",
            middleName: "Dev",
            lastName: "Patel",
            address: "78 Park Avenue, Ahmedabad",
            gender: "M",
            phone: "9988776655",
            email: "rahul.patel@test.com",
            birthdate: "1988-11-05",
          },
          {
            id: "4",
            firstName: "Sneha",
            middleName: "Rani",
            lastName: "Desai",
            address: "102 Lake View, Pune",
            gender: "F",
            phone: "9898989898",
            email: "sneha.desai@email.in",
            birthdate: "1995-02-14",
            marriageDate: "2021-12-01",
          },
          {
            id: "5",
            firstName: "Vikram",
            middleName: "Singh",
            lastName: "Rathore",
            address: "55 Palace Road, Jaipur",
            gender: "M",
            phone: "7766554433",
            email: "vs.rathore@mail.com",
            birthdate: "1975-06-30",
          },
          {
            id: "6",
            firstName: "Neha",
            middleName: "",
            lastName: "Gupta",
            address: "99 Ring Road, Surat",
            gender: "F",
            phone: "8877665544",
            email: "neha.gupta@mail.com",
            birthdate: "1992-09-18",
          },
          {
            id: "7",
            firstName: "Rajesh",
            middleName: "K",
            lastName: "Iyer",
            address: "21 Temple Street, Chennai",
            gender: "M",
            phone: "9000100020",
            email: "rajesh.iyer@test.com",
            birthdate: "1980-03-22",
            marriageDate: "2005-08-15",
          },
          {
            id: "8",
            firstName: "Anjali",
            middleName: "",
            lastName: "Mehta",
            address: "12 Linking Road, Mumbai",
            gender: "F",
            phone: "9111222333",
            email: "anjali.m@example.com",
            birthdate: "1983-07-07",
            deathDate: "2022-11-20",
          }
        ];
        setMembers(mockMembers);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching members:", error);
      toast.error("Failed to load members.");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    // TODO (Backend): Add actual database deletion logic here
    // Example: await supabase.from('members').delete().eq('id', id);
    
    setMembers(members.filter((m) => m.id !== id));
    toast.success("Member removed successfully");
    setConfirmDeleteId(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    setLoading(true);
    try {
      // TODO (Backend): Add actual database update logic here
      // Example: await supabase.from('members').update(editingMember).eq('id', editingMember.id);
      
      // Update local state temporarily
      setMembers((prev) =>
        prev.map((m) => (m.id === editingMember.id ? editingMember : m))
      );
      toast.success("Member updated successfully");
      setIsEditModalOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error("Error updating member:", error);
      toast.error("Failed to update member.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filtered members based on search term
  const filteredMembers = members.filter((m) => {
    const searchString = `${m.firstName} ${m.middleName || ''} ${m.lastName} ${m.phone} ${m.address} ${m.email}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

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
            placeholder="Search by name, phone, email, or address..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ✅ Empty State */}
        {filteredMembers.length === 0 && !loading ? (
          <p className="text-gray-600 dark:text-gray-400">
            No approved members found.
          </p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full table-auto border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                    <th className="p-3 text-sm font-semibold">Name</th>
                    <th className="p-3 text-sm font-semibold">Contact Info</th>
                    <th className="p-3 text-sm font-semibold">Address</th>
                    <th className="p-3 text-sm font-semibold">Gender</th>
                    <th className="p-3 text-sm font-semibold">Dates</th>
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
                        <div className="font-medium text-gray-900 dark:text-white">
                          {[member.firstName, member.middleName, member.lastName].filter(Boolean).join(" ")}
                        </div>
                      </td>
                      <td className="p-3 text-sm">
                        <div>{member.phone}</div>
                        <div className="text-gray-500 text-xs">{member.email}</div>
                      </td>
                      <td className="p-3 text-sm">{member.address}</td>
                      <td className="p-3 text-sm">{member.gender}</td>
                      <td className="p-3 text-sm text-gray-600 dark:text-gray-300">
                        {member.birthdate && <div>B: {member.birthdate}</div>}
                        {member.marriageDate && <div>M: {member.marriageDate}</div>}
                        {member.deathDate && <div className="text-red-500 font-semibold">D: {member.deathDate}</div>}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingMember(member);
                              setIsEditModalOpen(true);
                            }}
                            className="flex items-center gap-1 px-2 py-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                          >
                            <Edit className="h-4 w-4" /> Edit
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(member.id)}
                            className="flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                          >
                            <Trash2 className="h-4 w-4" /> Remove
                          </button>
                        </div>
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
                  <p className="font-semibold text-gray-900 dark:text-white text-lg">
                    {[member.firstName, member.middleName, member.lastName].filter(Boolean).join(" ")}
                  </p>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p><strong>Phone:</strong> {member.phone}</p>
                    <p><strong>Email:</strong> {member.email}</p>
                    <p><strong>Address:</strong> {member.address}</p>
                    <p><strong>Gender:</strong> {member.gender}</p>
                    {member.birthdate && <p><strong>DOB:</strong> {member.birthdate}</p>}
                    {member.marriageDate && <p><strong>Marriage:</strong> {member.marriageDate}</p>}
                    {member.deathDate && <p className="text-red-500"><strong>Death:</strong> {member.deathDate}</p>}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingMember(member);
                        setIsEditModalOpen(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded border border-blue-200 dark:border-blue-800"
                    >
                      <Edit className="h-4 w-4" /> Edit
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(member.id)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded border border-red-200 dark:border-red-800"
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ✅ Confirmation Dialog */}
        {confirmDeleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Confirm Removal
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to completely remove this member?
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

        {/* ✅ Edit Modal */}
        {isEditModalOpen && editingMember && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full my-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Edit Member Details
              </h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                    <input type="text" required value={editingMember.firstName} onChange={(e) => setEditingMember({...editingMember, firstName: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Middle Name</label>
                    <input type="text" value={editingMember.middleName || ""} onChange={(e) => setEditingMember({...editingMember, middleName: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                    <input type="text" required value={editingMember.lastName} onChange={(e) => setEditingMember({...editingMember, lastName: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <input type="text" required value={editingMember.phone} onChange={(e) => setEditingMember({...editingMember, phone: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input type="email" value={editingMember.email || ""} onChange={(e) => setEditingMember({...editingMember, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                  <input type="text" required value={editingMember.address} onChange={(e) => setEditingMember({...editingMember, address: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                    <select value={editingMember.gender} onChange={(e) => setEditingMember({...editingMember, gender: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option value="M">Male (M)</option>
                      <option value="F">Female (F)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Birthdate</label>
                    <input type="date" value={editingMember.birthdate || ""} onChange={(e) => setEditingMember({...editingMember, birthdate: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marriage Date</label>
                    <input type="date" value={editingMember.marriageDate || ""} onChange={(e) => setEditingMember({...editingMember, marriageDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Death Date</label>
                    <input type="date" value={editingMember.deathDate || ""} onChange={(e) => setEditingMember({...editingMember, deathDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
      </div>

      {/* ✅ Global Loading Overlay */}
      {loading && <LoadingOverlay message="Processing..." />}
    </AdminLayout>
  );
};

export default ApprovedMembers;
