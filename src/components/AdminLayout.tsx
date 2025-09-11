import React, { useState } from "react";
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
} from "lucide-react";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col transition-all duration-300`}
      >
        {/* Header */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          } mb-6`}
        >
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Admin Panel
            </h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isCollapsed ? <Menu size={24} /> : <X size={24} />}
          </button>
        </div>

        {/* User info */}
        {!isCollapsed && user && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Logged in as <strong>{user.firstName}</strong>
          </p>
        )}

        {/* Navigation */}
        <nav className="space-y-3 flex-1">
          <Link
            to="/admin"
            title="Dashboard"
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            } px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            <LayoutDashboard size={24} />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          <Link
            to="/admin/events"
            title="Events"
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            } px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            <Calendar size={24} />
            {!isCollapsed && <span>Events</span>}
          </Link>
          <Link
            to="/admin/gallery"
            title="Gallery"
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            } px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            <Image size={24} />
            {!isCollapsed && <span>Gallery</span>}
          </Link>
          <Link
            to="/admin/members"
            title="Members"
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            } px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            <UserCircle size={24} />
            {!isCollapsed && <span>Members</span>}
          </Link>
          <Link
            to="/admin/core-team"
            title="Core Team"
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            } px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            <Users size={24} />
            {!isCollapsed && <span>Core Team</span>}
          </Link>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          title="Logout"
          className={`mt-4 flex items-center ${
            isCollapsed ? "justify-center" : "gap-3"
          } px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md`}
        >
          <LogOut size={24} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 transition-all duration-300">{children}</main>
    </div>
  );
};

export default AdminLayout;
