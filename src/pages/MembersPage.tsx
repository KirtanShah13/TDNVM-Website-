'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/SupabaseClient';
import { Search, Filter, MapPin, Calendar, Users, Award } from 'lucide-react';
import Fuse from 'fuse.js';

const DEFAULT_PHOTO = 'https://wbasgeeijimgbvhduilu.supabase.co/storage/v1/object/public/members/clay-banks-eOcwZNp3LLo-unsplash.jpg';

interface Member {
  [key: string]: any;
  "SR NO"?: string;
  "Full Name"?: string;
  "Address"?: string;
  "BIRTH DATE"?: string;
  Role?: string;
}

const MembersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;

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
    threshold: 0.3,
    includeScore: true,
  });

  const normalizedSearch = searchTerm.trim();
  const searchedMembers = normalizedSearch
    ? fuse.search(normalizedSearch).map((result) => result.item)
    : members;

  const roleFiltered = roleFilter === 'all' ? searchedMembers : searchedMembers.filter((member) => member?.Role === roleFilter);
  const regionFiltered = regionFilter === 'all' ? roleFiltered : roleFiltered.filter((member) => member?.Address?.includes(regionFilter));

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedMembers = regionFiltered.slice(startIndex, endIndex);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Community Members
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Meet the amazing people who make our community vibrant and strong.
            Each member contributes uniquely to our shared mission and values.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, address, or birth month/year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role === 'all' ? 'All Roles' : role}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <span className="text-gray-500 dark:text-gray-300">Loading members...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <span className="text-red-500">{error}</span>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {paginatedMembers.map((member, index) => (
              <div
                key={member["SR NO"] || index}
                className="card p-0 rounded-lg overflow-hidden shadow transition-all duration-300 transform hover:shadow-xl hover:ring-2 hover:ring-primary-400 hover:scale-[1.02]"
              >
                <div
                  className="h-24 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${DEFAULT_PHOTO})` }}
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

        {!loading && !error && regionFiltered.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No members found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}

        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
