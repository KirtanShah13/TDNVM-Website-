import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ContactPage: React.FC = () => {
  const { t } = useTranslation("contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.methods.email.title"),
      details: "thasaradashanagar@gmail.com",
      description: t("contact.methods.email.description"),
      action: "mailto:thasaradashanagar@gmail.com",
    },
    {
      icon: Phone,
      title: t("contact.methods.call.title"),
      phones: [
        { number: t("contact.methods.call.phone1"), tel: "tel:+919825039369" },
        { number: t("contact.methods.call.phone2"), tel: "tel:+919173395594" },
      ],
      description: t("contact.methods.call.description"),
    },
    {
      icon: MapPin,
      title: t("contact.methods.visit.title"),
      details: t("contact.methods.visit.details"),
      description: t("contact.methods.visit.description"),
      action: "https://maps.app.goo.gl/YkP2qj9A6xdTgwyA6?g_st=aw",
    },
    {
      icon: MessageSquare,
      title: t("contact.methods.whatsapp.title"),
      details: t("contact.methods.whatsapp.details"),
      description: t("contact.methods.whatsapp.description"),
      action: "https://wa.me/9173395594",
    },
  ];

  const topics = [
    "General Inquiry",
    "Membership Information",
    "Event Participation",
    "Volunteer Opportunities",
    "Sponsorship & Partnerships",
    "Donations & Support",
    "Feedback & Suggestions",
    "Technical Support",
  ];

  const officeHours = [
    {
      day: t("contact.officeHours.monFri"),
      hours: t("contact.officeHours.monFriHours"),
    },
    {
      day: t("contact.officeHours.sat"),
      hours: t("contact.officeHours.satHours"),
    },
    {
      day: t("contact.officeHours.sun"),
      hours: t("contact.officeHours.sunHours"),
    },
    { day: "Event Days", hours: t("contact.officeHours.event") },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", topic: "", message: "" });
  };

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#event-form") {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          const yOffset = -120;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 200);
      }
    }
  }, [location]);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.action}
              className="card p-6 text-center hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/40 transition-colors">
                <info.icon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {info.title}
              </h3>
              {info.phones ? (
                <div className="space-y-1 mb-2">
                  {info.phones.map((phone, i) => (
                    <a
                      key={i}
                      href={phone.tel}
                      className="text-primary-600 hover:underline block font-medium"
                    >
                      {phone.number}
                    </a>
                  ))}
                </div>
              ) : (
                <div className="mb-2 space-y-1 text-primary-600 font-medium leading-snug">
                  {info.details.split(",").map((line, i) => (
                    <p key={i}>{line.trim()}</p>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {info.description}
              </p>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div id="event-form" className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t("contact.form.title")}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t("contact.form.phone")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t("contact.form.topic")}
                </label>
                <select
                  id="topic"
                  name="topic"
                  required
                  value={formData.topic}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">{t("contact.form.topic.select")}</option>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t("contact.form.message.placeholder")}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 text-lg font-medium flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>{t("contact.form.submit")}</span>
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-primary-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t("contact.officeHours.title")}
                </h3>
              </div>
              <div className="space-y-3">
                {officeHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {schedule.day}
                    </span>
                    <span className="text-primary-600 font-medium">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card overflow-hidden">
              <iframe
                title="Thasara Dashanagar Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.1952219111374!2d73.17337927519583!3d22.256993343001584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8d2a64f12cb%3A0xc726fa683c0214a7!2sStar%20Electric%20Co!5e0!3m2!1sen!2sin!4v1721380975396!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t("contact.map.office")}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {t("contact.map.address")}
                </p>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {t("contact.quick.title")}
              </h3>
              <div className="space-y-3">
                <a
                  href="/volunteer"
                  className="block w-full btn-outline text-center"
                >
                  {t("contact.quick.volunteer")}
                </a>
                <a
                  href="/events"
                  className="block w-full btn-outline text-center"
                >
                  {t("contact.quick.events")}
                </a>
                <a
                  href="/donate"
                  className="block w-full btn-primary text-center"
                >
                  {t("contact.quick.support")}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{t("contact.cta.title")}</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            {t("contact.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              {t("contact.cta.join")}
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors">
              {t("contact.cta.learnMore")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
