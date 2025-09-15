// project/src/components/SkeletonLoader.tsx
import React from "react";

type Variant = "card" | "list" | "center" | "table";

interface SkeletonLoaderProps {
  variant?: Variant;
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = "card",
  count = 4,
  className = "",
}) => {
  if (variant === "center") {
    return (
      <div role="status" aria-busy="true" className={`flex items-center justify-center py-12 ${className}`}>
        <div className="space-y-3">
          <div className="mx-auto h-10 w-10 border-4 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
          <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
          <div className="h-2 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div role="status" aria-busy="true" className={`space-y-3 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse">
            <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
            <div className="flex-1">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
            </div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div role="status" aria-busy="true" className={`overflow-x-auto ${className}`}>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-3 text-sm font-semibold">Name</th>
              <th className="p-3 text-sm font-semibold">Phone</th>
              <th className="p-3 text-sm font-semibold">City</th>
              <th className="p-3 text-sm font-semibold">State</th>
              <th className="p-3 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: count }).map((_, i) => (
              <tr key={i} className="border-b dark:border-gray-600 animate-pulse">
                <td className="p-3"><div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32" /></td>
                <td className="p-3"><div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24" /></td>
                <td className="p-3"><div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20" /></td>
                <td className="p-3"><div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20" /></td>
                <td className="p-3"><div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // default: card
  return (
    <div role="status" aria-busy="true" className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse">
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 mb-3" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
          <div className="mt-3 h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
