import { useEffect, useState } from "react";

const WelcomeBanner = () => {
  const [userFullName, setUserFullName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  // Fetch user data from localStorage if logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isLoggedInFlag = localStorage.getItem("isLoggedIn") === "true";
    // console.log("WelcomeBanner - Stored user:", storedUser);
    if (storedUser && isLoggedInFlag) {
      const user = JSON.parse(storedUser);
      const fullName = `${user.first_name} ${user.last_name}`;
      setUserFullName(fullName);
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  // Scroll listener to retract/show the banner
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // If scrolling down, hide the banner
        setIsBannerVisible(false);
      } else {
        // If scrolling up, show the banner
        setIsBannerVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If not logged in, don't render the banner
  if (!isLoggedIn) return null;

  return (
    <div
      className={`text-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white py-3 shadow mt-16 z-40 relative transition-all duration-300 ${
        isBannerVisible
          ? "transform translate-y-0"
          : "transform translate-y-[-100%]"
      }`}
    >
      👋 Welcome {userFullName || "Temporary User"}
    </div>
  );
};

export default WelcomeBanner;
