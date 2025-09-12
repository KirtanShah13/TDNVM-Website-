// project/src/pages/admin/Dashboard.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Image, Users, UserCog } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";

const Dashboard: React.FC = () => {
  const location = useLocation();

  const sections = [
    {
      name: "Manage Events",
      description: "Create, update, and delete events for the community.",
      icon: <Calendar className="h-8 w-8 text-primary-500 dark:text-primary-400" />,
      link: "/admin/events",
    },
    {
      name: "Manage Gallery",
      description: "Upload and remove community gallery photos.",
      icon: <Image className="h-8 w-8 text-primary-500 dark:text-primary-400" />,
      link: "/admin/gallery",
    },
    {
      name: "Manage Members",
      description: "View and update community member details.",
      icon: <Users className="h-8 w-8 text-primary-500 dark:text-primary-400" />,
      link: "/admin/members",
    },
    {
      name: "Manage Core Team",
      description: "Edit the details of the core organizing team.",
      icon: <UserCog className="h-8 w-8 text-primary-500 dark:text-primary-400" />,
      link: "/admin/core-team",
    },
  ];

  return (
    <AdminLayout>
      <div className="py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome! Manage the content of your community website from here.
          </p>
        </div>

        {/* Grid of cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => {
            const isActive = location.pathname === section.link;
            return (
              <Link
                key={section.name}
                to={section.link}
                className={`
                  rounded-2xl shadow p-6 flex flex-col items-center text-center group
                  bg-white dark:bg-gray-800
                  transition-transform duration-200 ease-in-out
                  hover:scale-105 hover:shadow-lg
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
                  ${isActive ? "ring-2 ring-primary-500 shadow-md" : ""}
                `}
              >
                <div className="mb-4">{section.icon}</div>
                <h3
                  className={`text-lg font-semibold ${
                    isActive
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-900 dark:text-white group-hover:text-primary-500"
                  }`}
                >
                  {section.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {section.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
