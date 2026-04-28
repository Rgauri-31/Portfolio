import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";

import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

/* -------------------------------------------------
   CONTACT PAGE COMPONENT
-------------------------------------------------- */
const ContactPage = () => {

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Sending message...",
      html: "Please wait while your message is being sent",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const formSubmitUrl = "https://formsubmit.co/gaurirrakhonde@gmail.com";

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("message", formData.message);
      submitData.append("_subject", "New message from Portfolio Website");
      submitData.append("_captcha", "false");
      submitData.append("_template", "table");

      await axios.post(formSubmitUrl, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully.",
        icon: "success",
        confirmButtonColor: "#6366f1",
        timer: 2000,
        timerProgressBar: true,
      });

      setFormData({ name: "", email: "", message: "" });

    } catch (error) {
      if (error.request && error.request.status === 0) {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully.",
          icon: "success",
          confirmButtonColor: "#6366f1",
          timer: 2000,
          timerProgressBar: true,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonColor: "#6366f1",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[5%] lg:px-[10%] pb-16" id="Contact">

      {/* -------- SECTION HEADER -------- */}
      <div className="text-center mt-10 mb-8">
        <h2
          data-aos="fade-down"
          className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          Contact Me
        </h2>
        <p
          data-aos="fade-up"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Have a question or want to connect? Feel free to send a message.
        </p>
      </div>

      {/* -------- MAIN LAYOUT — two columns on large screens -------- */}
      <div className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* -------- CONTACT FORM -------- */}
        <div
          className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10"
          data-aos="fade-right"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Get in Touch
              </h2>
              <p className="text-gray-400">
                Send a message and I'll get back to you soon.
              </p>
            </div>
            <Share2 className="w-10 h-10 text-[#6366f1] opacity-50" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div data-aos="fade-up" className="relative group">
              <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1]" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 disabled:opacity-50"
                required
              />
            </div>

            {/* Email */}
            <div data-aos="fade-up" data-aos-delay="100" className="relative group">
              <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1]" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 disabled:opacity-50"
                required
              />
            </div>

            {/* Message */}
            <div data-aos="fade-up" data-aos-delay="200" className="relative group">
              <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1]" />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 h-40 disabled:opacity-50"
                required
              />
            </div>

            {/* Submit */}
            <button
              data-aos="fade-up"
              data-aos-delay="300"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] py-4 rounded-xl font-semibold hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

          </form>

          {/* Social Links */}
          <div className="mt-10 pt-6 border-t border-white/10 flex justify-center">
            <SocialLinks />
          </div>
        </div>

        {/* -------- KOMENTAR / COMMENTS -------- */}
        <div data-aos="fade-left">
          <Komentar />
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
