"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { AppDispatch, RootState } from '@/store/store';
import { deleteCourseThunk, fetchUserCourses } from '@/store/thunks/courseThunks';

const MyCoursesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading, error } = useSelector((state: RootState) => state.courses);
  const userId = localStorage.getItem('userId');
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  useEffect(() => {
    if(userId)dispatch(fetchUserCourses(userId));
  }, [dispatch]);

  const handleRemoveCourse = (courseId: string) => {
    if (userId) {
      dispatch(deleteCourseThunk({ userId, courseId }));
    }
  };

  const handleNextStep = (id: string) => {
    console.log(`Move to the next step for course ID: ${id}`);
  };
  const handleToggleDescription = (courseId: string) => {
    setExpandedCourse((prev) => (prev === courseId ? null : courseId));
  };
  return (
    <div id="webcrumbs" className="w-full min-h-screen bg-black text-yellow-400 p-10">
      <nav className="flex justify-between items-center mb-6 sticky top-0 py-4 px-8 rounded-md z-10 bg-[#1c1c1c]">
        <h1 className="text-2xl font-semibold text-yellow-400">My Courses</h1>
        <div className="flex space-x-4">
          <Link href="/" className="bg-yellow-400 text-neutral-950 rounded-md text-sm py-2 px-4">Home</Link>
          <Link href="/profile" className="bg-yellow-400 text-neutral-950 rounded-md text-sm py-2 px-4">Profile</Link>
          <button className="bg-yellow-400 text-neutral-950 rounded-md text-sm py-2 px-4">Logout</button>
        </div>
      </nav>

      <div className="max-w-screen min-h-[600px] bg-black text-primary-50 shadow-xl rounded-lg flex flex-col p-8 mx-auto">
        {loading && <p>Loading courses...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-wrap gap-6">
          {courses.map((course) => (
            <div
            key={course.id}
            className={`w-[300px] rounded-md bg-white text-neutral-950 p-4 flex flex-col justify-between border-2 transition-all duration-300 ${
              expandedCourse === course.id ? 'h-auto' : 'h-[420px]'
            }`}
          >
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-semibold">{course.title}</h2>
                {course.completed && (
                  <span className="rounded-full w-24 h-8 flex justify-center items-center bg-green-500 text-white">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                )}
              </div>

              <div className="relative ">
                <p
                  className={`text-1xl text-neutral-700 mt-0 overflow-hidden transition-all duration-300 ${
                    expandedCourse === course.id ? 'max-h-full' : 'max-h-12'
                  }`}
                >
                  {course.description}
                </p>

                <button
                  className="absolute bottom-[-15] left-0 text-blue-500 text-sm mt-2"
                  onClick={() => handleToggleDescription(course.id)}
                >
                  {expandedCourse === course.id ? 'Show Less' : 'Read More'}
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <Link href={`/courses/${course.id}`}>
                <button className="w-full bg-green-500 text-white rounded-md text-sm py-2">Go to CoursePage</button>
              </Link>
              <button
                className="w-full bg-red-500 text-white rounded-md text-sm py-2"
                onClick={() => handleRemoveCourse(course.id)}
              >
                Remove Course
              </button>
              {course.completed && (
                <button
                  className="w-full bg-blue-500 text-white rounded-md text-sm py-2"
                  onClick={() => handleNextStep(course.id)}
                >
                  Next Step
                </button>
              )}
            </div>
          </div>
          ))}

          <div className="w-[320px] h-[420px] rounded-md bg-black flex flex-col justify-center items-center border-2 border-dashed border-yellow-400">
            <Link className="w-[48px] h-[48px] bg-yellow-400 text-neutral-950 rounded-full flex justify-center items-center" href="/recommendation">
              <span className="material-symbols-outlined text-4xl">+</span>
            </Link>
            <p className="text-sm text-yellow-400 mt-3">Add More Courses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesPage;
