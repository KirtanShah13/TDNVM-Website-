import { useEffect, useState } from 'react';
// Keep this import for future use
import { supabase } from '../../lib/SupabaseClient';

const WelcomeBanner = () => {
  const [userFullName, setUserFullName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // TEMPORARY: Always show a placeholder name to test layout
    setUserFullName('Temporary User');
    setIsLoggedIn(true);

    // 🔒 Uncomment and use this logic when ready to connect with Supabase

    /*
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!user || error) return;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('firstname, lastname, middlename')
        .eq('id', user.id)
        .single();

      if (!profileError && profile) {
        const fullName = `${profile.lastname} ${profile.firstname} ${profile.middlename}`.trim();
        setUserFullName(fullName);
        setIsLoggedIn(true);
      }
    };

    fetchUser();
    */
  }, []);

  // Always show for now
  return (
    <div className="text-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white py-3 shadow mt-16 z-40 relative">
      👋 Welcome {userFullName || 'Temporary User'}
    </div>
  );
};

export default WelcomeBanner;
