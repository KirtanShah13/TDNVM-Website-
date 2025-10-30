"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { supabase } from "../lib/SupabaseClient";
import { Search, Filter, MapPin, Calendar, Users } from "lucide-react";
import Fuse from "fuse.js";
import { useTranslation } from "react-i18next";
import { useDebounce } from "use-debounce";

interface Member {
  [key: string]: any;
  "SR NO"?: string;
  "Full Name"?: string;
  Address?: string;
  "BIRTH DATE"?: string;
  Role?: string;
}

const BANNER_IMAGES = [
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im1..webp",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im10.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im3..webp",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im11.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im5..webp",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im13.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im6.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im7.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im8.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im9.jpeg",
];

const MembersPage: React.FC = () => {
  const { t, i18n } = useTranslation(["members"]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [membersdetail, setMembersdetail] = useState<Member[]>([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [members, setMembers] = useState<Member[]>([]);
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const membersRef = useRef<HTMLDivElement>(null);

  const roles = useMemo(
    () => [
      "all",
      "President",
      "Treasurer",
      "Secretary",
      "Coordinator",
      "Member",
      "Volunteer",
    ],
    []
  );
  const regions = useMemo(
    () => [
      "all",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Jammu and Kashmir",
      "Ladakh",
      "Lakshadweep",
      "Puducherry",
    ],
    []
  );

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    console.log("is logged in:{%s}", isLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn === false) return; // 🚨 prevent fetching if user not logged in
    if (!isLoggedIn) return; // 🚨 prevent fetching if user not logged in
    console.log(isLoggedIn);
    // const fetchMembers = async () => {
    //   setLoading(true);
    //   setError(null);

    //   const tableName =
    //     i18n.language === "gu" ? "members_details_gu" : "members_details_en";

    //   try {
    //     if (debouncedSearchTerm.trim()) {
    //       const { data, error } = await supabase.from(tableName).select("*");
    //       if (error) throw error;
    //       setAllMembers(data || []);
    //     } else {
    //       const from = (page - 1) * pageSize;
    //       const to = from + pageSize - 1;
    //       const { data, error } = await supabase
    //         .from(tableName)
    //         .select("*")
    //         .range(from, to);
    //       if (error) throw error;
    //       setMembers(data || []);
    //     }
    //   } catch (err: any) {
    //     setError(err.message || "Failed to load members.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchMembersdetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const tableName =
          i18n.language === "gu" ? "members_details_gu" : "members_details_en";

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        // Base URL
        let url = `http://127.0.0.1:8000/${tableName}`;

        // Add query params for search or pagination
        if (debouncedSearchTerm.trim()) {
          url += `?search=${encodeURIComponent(
            debouncedSearchTerm
          )}&from=${from}&to=${to}`;
        } else {
          url += `?from=${from}&to=${to}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch members");
        }

        const data: Member[] = await res.json();

        // Sort if needed
        // data.sort((a, b) => (a.id || 0) - (b.id || 0));

        setMembersdetail(data);
        console.log("members data:", data);
        console.log("language:", i18n.language);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.error("Error fetching members:", err.message);
        } else {
          setError("Failed to fetch members.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMembersdetails();
    // fetchMembers();
  }, [isLoggedIn, page, debouncedSearchTerm, i18n.language]);

  const fuse = new Fuse(membersdetail, {
    keys: [
      { name: "fullname", weight: 0.7 },
      { name: "address", weight: 0.4 },
      { name: "birthdate", weight: 0.2 },
    ],
    threshold: 0.2,
    includeScore: true,
    ignoreLocation: true,
    useExtendedSearch: true,
  });

  const buildSearchQuery = (input: string) => {
    if (!input.trim()) return "";
    return `'${input.trim()}`;
  };

  const normalizedSearch = buildSearchQuery(debouncedSearchTerm);

  const searchedMembers = useMemo(() => {
    if (!normalizedSearch) return membersdetail;
    return fuse.search(normalizedSearch).map((result) => result.item);
  }, [normalizedSearch, membersdetail, allMembers]);

  const roleFiltered = useMemo(() => {
    return roleFilter === "all"
      ? searchedMembers
      : searchedMembers.filter((member) => member?.Role === roleFilter);
  }, [searchedMembers, roleFilter]);

  const regionFiltered = useMemo(() => {
    return regionFilter === "all"
      ? roleFiltered
      : roleFiltered.filter((member) =>
          member?.Address?.includes(regionFilter)
        );
  }, [roleFiltered, regionFilter]);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedMembers = searchTerm
    ? regionFiltered.slice(startIndex, endIndex)
    : regionFiltered;

  const hasNextPage = searchTerm
    ? endIndex < regionFiltered.length
    : members.length === pageSize;

  const getRandomImage = (index: number): string => {
    return BANNER_IMAGES[index % BANNER_IMAGES.length];
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    membersRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
    });
  };

  if (isLoggedIn === null) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="text-gray-600 dark:text-gray-400">
          Checking login...
        </span>
      </div>
    );
  }

  if (isLoggedIn === false) {
    //  Redirect to login if not authenticated
    return (
      <div className="py-16 flex items-center justify-center min-h-[60vh]">
        <div className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please log in to view this page
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Members information is only available to registered users.
          </p>
          <a
            href="/login"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Log in
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={membersRef} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("members.title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("members.subtitle")}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t("members.search.placeholder")}
                value={searchTerm}
                onChange={(e) => {
                  setPage(1);
                  setSearchTerm(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => {
                  setPage(1);
                  setRoleFilter(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role === "all"
                      ? t("members.filter.role")
                      : t(`members.roles.${role}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Region Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={regionFilter}
                onChange={(e) => {
                  setPage(1);
                  setRegionFilter(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region === "all"
                      ? t("members.filter.region")
                      : t(`members.regions.${region}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {paginatedMembers.map((member, index) => (
              <div
                key={member["srno"] || index}
                className="card p-0 rounded-lg overflow-hidden shadow transition-all duration-300 transform hover:shadow-xl hover:ring-2 hover:ring-primary-400 hover:scale-[1.02]"
              >
                <img
                  src={getRandomImage(index)}
                  loading="lazy"
                  alt="Member Banner"
                  className="h-24 w-full object-cover object-center"
                />

                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {member["fullname"]}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{member["address"] || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {member["birthdate"]
                          ? formatDate(member["birthdate"])
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Members Found */}
        {!loading && !error && regionFiltered.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t("members.notFound.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t("members.notFound.subtitle")}
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => handlePageChange(Math.max(page - 1, 1))}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            disabled={page === 1}
          >
            {t("members.pagination.previous")}
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            disabled={!hasNextPage}
          >
            {t("members.pagination.next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
