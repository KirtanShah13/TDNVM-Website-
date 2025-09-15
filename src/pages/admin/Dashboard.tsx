// project/src/pages/admin/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Image,
  Users,
  UserCog,
  UserCheck,
  UserPlus,
} from "lucide-react";
import AdminLayout from "../../components/AdminLayout";

// 🔹 Reusable Loading Overlay (same as ApprovedMembers)
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

const Dashboard: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // ⏳ Simulate data fetch (replace with API call later)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    {
      name: "Manage Events",
      description: "Create, update, and delete events for the community.",
      icon: (
        <Calendar className="h-8 w-8 text-primary-500 dark:text-primary-400" />
      ),
      link: "/admin/events",
    },
    {
      name: "Manage Gallery",
      description: "Upload and remove community gallery photos.",
      icon: (
        <Image className="h-8 w-8 text-primary-500 dark:text-primary-400" />
      ),
      link: "/admin/gallery",
    },
    {
      name: "Manage Members",
      description: "View and update community member details.",
      icon: (
        <Users className="h-8 w-8 text-primary-500 dark:text-primary-400" />
      ),
      link: "/admin/members",
    },
    {
      name: "Manage Core Team",
      description: "Edit the details of the core organizing team.",
      icon: (
        <UserCog className="h-8 w-8 text-primary-500 dark:text-primary-400" />
      ),
      link: "/admin/core-team",
    },
    {
      name: "Pending Approvals",
      description: "Approve or reject new user signups before they can log in.",
      icon: (
        <UserPlus className="h-8 w-8 text-primary-500 dark:text-primary-400" />
      ),
      link: "/admin/pending-users",
    },
    {
      name: "Approved Members",
      description: "View and manage users who have been approved.",
      icon: (
        <UserCheck className="h-8 w-8 text-primary-500 dark:text-primary-400" />
      ),
      link: "/admin/approved-members",
    },
  ];

  return (
    <AdminLayout>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Welcome! Manage the content of your community website from here.
          </p>
        </div>

        {/* Grid of cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => {
            const isActive = location.pathname === section.link;
            return (
              <Link
                key={section.name}
                to={section.link}
                className={`
                  rounded-2xl shadow p-4 sm:p-6 flex flex-col items-center text-center group
                  bg-white dark:bg-gray-800
                  transition-transform duration-200 ease-in-out
                  hover:scale-105 hover:shadow-lg
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
                  ${isActive ? "ring-2 ring-primary-500 shadow-md" : ""}
                `}
              >
                <div className="mb-3 sm:mb-4">{section.icon}</div>
                <h3
                  className={`text-base sm:text-lg font-semibold ${
                    isActive
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-900 dark:text-white group-hover:text-primary-500"
                  }`}
                >
                  {section.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {section.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ✅ Global Loading Overlay (uniform with ApprovedMembers) */}
      {loading && <LoadingOverlay message="Fetching dashboard..." />}
    </AdminLayout>
  );
};

export default Dashboard;
