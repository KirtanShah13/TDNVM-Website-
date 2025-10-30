import React, { useState } from "react";
import { Phone, Heart, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// ✅ Define admin phone numbers here
const ADMIN_PHONES = ["+919173118993"]; // replace with real admin numbers

const LoginPage: React.FC = () => {
  const { t } = useTranslation("login");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const welcomeMessages = [
    "Welcome back 🎉",
    "Glad to see you again 🌟",
    "You’ve logged in successfully 🚀",
    "Hope you’re having a great day 🌸",
    "Ready to explore? Let’s go 🔥",
    "We missed you ❤️",
    "Back in action! 💪",
    "Great to have you here 🙌",
    "Your journey continues 🛤️",
    "Welcome home 🏡",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // change alerts to toasts
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }), // send phone number only
      });
      console.log("Request sent with phone:", phone);
      console.log("response from server:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("API Response:", data);

      if (data.success) {
        alert("Login successful! Welcome back to Samudaya.");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("is logged in:{%s}", localStorage.getItem("isLoggedIn"));

        // const storedUser = localStorage.getItem("user");
        // console.log("Stored user:", storedUser);
        // console.log("User type:", data.user.user_type);
        if (data.user.user_type === "admin") {
          localStorage.setItem("isAdmin", "true");
          const randomMsg =
            welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
          toast.success(randomMsg);
          navigate("/admin");
        } else {
          localStorage.setItem("isAdmin", "false");
          const randomMsg =
            welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
          toast.success(randomMsg);
          navigate("/");
        }
      } else {
        const user = JSON.parse(data.user);
        const cleanedInput = phone.replace(/\s+/g, "");
        const cleanedStored = user.phone.replace(/\s+/g, "");

        if (
          cleanedInput === cleanedStored ||
          `+91${cleanedInput}` === cleanedStored
        ) {
          // ✅ Check if this user is admin
          const isAdmin =
            ADMIN_PHONES.includes(cleanedInput) ||
            ADMIN_PHONES.includes(`+91${cleanedInput}`);

          // ✅ Save role in localStorage
          localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
          localStorage.setItem("isLoggedIn", "true");

          // ✅ Toast message
          const randomMsg =
            welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
          toast.success(randomMsg);

          // ✅ Redirect based on role
          const redirectPath = isAdmin ? "/admin" : "/";
          setTimeout(() => {
            navigate(redirectPath);
          }, 1500);
        } else {
          toast.error("Invalid phone number. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indian-pattern bg-repeat bg-[length:60px_60px] dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Heart className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Samudaya
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{t("subtitle")}</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("phone.label")}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  pattern="^(\+91\s?)?[6-9]\d{9}$"
                  title={t("phone.title")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder={t("phone.placeholder")}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || phone.trim() === ""}
              className="w-full btn-primary py-3 text-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t("loading")}</span>
                </>
              ) : (
                <>
                  <span>{t("button.signin")}</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-600 dark:text-gray-400">
              {t("noAccount")}{" "}
            </span>
            <Link
              to="/signup"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
            >
              {t("createAccount")}
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
          >
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
