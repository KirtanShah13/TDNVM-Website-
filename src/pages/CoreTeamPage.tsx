import React, { useEffect, useState } from 'react';
import { Mail, Phone, Linkedin, Calendar, Award, Users } from 'lucide-react';
import { supabase } from '../lib/SupabaseClient';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';

const CoreTeamPage: React.FC = () => {
  const { t } = useTranslation('coreTeam');

  const [coreTeam, setCoreTeam] = useState<any[]>([]);
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoreTeam = async () => {
      const { data, error } = await supabase
        .from('core_team')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching core team:', error);
      } else {
        setCoreTeam(data);
      }
    };

    const fetchLeaders = async () => {
      const { data, error } = await supabase
        .from('president_secrataries')
        .select('*');

      if (error) {
        console.error('Error fetching leadership history:', error);
      } else {
        setLeaders(data);
      }

      setLoading(false);
    };

    fetchCoreTeam();
    fetchLeaders();
  }, []);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('coreTeam.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('coreTeam.description')}
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              <CountUp end={coreTeam.length} duration={2} />
            </div>
            <div className="text-gray-600 dark:text-gray-400">{t('coreTeam.stats.members')}</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-secondary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              <CountUp end={25} duration={2} suffix="+" />
            </div>
            <div className="text-gray-600 dark:text-gray-400">{t('coreTeam.stats.experience')}</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-accent-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              <CountUp end={100} duration={2} suffix="+" />
            </div>
            <div className="text-gray-600 dark:text-gray-400">{t('coreTeam.stats.events')}</div>
          </div>
        </div>

        {/* Core Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {coreTeam.map((member) => (
            <div key={member.id} className="card overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="relative">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <div className="bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium inline-block">
                    {member.designation}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  {member.description}
                </p>

                <div className="space-y-2 mb-4 text-sm">
                  {member.experience && (
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 text-primary-500" />
                      <span>Experience: {member.experience}</span>
                    </div>
                  )}
                  {member.achievements && (
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Award className="h-4 w-4 text-primary-500" />
                      <span className="text-xs">{member.achievements}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex space-x-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-full transition-colors"
                      title="Email"
                    >
                      <Mail className="h-4 w-4 text-gray-600 dark:text-gray-400 hover:text-primary-600" />
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-full transition-colors"
                      title="Phone"
                    >
                      <Phone className="h-4 w-4 text-gray-600 dark:text-gray-400 hover:text-primary-600" />
                    </a>
                    <a
                      href={member.linkedin}
                      className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-full transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4 text-gray-600 dark:text-gray-400 hover:text-primary-600" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Message */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('coreTeam.leadershipMessage.title')}
            </h2>
            <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic max-w-3xl mx-auto mb-6">
              {t('coreTeam.leadershipMessage.quote')}
            </blockquote>
            <cite className="text-primary-600 font-medium">{t('coreTeam.leadershipMessage.name')}</cite>
          </div>
        </div>

        {/* Leadership History Table */}
        <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 rounded-xl shadow-lg">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t('coreTeam.table.title')}
            </h2>
            {loading ? (
              <p className="text-gray-500 dark:text-gray-400">
                {t('coreTeam.table.loading')}
              </p>
            ) : (
              <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="border border-gray-300 px-2 py-1 text-left">{t('coreTeam.table.headers.srNo')}</th>
                      <th className="border border-gray-300 px-2 py-1 text-left">{t('coreTeam.table.headers.presidentName')}</th>
                      <th className="border border-gray-300 px-2 py-1 text-left">{t('coreTeam.table.headers.presidencyYear')}</th>
                      <th className="border border-gray-300 px-2 py-1 text-left">{t('coreTeam.table.headers.secretaryName')}</th>
                      <th className="border border-gray-300 px-2 py-1 text-left">{t('coreTeam.table.headers.secretaryYear')}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {leaders.length > 0 ? (
                      leaders.map((entry, index) => (
                        <tr key={entry.no || index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="border border-gray-300 px-2 py-1">{entry.no}</td>
                          <td className="border border-gray-300 px-2 py-1">{entry["President Name"]}</td>
                          <td className="border border-gray-300 px-2 py-1">{entry["Presidency Year"]}</td>
                          <td className="border border-gray-300 px-2 py-1">{entry["Secretary Name"]}</td>
                          <td className="border border-gray-300 px-2 py-1">{entry["Secretary Year"]}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                          {t('coreTeam.table.empty')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoreTeamPage;
