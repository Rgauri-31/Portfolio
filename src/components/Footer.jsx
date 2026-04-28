import React from "react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/Rgauri-31", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/gauri-rakhonde-4482b52a2", label: "LinkedIn" },
  { icon: Mail, href: "mailto:gaurirrakhonde@gmail.com", label: "Email" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-10 border-t border-white/10 bg-[#030014]">
      <div className="mx-auto px-[5%] lg:px-[10%] py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Left — copyright */}
        <p className="text-sm text-gray-400 flex items-center gap-1.5">
          Made with{" "}
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          {" "}by{" "}
          <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold">
            Gauri Rakhonde
          </span>
          {" "}· © {year}
        </p>

        {/* Right — social icons */}
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
