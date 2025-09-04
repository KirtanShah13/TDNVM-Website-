import { useEffect, useState } from 'react';

const WelcomeBanner = () => {
  const [userFullName, setUserFullName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch the user data from localStorage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      // If user data exists, parse it
      const user = JSON.parse(storedUser);
      
      // Construct the full name (first + last name)
      const fullName = `${user.firstName} ${user.lastName}`;
      
      // Update state
      setUserFullName(fullName);
      setIsLoggedIn(true); // Mark user as logged in
    }
  }, []);

  return (
    <div className="text-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white py-3 shadow mt-16 z-40 relative">
      {/* Display full name or fallback to 'Temporary User' */}
      👋 Welcome {userFullName || 'Temporary User'}
    </div>
  );
};

export default WelcomeBanner;
