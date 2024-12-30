"use client"
import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-600 to-black text-white">
      {/* Navbar */}
      <nav className="bg-black shadow-lg py-6 px-12 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-yellow-400">EduConnect</span>
        </div>
        <div className="flex items-center space-x-8">
          <button className="text-yellow-400 hover:text-yellow-200">Home</button>
          <button className="text-yellow-400 hover:text-yellow-200">Profile</button>
          <button
            className="bg-yellow-400 text-black hover:bg-yellow-500 py-2 px-4 rounded-md"
            onClick={() => dispatch({ type: "SHOW_LOGIN_MODAL" })}
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero flex flex-col items-center justify-center text-center py-36">
        <div className="relative w-full h-80">
          <Image
            src="/hero-image.jpg" // Replace with a relevant image URL
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg opacity-50"
          />
        </div>
        <h1 className="text-5xl font-bold mb-6 text-yellow-400">Shape Your Future with the Right Courses</h1>
        <p className="text-lg mb-8 max-w-xl mx-auto text-yellow-100">
          Discover tailored courses to help you achieve your career goals. Whether you want to be a software developer, a designer, or a marketer, we’ve got you covered.
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-6 rounded-md">
          Start Your Journey
        </button>
      </section>

      {/* Suggested Courses Section */}
      <section className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold text-yellow-400 mb-8">Popular Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Example Course Card */}
          <div className="bg-black p-6 rounded-lg shadow-lg border border-yellow-400">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">Web Development</h3>
            <p className="text-yellow-100 mb-4">Learn the latest frameworks, tools, and languages to build modern web applications.</p>
            <button className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black py-2 px-4 border rounded-md">
              View Course
            </button>
          </div>
          {/* Add more course cards as needed */}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
