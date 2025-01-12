'use client'
import React from "react";

const ProfilePage: React.FC = () => {
  return (
    <div id="webcrumbs" className="flex justify-center bg-black min-h-screen p-5">
      <div className="w-full min-h-[800px] h-full bg-yellow-500 rounded-lg shadow-lg px-16 py-8 flex flex-col gap-8">
        
        {/* Navbar */}
        <nav className="w-full flex justify-between items-center mb-8 p-4 bg-black rounded-lg text-neutral-50">
          <h1 className="text-2xl font-bold text-yellow-500">EduConnect</h1>
          <div className="flex gap-6 items-center">
            <a href="/" className="text-yellow-500 text-xl font-bold">Home</a>
            <button  className="text-black bg-yellow-500 rounded-md p-2 text-xl font-bold">Logout</button>
          </div>
        </nav>

        {/* Profile Info Section */}
        <div className="flex gap-8 ">
          <div className="flex flex-col gap-4 w-[300px] bg-white p-3 rounded-md shadow-md">
            <img
              src="https://tools-api.webcrumbs.org/image-placeholder/300/300/avatars/1"
              alt="User Avatar"
              className="w-[300px] h-[300px] object-contain rounded-lg"
            />
            <h1 className="text-2xl font-bold text-neutral-950">Daksh Gupta</h1>
            <p className="text-neutral-950">dakshgpt12@gmail.com</p>
            <p className="text-neutral-950">
              Passionate developer with a knack for creating efficient and innovative
              solutions. Experienced in full-stack development and always eager to
              learn new technologies.
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-neutral-950">Courses & Progress</h2>
            <div className="flex flex-col gap-3">
              {[
                { name: "React for Beginners", progress: 75 },
                { name: "Advanced JavaScript", progress: 60 },
                { name: "UI/UX Design Principles", progress: 90 },
              ].map((course, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <p className="text-neutral-950">{course.name}</p>
                  <div className="w-full h-[10px] bg-neutral-300 rounded-full overflow-hidden">
                    <div className="h-[10px] bg-yellow-600" style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills & Social Links */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-neutral-950">Skills</h2>
            <ul className="flex flex-wrap gap-4 mt-4">
              {["React", "JavaScript", "Node.js", "CSS", "Figma"].map((skill, idx) => (
                <li key={idx} className="px-4 py-2 bg-black text-neutral-50 rounded-full font-bold">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-950">Social</h2>
            <div className="flex flex-col gap-4 mt-4">
              {[
                { name: "GitHub", icon: "fa-github" },
                { name: "LinkedIn", icon: "fa-linkedin" },
                { name: "Instagram", icon: "fa-instagram" },
              ].map((social, idx) => (
                <a key={idx} href="#" className="flex items-center gap-2 text-black">
                  <i className={`fa-brands ${social.icon}`}></i>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
