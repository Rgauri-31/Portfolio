import React from "react";
import { Mail, Github, Linkedin, Phone } from "lucide-react";

const contacts = [
  {
    title: "Email",
    value: "gaurirrakhonde@gmail.com",
    icon: Mail,
    link: "mailto:gaurirrakhonde@gmail.com",
  },
  {
    title: "LinkedIn",
    value: "Connect with me",
    icon: Linkedin,
    link: "https://www.linkedin.com/in/gauri-rakhonde-4482b52a2",
  },
  {
    title: "GitHub",
    value: "View my projects",
    icon: Github,
    link: "https://github.com/Rgauri-31",
  },
  {
    title: "Contact No",
    value: "+91 7517309073",
    icon: Phone,
    link: "tel:+917517309073",
  },
];

export default function SocialLinks() {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-white mb-4">Connect With Me</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contacts.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="p-3 rounded-lg bg-white/10">
              <item.icon className="w-5 h-5 text-purple-400" />
            </div>

            <div>
              <p className="text-white font-medium">{item.title}</p>
              <p className="text-sm text-gray-400">{item.value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
