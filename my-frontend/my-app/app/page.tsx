"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { LampContainer } from "../components/ui/lamp";
import { AnimatePresence, motion } from "framer-motion";
import { Cover } from "@/components/ui/cover";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import image1 from "./feature1.png";
import image2 from "./feature2.png";
import image3 from "./feature3.png";
import image4 from "./feature4.png";


const HomePage: React.FC = () => {
  const Card = ({
    title,
    icon,
    children,
  }: {
    title: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
  }) => {
    const [hovered, setHovered] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem] relative"
      >
        <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
   
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full w-full absolute inset-0"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
   
        <div className="relative z-20">
          <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
            {icon}
          </div>
          <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
            {title}
          </h2>
        </div>
      </div>
    );
  };
   
  const AceternityIcon = () => {
    return (
      <svg
        width="66"
        height="65"
        viewBox="0 0 66 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white "
      >
        <path
          d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
          stroke="currentColor"
          strokeWidth="15"
          strokeMiterlimit="3.86874"
          strokeLinecap="round"
          style={{ mixBlendMode: "darken" }}
        />
      </svg>
    );
  };
   
  const Icon = ({ className, ...rest }: any) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={className}
        {...rest}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
      </svg>
    );
  };
  const Hero = () =>{
    return (
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Shape Your Future  <br /> with the Right Courses
        </motion.h1>
      </LampContainer>
    );
  }
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const sections: { [key: string]: string } = {
    home: "hero",
    features: "featuresSection",
    howWeWork: "howWeWorkSection",
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let currentSection = "home";

      for (const [key, value] of Object.entries(sections)) {
        const sectionElement = document.getElementById(value);
        if (
          sectionElement &&
          sectionElement.offsetTop - 80 <= scrollPosition &&
          scrollPosition < sectionElement.offsetTop + sectionElement.offsetHeight
        ) {
          currentSection = key;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (section: string) => {
    const sectionElement = document.getElementById(sections[section]);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
      setActiveSection(section);
    }
  };

  return (
    <div className="h-[300rem] bg-gradient-to-b from-black via-yellow-700 to-yellow-500 text-white">
      {/* Navbar */}
      <nav className="bg-[#1c1c1c] shadow-lg py-6 px-12 flex justify-between items-center sticky top-10 z-10 rounded-full mx-5">
        <div className="flex items-center space-x-4 gap-16 justify-center">
          <span className="text-4xl font-bold text-yellow-400">
            Edu<span className="text-white">Connect</span>
          </span>
          {["home", "features", "howWeWork"].map((item) => (
            <button
              key={item}
              className={`text-white text-3xl font-bold hover:text-yellow-400 relative ${
                activeSection === item ? "text-yellow-400" : ""
              }`}
              onClick={() => handleScrollToSection(item)}
            >
              {item === "home" ? "Home" : item === "features" ? "Feature" : "How we work"}
              {activeSection === item && (
                <div className="absolute top-full mt-1 h-1 w-full bg-yellow-400"></div>
              )}
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            className="bg-yellow-400 text-black hover:bg-yellow-500 py-2 px-4 rounded-md font-bold"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            User
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-black border border-yellow-400 rounded-md w-40">
              <button
                className="block w-full text-left px-4 py-2 text-white font-bold hover:bg-yellow-400 hover:text-black"
                onClick={() => {
                  setDropdownOpen(false);
                }}
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-white font-bold hover:bg-yellow-400 hover:text-black"
                onClick={() => {
                  setDropdownOpen(false);
                  router.push("/authentication");
                }}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero flex flex-col items-center justify-center text-center">
  <Hero />
  <motion.p
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{
      delay: 0.5,
      duration: 0.8,
      ease: "easeInOut",
    }}
    className="text-4xl mb-20 p-5 max-w-3xl text-yellow-100 mr-auto ml-2 font-bold  "
  >
     Discover tailored courses to help you achieve your career goals.
  </motion.p>
  <motion.p
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{
      delay: 0.5,
      duration: 0.8,
      ease: "easeInOut",
    }}
    className="text-4xl mb-20 max-w-4xl text-yellow-100 font-bold p-5"
  >
    Whether you want to be a software developer, a designer, or a marketer, we’ve got you covered.
  </motion.p>
  <motion.p
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{
      delay: 0.5,
      duration: 0.8,
      ease: "easeInOut",
    }}
    className="text-4xl mb-20 max-w-4xl text-yellow-100 font-bold p-5 ml-auto"
  >
    Whether you want to be a software developer, a designer, or a marketer, we’ve got you covered.
  </motion.p>
  <div className="border-2 border-transparent hover:border-yellow-500 p-2 rounded-full">
  <button className="bg-yellow-400 text-black font-bold text-2xl py-3 px-6 rounded-full hover:bg-yellow-500">
    Start Your Journey
  </button>
  </div>
  
  
</section>

      {/* Profile Section */}
      <section id="featuresSection" className="py-36 bg-transparent text-white text-center">
  <div className="container mx-auto px-4">
    <h2 className="text-6xl font-extrabold text-yellow-300 drop-shadow-lg">
      Features
    </h2>
    <p className="mt-6 text-2xl text-yellow-100 drop-shadow-md">
      Unlock the best learning experience tailored just for you.
    </p>

    <div className="mt-16 flex flex-col gap-12 ">
      {/* Feature 1 */}
      <div className="shadow-lg rounded-xl bg-white text-black p-8 hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 flex justify-between">
        <div className="flex flex-col justify-center mx-2 p-3">
        <h3 className="text-4xl font-bold text-yellow-600">
          Find the Perfect Course
        </h3>
        <p className="text-2xl mt-4 text-gray-700">
          Explore over 10,000 courses worldwide, carefully curated to help you achieve your dreams.
        </p>
        <div className="mt-6">
          <Button className="bg-yellow-500 text-white hover:bg-yellow-600 font-bold text-2xl py-6 px-6 rounded-full">
            Explore Courses
          </Button>
        </div>
        
        </div>
        <div className="border-4 border-black p-2 rounded-md">
          <Image src={image1} width={400} height={400} alt="feature1"/>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="shadow-lg rounded-xl bg-white text-black p-8 hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 flex justify-between">
        <div className="flex flex-col justify-center mx-2 p-3">
        <h3 className="text-4xl font-bold text-yellow-600">
          Pave Your Path
        </h3>
        <p className="text-2xl mt-4 text-gray-700">
          Receive guidance on building a strong path toward your personal and professional goals.
        </p>
        <div className="mt-6">
          <Button className="bg-yellow-500 text-white hover:bg-yellow-600 font-bold text-2xl py-6 px-6 rounded-full">
            Start Your Journey
          </Button>
        </div>
        </div>
        <div className="border-4 border-black p-2 rounded-md">
        <Image src={image2} width={400} height={400} alt="feature2"/>
        </div>
        
      </div>

      {/* Feature 3 */}
      <div className="shadow-lg rounded-xl bg-white text-black p-8 hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 flex justify-between">
        <div className="flex flex-col justify-center mx-2 p-3">
        <h3 className="text-4xl font-bold text-yellow-600">
          Timely Assessments
        </h3>
        <p className="text-2xl mt-4 text-gray-700">
          Measure your growth with regular assessments designed to track and enhance your progress.
        </p>
        <div className="mt-6">
          <Button className="bg-yellow-500 text-white hover:bg-yellow-600 font-bold text-2xl py-6 px-6 rounded-full">
            Take a Test
          </Button>
        </div>
        </div>
        <div className="border-4 border-black p-2 rounded-md">
        <Image src={image3} width={400} height={400} alt="feature3"/>
        </div>
        
      </div>

      {/* Feature 4 */}
      <div className="shadow-lg rounded-xl bg-white text-black p-8 hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 flex justify-between">
        <div className="flex flex-col justify-center mx-2 p-3">
        <h3 className="text-4xl font-bold text-yellow-600">
          Personalized Suggestions
        </h3>
        <p className="text-2xl mt-4 text-gray-700">
          Get tailored recommendations based on your learning style and goals.
        </p>
        <div className="mt-6">
          <Button className="bg-yellow-500 text-white hover:bg-yellow-600 font-bold text-2xl py-6 px-6 rounded-full">
            Get Suggestions
          </Button>
        </div>
        </div>
        <div className="border-4 border-black p-2 rounded-md">
        <Image src={image4} width={400} height={400} alt="feature4"/>
        </div>
        
      </div>
    </div>
  </div>
</section>

      

      {/* How We Work Section */}
      <section id="howWeWorkSection" className="py-36 bg-transparent text-black text-center">
        <h2 className="text-6xl font-bold text-black">How We Work</h2>
        <p className="text-3xl mt-4">
          Learn about our process and how we ensure the best learning experience for our students.
        </p>
        
      </section>
    </div>
  );
};

export default HomePage;
