import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Phone, Mail, MapPin, Heart, CheckCircle, Calendar, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  gender: string;
  birthdate: string;
  marriageDate: string;
  agreeToTerms: boolean;
}

const SignupPage: React.FC = () => {
  const { t } = useTranslation("signup");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    gender: "M",
    birthdate: "",
    marriageDate: "",
    agreeToTerms: false,
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const cleanedPhone = formData.phone.replace(/\s+/g, "");
      const normalizedPhone = cleanedPhone.startsWith("+91")
        ? cleanedPhone
        : `+91${cleanedPhone}`;

      // Store in localStorage as 'pendingUsers' array to simulate backend
      const existingPending = JSON.parse(localStorage.getItem("pendingUsers") || "[]");
      const newUser = {
        id: "p" + Date.now(),
        ...formData,
        phone: normalizedPhone,
      };
      
      existingPending.push(newUser);
      localStorage.setItem("pendingUsers", JSON.stringify(existingPending));

      toast.success(t("signupSuccess", "Signup complete. Please wait for admin approval before logging in."));

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("signupError", "Something went wrong. Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indian-pattern bg-repeat bg-[length:60px_60px] dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
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
            {t("title", "Join Our Community")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{t("subtitle", "Fill in your details below.")}</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("firstName", "First Name")} *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("middleName", "Middle Name")}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("lastName", "Last Name")} *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("phone", "Phone Number")} *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("email", "Email Address")}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("address", "Full Address")} *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" />
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("gender", "Gender")}</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white">
                  <option value="M">{t("genderMale", "Male (M)")}</option>
                  <option value="F">{t("genderFemale", "Female (F)")}</option>
                  <option value="Other">{t("genderOther", "Other")}</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("birthdate", "Date of Birth")}</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="date" name="birthdate" value={formData.birthdate} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("marriageDate", "Marriage Date")}</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="date" name="marriageDate" value={formData.marriageDate} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="space-y-3 pt-2">
            <label className="flex items-start space-x-2 cursor-pointer">
              <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange} required className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {t("terms", "I agree to the")}{" "}
                <Link to="/terms-and-conditions" className="text-primary-600 hover:text-primary-500">Terms & Conditions</Link>
                {" "}and{" "}
                <Link to="/privacy-policy" className="text-primary-600 hover:text-primary-500">Privacy Policy</Link>
              </span>
            </label>
          </div>

          <button type="submit" disabled={isLoading || !formData.agreeToTerms} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 w-full justify-center py-3">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{t("submit", "Submit Signup Request")}</span>
                <CheckCircle className="h-5 w-5" />
              </>
            )}
          </button>

          <div className="text-center pt-4">
            <span className="text-gray-600 dark:text-gray-400">{t("loginPrompt", "Already have an account?")} </span>
            <Link to="/login" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium">{t("loginLink", "Log in here")}</Link>
          </div>
        </form>

        <div className="text-center pb-8">
          <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
            {t("backHome", "Back to Home")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;