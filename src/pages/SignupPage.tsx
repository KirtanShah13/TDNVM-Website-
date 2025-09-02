import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Phone, MapPin, Heart, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";



interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  state: string;
  agreeToTerms: boolean;
}

const SignupPage: React.FC = () => {
  const { t } = useTranslation("signup");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    state: "",
    agreeToTerms: false,
  });

  const stateOptions = [
    { value: "maharashtra", label: t("states.Maharashtra") },
    { value: "karnataka", label: t("states.Karnataka") },
    { value: "tamilNadu", label: t("states.TamilNadu") },
    { value: "delhi", label: t("states.Delhi") },
    { value: "gujarat", label: t("states.Gujarat") },
    { value: "rajasthan", label: t("states.Rajasthan") },
    { value: "westBengal", label: t("states.WestBengal") },
    { value: "uttarPradesh", label: t("states.UttarPradesh") },
    { value: "other", label: t("states.Other") },
  ];


  const signupMessages = [
  "Successfully signed up. After admin approval you will be able to log in.",
  "Thank you for signing up! You’ll be able to log in once an admin approves your account.",
  "Signup complete. Login access will be granted after admin approval.",
  "You’re all set! An admin will review your signup shortly before you can log in.",
  "Signup submitted. Please wait for admin approval before logging in.",
];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.setItem("user", JSON.stringify(formData));

    // ✅ random toast message
    const randomMessage = signupMessages[Math.floor(Math.random() * signupMessages.length)];
    toast.success(randomMessage);

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Something went wrong. Please try again.");
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

        <form onSubmit={handleSubmit} className="card p-8 space-y-6">
          {/* First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("firstName")}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  placeholder={t("placeholders.firstName")}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("lastName")}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  placeholder={t("placeholders.lastName")}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t("phone")}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder={t("placeholders.phone")}
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* City and State in the same row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("city")}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  placeholder={t("placeholders.city")}
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("state")}
              </label>
              <select
                id="state"
                name="state"
                required
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">{t("placeholders.selectState")}</option>
                {stateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-3">
            <label className="flex items-start space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {t("terms")}{" "}
                <Link
                  to="/terms-and-conditions"
                  className="text-primary-600 hover:text-primary-500"
                >
                  {t("terms")}
                </Link>{" "}
                {t("and")}{" "}
                <Link
                  to="/privacy-policy"
                  className="text-primary-600 hover:text-primary-500"
                >
                  {t("privacy")}
                </Link>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.agreeToTerms}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 w-full justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t("loading")}</span>
              </>
            ) : (
              <>
                <span>{t("submit")}</span>
                <CheckCircle className="h-5 w-5" />
              </>
            )}
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-600 dark:text-gray-400">
              {t("loginPrompt")}{" "}
            </span>
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
            >
              {t("loginLink")}
            </Link>
          </div>
        </form>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;