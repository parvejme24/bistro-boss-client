import React from "react";
import { useForm } from "react-hook-form";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import DynamicTitle from "../../Components/Shared/DynamicTitle/DynamicTitle";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate form submission (you can replace this with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success message with form details
    Swal.fire({
      icon: "success",
      title: "Message Sent Successfully!",
      html: `
        <div style="text-align: center; padding: 10px;">
          <p style="margin-bottom: 15px; font-size: 16px;">
            Thank you for contacting us, <strong>${data.fullName}</strong>!
          </p>
          <p style="color: #666; font-size: 14px;">
            We'll get back to you within 24 hours at <strong>${data.email}</strong>
          </p>
        </div>
      `,
      confirmButtonColor: "#FC791A",
      confirmButtonText: "Great!",
      width: "500px",
    }).then(() => {
      // Reset form after success
      reset();
    });
  };

  const onError = (errors) => {
    // Show validation errors in SweetAlert2
    const errorMessages = Object.values(errors)
      .map((error) => error?.message)
      .filter(Boolean);

    if (errorMessages.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: `
          <div style="text-align: left; padding: 10px;">
            <p style="margin-bottom: 10px; font-weight: bold;">Please fix the following errors:</p>
            <ul style="list-style: disc; padding-left: 20px;">
              ${errorMessages
                .map((msg) => `<li style="margin-bottom: 5px;">${msg}</li>`)
                .join("")}
            </ul>
          </div>
        `,
        confirmButtonColor: "#FC791A",
        confirmButtonText: "OK, I'll fix it",
      });
    }
  };

  // Contact information
  const contactInfo = {
    location: "123 Restaurant Street, Food City, FC 12345",
    phone: "+1 (555) 123-4567",
    email: "contact@bistroboss.com",
  };

  // Social media links
  const socialLinks = [
    { icon: FaFacebook, url: "https://facebook.com", label: "Facebook" },
    { icon: FaTwitter, url: "https://twitter.com", label: "Twitter" },
    { icon: FaInstagram, url: "https://instagram.com", label: "Instagram" },
    { icon: FaLinkedin, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaYoutube, url: "https://youtube.com", label: "YouTube" },
  ];

  // Google Maps embed URL (you'll need to replace with your actual location coordinates)
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841333896215!2d-73.98811768459557!3d40.74844097932773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus";

  return (
    <div className="bg-[#F4F1EA]">
      <DynamicTitle title={"Contact"} />
      <PageHeader title={"Contact Us"} />

      <div className="container mx-auto max-w-7xl px-5 pt-20 pb-16">
        {/* Google Map Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            Find Us on Map
          </h2>
          <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bistro Boss Location"
            ></iframe>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Contact Information
              </h3>

              {/* Location */}
              <div className="flex items-start mb-6">
                <div className="bg-[#FC791A] p-3 rounded-full mr-4 flex-shrink-0">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Our Location
                  </h4>
                  <p className="text-gray-600">{contactInfo.location}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start mb-6">
                <div className="bg-[#FC791A] p-3 rounded-full mr-4 flex-shrink-0">
                  <FaPhone className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Phone Number
                  </h4>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-gray-600 hover:text-[#FC791A] transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start mb-6">
                <div className="bg-[#FC791A] p-3 rounded-full mr-4 flex-shrink-0">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Email Address
                  </h4>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-600 hover:text-[#FC791A] transition-colors break-all"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 hover:bg-[#FC791A] text-gray-600 hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                        aria-label={social.label}
                      >
                        <Icon className="text-xl" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Send us a Message
              </h3>
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="space-y-5"
              >
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    {...register("fullName", {
                      required: "Full name is required",
                      minLength: {
                        value: 3,
                        message: "Full name must be at least 3 characters",
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC791A] focus:border-transparent ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC791A] focus:border-transparent ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      {...register("phoneNumber", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[\d\s\-\+\(\)]{10,}$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC791A] focus:border-transparent ${
                        errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register("subject", {
                      required: "Subject is required",
                      minLength: {
                        value: 5,
                        message: "Subject must be at least 5 characters",
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC791A] focus:border-transparent ${
                      errors.subject ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="What is this regarding?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC791A] focus:border-transparent resize-none ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#FC791A] text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#e66a14] transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                    isSubmitting ? "cursor-wait" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
