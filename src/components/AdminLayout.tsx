// project/src/components/AdminLayout.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
  LayoutDashboard,
  Calendar,
  Image,
  UserCircle,
  Users,
  Menu,
  X,
  LogOut,
  UserCheck, // for approved members
  UserCog,    // for core team
  UserPlus,   // for pending users
} from "lucide-react";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMobileOpen]);

  // ✅ Fetch pending users count from localStorage
  useEffect(() => {
    const fetchPending = () => {
      try {
        const stored = localStorage.getItem("pendingUsers");
        const parsed = stored ? JSON.parse(stored) : [];
        setPendingCount(parsed.length);
      } catch {
        setPendingCount(0);
      }
    };

    fetchPending();

    // update count if localStorage changes (for example when admin approves)
    window.addEventListener("storage", fetchPending);
    return () => window.removeEventListener("storage", fetchPending);
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 shadow-md flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          Admin Panel
        </h2>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 min-h-screen z-40 flex flex-col bg-white dark:bg-gray-800 shadow-md transition-all duration-300
          ${isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"} 
          lg:translate-x-0 ${isCollapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            } mb-6 px-4 py-3 border-b border-gray-200 dark:border-gray-700`}
          >
            {!isCollapsed && (
              <h2 className="hidden lg:block text-xl font-bold text-gray-800 dark:text-white">
                Admin Panel
              </h2>
            )}

            {/* Collapse toggle */}
            <button
              onClick={() =>
                window.innerWidth < 1024
                  ? setIsMobileOpen(false)
                  : setIsCollapsed(!isCollapsed)
              }
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {window.innerWidth < 1024 ? (
                <X size={24} />
              ) : isCollapsed ? (
                <Menu size={24} />
              ) : (
                <X size={24} />
              )}
            </button>
          </div>

          {/* User info */}
          {!isCollapsed && user && (
            <p className="hidden lg:block text-sm text-gray-600 dark:text-gray-400 mb-4 px-4">
              Logged in as <strong>{user.firstName}</strong>
            </p>
          )}

          {/* Navigation */}
          <nav className="space-y-2 flex-1 px-2 overflow-y-auto">
            <Link
              to="/admin"
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "gap-3"
              } px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
              onClick={() => setIsMobileOpen(false)}
            >
              <LayoutDashboard size={24} />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>

            <Link
              to="/admin/events"
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "gap-3"
              } px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
              onClick={() => setIsMobileOpen(false)}
            >
              <Calendar size={24} />
              {!isCollapsed && <span>Events</span>}
            </Link>

            <Link
              to="/admin/gallery"
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "gap-3"
              } px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
              onClick={() => setIsMobileOpen(false)}
            >
              <Image size={24} />
              {!isCollapsed && <span>Gallery</span>}
            </Link>

            <Link
                to="/admin/members"
                className={`flex items-center ${
                    isCollapsed ? "justify-center" : "gap-3"
                } px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
                onClick={() => setIsMobileOpen(false)}
                >
                <Users size={24} />   {/* ✅ changed from UserCircle to Users */}
                {!isCollapsed && <span>Members</span>}
                </Link>

            <Link
              to="/admin/core-team"
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "gap-3"
              } px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
              onClick={() => setIsMobileOpen(false)}
            >
              <UserCog size={24} /> {/* changed icon */}
              {!isCollapsed && <span>Core Team</span>}
            </Link>

            {/* ✅ Pending Approvals link */}
            <Link
              to="/admin/pending-users"
              className={`relative flex items-center ${
                isCollapsed ? "justify-center" : "gap-3"
              } px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
              onClick={() => setIsMobileOpen(false)}
            >
              <UserPlus size={24} /> {/* changed to UserPlus */}
              {!isCollapsed && <span>Pending Approvals</span>}

              {/* Badge (only when count > 0 and not collapsed) */}
              {pendingCount > 0 && !isCollapsed && (
                <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-500 text-white">
                  {pendingCount}
                </span>
              )}
              {/* Collapsed mode → show badge as dot */}
              {pendingCount > 0 && isCollapsed && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-red-500"></span>
              )}
            </Link>

            {/* ✅ Approved Members link */}
            <Link
              to="/admin/approved-members"
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "gap-3"
              } px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
              onClick={() => setIsMobileOpen(false)}
            >
              <UserCheck size={24} /> {/* changed icon */}
              {!isCollapsed && <span>Approved Members</span>}
            </Link>
          </nav>

          {/* Logout pinned at bottom */}
          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                handleLogout();
                setIsMobileOpen(false);
              }}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center" : "gap-3"
              } px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md`}
            >
              <LogOut size={24} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-6 transition-all duration-300 lg:ml-0">
        <div className="mt-14 lg:mt-0">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
