import React, { useEffect, useState, useCallback } from "react";

// Supabase client for fetching data from backend tables
import { supabase } from "../supabase";

// For prop validation (used in TabPanel)
import PropTypes from "prop-types";

// Swipe functionality for tabs (mobile friendly)
import SwipeableViews from "react-swipeable-views";

// Material UI Tabs system
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Custom project card component
import CardProject from "../components/CardProject";

// Tech stack icon component
import TechStackIcon from "../components/TechStackIcon";

// Animation on scroll library
import AOS from "aos";
import "aos/dist/aos.css";

// Certificate card component
import Certificate from "../components/Certificate";

// Icons for tab headers
import { Code, Award, Boxes } from "lucide-react";


/* --------------------------------------------
   Reusable "See More / See Less" Button
--------------------------------------------- */
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium
      transition-all duration-300 flex items-center gap-2
      bg-white/5 hover:bg-white/10 rounded-md border border-white/10
      hover:border-white/20 backdrop-blur-sm group relative overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"
        }`}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full" />
  </button>
);

/* --------------------------------------------
   Tab Panel Component (for each tab content)
--------------------------------------------- */
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Type validation
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Accessibility helper for tabs
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

/* --------------------------------------------
   Static Tech Stack List
--------------------------------------------- */
const techStacks = [
  // Languages
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "cplusplus.svg", language: "C++" },
  { icon: "dbms.svg", language: "SQL" },
  { icon: "python.svg", language: "Python" },
  { icon: "java.svg", language: "Java" },

  // Frameworks
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "nodejs.svg", language: "NodeJS" },
  { icon: "express.svg", language: "ExpressJS" },

  // Databases
  { icon: "mysql.svg", language: "MySQL" },
  { icon: "mongodb.svg", language: "MongoDB" },

  // Tools
  { icon: "git.svg", language: "Git" },
  { icon: "github.svg", language: "GitHub" },
  { icon: "vscode.svg", language: "VS Code" },
  { icon: "canva.svg", language: "Canva" },
];

/* --------------------------------------------
   MAIN PORTFOLIO COMPONENT
--------------------------------------------- */
export default function Portfolio() {
  const theme = useTheme();

  // Active tab (0 = Projects, 1 = Certificates, 2 = Tech Stack)
  const [value, setValue] = useState(0);

  // Data from Supabase
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);

  // Show more toggle states
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  // Responsive item count
  const [initialItems, setInitialItems] = useState(window.innerWidth < 768 ? 4 : 6);

  /* --------------------------------------------
     AOS Animation Initialization
  --------------------------------------------- */
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  /* --------------------------------------------
     Update items count on screen resize
  --------------------------------------------- */
  useEffect(() => {
    const handleResize = () => {
      setInitialItems(window.innerWidth < 768 ? 4 : 6);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* --------------------------------------------
     Fetch Data from Supabase
  --------------------------------------------- */
  const fetchData = useCallback(async () => {
  try {
    const [projectsResponse, certificatesResponse] = await Promise.all([
      supabase.from("projects").select("*").order("id", { ascending: true }),
      supabase.from("certificates").select("*").order("id", { ascending: true }),
    ]);

    if (projectsResponse.error) throw projectsResponse.error;
    if (certificatesResponse.error) throw certificatesResponse.error;

    const projectData = projectsResponse.data || [];
    const certData = certificatesResponse.data || [];

    setProjects(projectData);
    setCertificates(certData);

    localStorage.setItem("projects", JSON.stringify(projectData));
    localStorage.setItem("certificates", JSON.stringify(certData));
  } catch (error) {
    console.error("Supabase Fetch Error:", error.message);
  }
}, []);

  /* --------------------------------------------
     Load Cached Data + Sync Fresh Data
  --------------------------------------------- */
  useEffect(() => {
    const cachedProjects = localStorage.getItem("projects");
    const cachedCertificates = localStorage.getItem("certificates");

    if (cachedProjects && cachedCertificates) {
      setProjects(JSON.parse(cachedProjects));
      setCertificates(JSON.parse(cachedCertificates));
    }

    fetchData();
  }, [fetchData]);

  /* --------------------------------------------
     Tab Change Handler
  --------------------------------------------- */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /* --------------------------------------------
     Show More / Less Toggle
  --------------------------------------------- */
  const toggleShowMore = useCallback((type) => {
    if (type === "projects") setShowAllProjects((prev) => !prev);
    else setShowAllCertificates((prev) => !prev);
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  /* --------------------------------------------
     UI Rendering
  --------------------------------------------- */
  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portofolio"
    >
      {/* ===== SECTION HEADER ===== */}
      <div className="text-center pb-10" data-aos="fade-up">
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical skills.
        </p>
      </div>

      {/* ===== TABS LAYOUT ===== */}
      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                color: "#94a3b8",
                fontWeight: 600,
                textTransform: "none",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#fff",
              },
              "& .MuiTabs-indicator": { display: "none" },
            }}
          >
            <Tab icon={<Code className="mb-1" />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award className="mb-1" />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-1" />} label="Tech Stack" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        {/* ===== TAB CONTENT ===== */}
        <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={setValue}>

          {/* PROJECTS TAB */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-5">
              {displayedProjects.map((project, index) => (
                <div key={project.id || index} data-aos="fade-up">
                  <CardProject
                    Img={project.Img || project.img}
                    Title={project.Title || project.title}
                    Description={project.Description || project.description}
                    Link={project.Link || project.link}
                    Status={project.Status || project.status}
                    id={project.id}
                  />
                </div>
              ))}
            </div>

            {projects.length > initialItems && (
              <div className="mt-6 flex justify-start">
                <ToggleButton onClick={() => toggleShowMore("projects")} isShowingMore={showAllProjects} />
              </div>
            )}
          </TabPanel>

          {/* CERTIFICATES TAB */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="grid md:grid-cols-3 gap-5">
              {displayedCertificates.map((certificate, index) => (
                <div key={certificate.id || index} data-aos="fade-up">
                  <Certificate ImgSertif={certificate.Img} />
                </div>
              ))}
            </div>

            {certificates.length > initialItems && (
              <div className="mt-6 flex justify-start">
                <ToggleButton onClick={() => toggleShowMore("certificates")} isShowingMore={showAllCertificates} />
              </div>
            )}
          </TabPanel>

          {/* TECH STACK TAB */}
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 pb-10">
              {techStacks.map((stack, index) => (
                <div key={index} data-aos="fade-up">
                  <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                </div>
              ))}
            </div>
          </TabPanel>

        </SwipeableViews>
      </Box>
    </div>
  );
}
