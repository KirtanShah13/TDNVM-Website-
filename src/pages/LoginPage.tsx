import React, { useState } from "react";
import { Phone, Heart, ArrowRight, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../components/AuthContext";

// ✅ Define admin phone numbers here
const ADMIN_PHONES = ["+919173118993"]; // replace with real admin numbers

const LoginPage: React.FC = () => {
  const { t } = useTranslation("login");
  const { login } = useAuth();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
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

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const members = JSON.parse(localStorage.getItem("members") || "[]");
      const pendingUsers = JSON.parse(localStorage.getItem("pendingUsers") || "[]");
      
      const cleanedInput = phone.replace(/\s+/g, "");
      const normalizedInput = cleanedInput.startsWith("+91") ? cleanedInput : `+91${cleanedInput}`;
      
      const isApproved = members.find((m: any) => {
        if (!m.phone) return false;
        const mp = m.phone.replace(/\s+/g, "");
        const normalizedMp = mp.startsWith("+91") ? mp : `+91${mp}`;
        return normalizedMp === normalizedInput;
      });

      const isPending = pendingUsers.find((m: any) => {
        if (!m.phone) return false;
        const mp = m.phone.replace(/\s+/g, "");
        const normalizedMp = mp.startsWith("+91") ? mp : `+91${mp}`;
        return normalizedMp === normalizedInput;
      });
      
      const isAdmin = ADMIN_PHONES.includes(cleanedInput) || ADMIN_PHONES.includes(normalizedInput);

      if (isApproved || isAdmin) {
        // TODO: Implement actual SMS OTP API Integration here
        toast.success("OTP sent to your mobile number! (Mock)");
        setOtpSent(true);
      } else if (isPending) {
        toast.error("Your account is pending admin approval. You will be able to log in once approved.");
      } else {
        toast.error("No account found with this number. Please sign up first.");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (otp.length < 4) {
        toast.error("Please enter a valid OTP");
        setIsLoading(false);
        return;
      }

      const cleanedInput = phone.replace(/\s+/g, "");
      const normalizedInput = cleanedInput.startsWith("+91") ? cleanedInput : `+91${cleanedInput}`;
      const isAdmin = ADMIN_PHONES.includes(cleanedInput) || ADMIN_PHONES.includes(normalizedInput);
      
      const members = JSON.parse(localStorage.getItem("members") || "[]");
      const matchedUser = members.find((m: any) => {
        if (!m.phone) return false;
        const mp = m.phone.replace(/\s+/g, "");
        const normalizedMp = mp.startsWith("+91") ? mp : `+91${mp}`;
        return normalizedMp === normalizedInput;
      });

      const userData = matchedUser || { 
        firstName: isAdmin ? "Admin" : "User", 
        lastName: "",
        phone: cleanedInput,
        city: "",
        state: ""
      };

      // Call Context Login
      login(userData, isAdmin);

      const randomMsg = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
      toast.success(randomMsg);

      setTimeout(() => {
        navigate(isAdmin ? "/admin" : "/");
      }, 1500);

      setIsLoading(false);
    }, 1000);
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
              Shree Thashra Dasha Nagar Vanik Mandad 
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {otpSent ? "Verify OTP" : t("title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {otpSent ? `Enter the code sent to ${phone}` : t("subtitle")}
          </p>
        </div>

        <div className="card p-8">
          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
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
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send OTP</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Enter Verification Code
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-center tracking-[0.5em] text-xl font-semibold"
                    placeholder="------"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length < 4}
                className="w-full btn-primary py-3 text-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Login</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Change phone number
                </button>
              </div>
            </form>
          )}

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
