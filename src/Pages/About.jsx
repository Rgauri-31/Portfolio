import React, { useEffect, memo, useMemo } from "react";
import { FileText, Code, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* -------------------------------------------------
   SECTION HEADER COMPONENT
-------------------------------------------------- */
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <h2
      className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
      data-aos="zoom-in-up"
    >
      About Me
    </h2>

    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-delay="200"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Learning by building real-world projects
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

/* -------------------------------------------------
   PROFILE IMAGE WITH HOVER EFFECTS
-------------------------------------------------- */
const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 p-0 py-4">
    <div className="relative group" data-aos="fade-up">

      {/* Glow effect behind image (desktop only) */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 group-hover:border-white/40 transition-all duration-700" />

          <img
            src="/Photo.jpg"  // image should be inside public folder
            alt="Gauri Rakhonde"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
));

/* -------------------------------------------------
   STAT CARD COMPONENT (PROJECTS / CERTIFICATES)
-------------------------------------------------- */
const StatCard = memo(({ value, label }) => (
  <div data-aos="fade-up" className="relative group">
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all hover:scale-105 h-full flex flex-col justify-center items-center text-center">
      <span className="text-4xl font-bold text-white mb-2">{value}</span>
      <p className="text-sm uppercase tracking-wider text-gray-300">{label}</p>
    </div>
  </div>
));

/* -------------------------------------------------
   MAIN ABOUT SECTION
-------------------------------------------------- */
const AboutPage = () => {

  /* --------------------------------------------
     Stats derived from localStorage (set by Portfolio section)
  --------------------------------------------- */
  const { totalProjects, totalCertificates } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    
    return {
      totalProjects: storedProjects.length || 3,
      totalCertificates: storedCertificates.length || 2,
    };
  }, []);

  /* --------------------------------------------
     Initialize AOS Animations
  --------------------------------------------- */
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] lg:px-[10%] mt-10"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">

          {/* -------- LEFT CONTENT -------- */}
          <div className="space-y-6 text-center lg:text-left">

            {/* Name Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" data-aos="fade-right">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span className="block mt-2 text-gray-200">Gauri Rakhonde</span>
            </h2>

            {/* Description */}
            <p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              I’m a third-year Electronics and Telecommunication Engineering student at
              Pune Institute of Computer Technology (PICT). I enjoy working on real-world
              projects that involve software and problem-solving, and exploring how
              technology can be used to build simple and effective solutions.
            </p>

            {/* Quote Box */}
            <div
              className="bg-white/5 border border-white/10 rounded-2xl p-4 my-6 backdrop-blur-md"
              data-aos="fade-up"
            >
              <blockquote className="text-gray-300 italic text-sm">
                "Strong fundamentals and real projects matter more than fancy UI."
              </blockquote>
            </div>

            {/* Buttons */}
            <div className="flex flex-col lg:flex-row gap-4 w-full">

              {/* Resume Button */}
              <a
                href="https://drive.google.com/file/d/YOUR_RESUME_LINK/view"
                target="_blank"
                className="w-full lg:w-auto"
              >
                <button className="w-full sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" /> Download CV
                </button>
              </a>

              {/* Projects Button */}
              <a href="#Portofolio" className="w-full lg:w-auto">
                <button className="w-full sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium hover:scale-105 transition-all flex items-center justify-center gap-2 hover:bg-[#a855f7]/10">
                  <Code className="w-5 h-5" /> View Projects
                </button>
              </a>

            </div>
          </div>

          {/* -------- RIGHT IMAGE -------- */}
          {/* ===== RIGHT SIDE : EDUCATION ===== */}
<div
  className="w-full flex justify-center"
  data-aos="fade-left"
  data-aos-duration="1000"
>
  <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-xl">

    <h3 className="text-2xl font-semibold text-purple-400 mb-6">
      Education
    </h3>

    <div className="space-y-4">

      <div className="border-l-4 border-purple-500 pl-4">
        <p className="text-white font-semibold">
          B.E. Electronics & Telecommunication
        </p>
        <p className="text-gray-400 text-sm">
          Pune Institute of Computer Technology,Pune (PICT)
        </p>
        <p className="text-gray-500 text-xs mt-1">
          2023 – 2027
        </p>
      </div>

      <div className="border-l-4 border-indigo-400 pl-4">
        <p className="text-white font-semibold">
          HSC – Science 
        </p>
        <p className="text-gray-400 text-sm">
          77.67%
        </p>
        <p className="text-gray-400 text-sm">
          Babasaheb Utangle Jr. College, Akola
        </p>
        <p className="text-gray-500 text-xs mt-1">
          2021 – 2023
        </p>
      </div>

      <div className="border-l-4 border-pink-400 pl-4">
        <p className="text-white font-semibold">
          SSC 
        </p>
        <p className="text-gray-400 text-sm">
          98.40%
        </p>
        <p className="text-gray-400 text-sm">
          Shri Gajanan Maharaj English School,Shegaon
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Till 2021
        </p>
      </div>

    </div>
  </div>
</div>

        </div>

        {/* -------- STATS SECTION -------- */}
        {/* <a href="#Portfolio">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 cursor-pointer">
            <StatCard value={totalProjects} label="Projects" />
            <StatCard value={totalCertificates} label="Certificates" />
        
          </div>
        </a> */}

      </div>
    </div>
  );
};

export default memo(AboutPage);
