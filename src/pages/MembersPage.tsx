'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/SupabaseClient';
import { Search, Filter, MapPin, Calendar, Users } from 'lucide-react';
import Fuse from 'fuse.js';
import { useTranslation } from 'react-i18next';

interface Member {
  [key: string]: any;
  "SR NO"?: string;
  "Full Name"?: string;
  "Address"?: string;
  "BIRTH DATE"?: string;
  Role?: string;
}

const BANNER_IMAGES = [
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im1..webp",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im10.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im3..webp",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im11.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im5..webp",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im11.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im13.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im6.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im7.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im8.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im9.jpeg",
];

const BANNER_IMAGES = [
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im1..webp",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im10.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im3..webp",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im11.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im5..webp",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im11.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im13.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im6.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im7.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im8.jpeg",
  "https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/member-banner1//im9.jpeg",
];

const MembersPage: React.FC = () => {
   const { t } = useTranslation(['members']);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const membersRef = useRef<HTMLDivElement>(null); // ✅ scroll target
  const membersRef = useRef<HTMLDivElement>(null); // ✅ scroll target

  const roles = ['all', 'President', 'Treasurer', 'Secretary', 'Coordinator', 'Member', 'Volunteer'];
  const regions = ['all', 'Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'];

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('members_details').select('*');
      if (error) setError(error.message);
      else setMembers(data || []);
      setLoading(false);
    };
    fetchMembers();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
    });
  };

  const fuse = new Fuse<Member>(members, {
    keys: [
      { name: 'Full Name', weight: 0.7 },
      { name: 'Address', weight: 0.4 },
      { name: 'BIRTH DATE', weight: 0.2 },
    ],
    threshold: 0.2,
    threshold: 0.2,
    includeScore: true,
    ignoreLocation: true,
    useExtendedSearch: true,
  });

  const buildSearchQuery = (input: string) => {
    if (!input.trim()) return '';
    return `'${input.trim()}`;
  };
    ignoreLocation: true,
    useExtendedSearch: true,
  });

  const buildSearchQuery = (input: string) => {
    if (!input.trim()) return '';
    return `'${input.trim()}`;
  };

  const normalizedSearch = buildSearchQuery(searchTerm);
  const normalizedSearch = buildSearchQuery(searchTerm);
  const searchedMembers = normalizedSearch
    ? fuse.search(normalizedSearch).map((result) => result.item)
    : members;

  const roleFiltered =
    roleFilter === 'all'
      ? searchedMembers
      : searchedMembers.filter((member) => member?.Role === roleFilter);

  const regionFiltered =
    regionFilter === 'all'
      ? roleFiltered
      : roleFiltered.filter((member) => member?.Address?.includes(regionFilter));
  const roleFiltered =
    roleFilter === 'all'
      ? searchedMembers
      : searchedMembers.filter((member) => member?.Role === roleFilter);

  const regionFiltered =
    regionFilter === 'all'
      ? roleFiltered
      : roleFiltered.filter((member) => member?.Address?.includes(regionFilter));

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedMembers = regionFiltered.slice(startIndex, endIndex);
  const hasNextPage = endIndex < regionFiltered.length;

  const getRandomImage = (index: number): string => {
    return BANNER_IMAGES[index % BANNER_IMAGES.length];
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    membersRef.current?.scrollIntoView({ behavior: 'smooth' }); // ✅ scroll on page change
  };
  const hasNextPage = endIndex < regionFiltered.length;

  const getRandomImage = (index: number): string => {
    return BANNER_IMAGES[index % BANNER_IMAGES.length];
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    membersRef.current?.scrollIntoView({ behavior: 'smooth' }); // ✅ scroll on page change
  };

  return (
    <div ref={membersRef} className="py-16">
    <div ref={membersRef} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('members.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('members.subtitle')}.
          </p>
        </div>

        {/* Filters */}
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('members.search.placeholder')}
                value={searchTerm}
                onChange={(e) => {
                  setPage(1);
                  setSearchTerm(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                onChange={(e) => {
                  setPage(1);
                  setSearchTerm(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Role Filter */}

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
                onChange={(e) => {
                  setPage(1);
                  setRoleFilter(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role === 'all' ? t('members.filter.role') : role}

                  </option>
                ))}
              </select>
            </div>

            {/* Region Filter */}

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
                onChange={(e) => {
                  setPage(1);
                  setRegionFilter(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white appearance-none"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region === 'all' ? t('members.filter.region') : region}

                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        {/* Members Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {paginatedMembers.map((member, index) => (
              <div
                key={member["SR NO"] || index}
                className="card p-0 rounded-lg overflow-hidden shadow transition-all duration-300 transform hover:shadow-xl hover:ring-2 hover:ring-primary-400 hover:scale-[1.02]"
              >
                <div
                  className="h-24 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${getRandomImage(index)})` }}
                  style={{ backgroundImage: `url(${getRandomImage(index)})` }}
                ></div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {member["Full Name"]}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{member["Address"] || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {member["BIRTH DATE"] ? formatDate(member["BIRTH DATE"]) : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Members Found */}
        {/* No Members Found */}
        {!loading && !error && regionFiltered.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{t('members.notFound.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('members.notFound.subtitle')}
            </p>
          </div>
        )}

        {/* Pagination */}
        {/* Pagination */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => handlePageChange(Math.max(page - 1, 1))}
            onClick={() => handlePageChange(Math.max(page - 1, 1))}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            disabled={page === 1}
          >
            {t('members.pagination.previous')}
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            disabled={!hasNextPage}
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            disabled={!hasNextPage}
          >
           {t('members.pagination.next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
