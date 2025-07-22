import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Phone, MapPin, Heart, CheckCircle } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    interests: [] as string[],
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      if (name === 'interests') {
        const interestValue = target.value;
        setFormData(prev => ({
          ...prev,
          interests: target.checked
            ? [...prev.interests, interestValue]
            : prev.interests.filter(interest => interest !== interestValue)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: target.checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      console.log('Registration data:', formData);
      alert('Registration successful! Welcome to Samudaya community.');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Heart className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Samudaya</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Join Our Community</h2>
          <p className="text-gray-600 dark:text-gray-400">Create your member account</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="First name" />
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name *</label>
              <input type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="Last name" />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="+91 98765 43210" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" id="city" name="city" required value={formData.city} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="Your city" />
              </div>
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State *</label>
              <select id="state" name="state" required value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option value="">Select state</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Delhi">Delhi</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-start space-x-2 cursor-pointer">
              <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange} required className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                I agree to the <Link to="/terms" className="text-primary-600 hover:text-primary-500">Terms of Service</Link> and <Link to="/privacy" className="text-primary-600 hover:text-primary-500">Privacy Policy</Link>
              </span>
            </label>
          </div>

          <button type="submit" disabled={isLoading || !formData.agreeToTerms} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 w-full justify-center">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Create Account</span>
                <CheckCircle className="h-5 w-5" />
              </>
            )}
          </button>

          <div className="mt-6 text-center">
            <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
            <Link to="/login" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium">Login  here</Link>
          </div>
        </form>

        <div className="text-center">
          <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
