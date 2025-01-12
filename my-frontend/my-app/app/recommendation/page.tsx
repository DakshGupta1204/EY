"use client";
// components/RecommendationPage.tsx
import { AppDispatch, RootState } from '@/store/store';
import { addCourseThunk } from '@/store/thunks/courseThunks';
import { fetchRecommendationsThunk } from '@/store/thunks/recommendationThunk';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RecommendationPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [interest, setInterest] = useState('');
  const [skills, setSkills] = useState('');
  const [level, setLevel] = useState('');

  const { data: recommendations, loading, error } = useSelector((state: any) => state.recommendations);

  const userId = localStorage.getItem('userId');
  console.log("userId", userId);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchRecommendationsThunk({ interest, skills, level }));
    console.log('Hello');
  };

  return (
    <div className='min-h-screen bg-black text-yellow-500 flex flex-col'>
      {/* Navbar */}
      <nav className='bg-[#1c1c1c] px-8 py-4 flex justify-between items-center m-8 mb-0 rounded-md'>
        <div className='flex items-center gap-3'>
          <span className='text-2xl font-bold'>EduConnect</span>
        </div>
        <div className='flex items-center gap-6'>
          <a href='/' className='cursor-pointer font-medium'>Home</a>
          <a className='text-black bg-yellow-500 rounded-md px-4 py-2 font-medium' href='/profile'>Profile</a>
        </div>
      </nav>

      {/* Recommendation Form */}
      <div className='w-[600px] min-h-[500px] bg-white border border-yellow-500 rounded-lg shadow-lg p-8 flex flex-col gap-6 mx-auto mt-12 mb-12'>
        <h1 className='text-3xl font-title font-bold text-yellow-500'>Course Recommendation</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='interest' className='text-base font-bold text-yellow-500'>Your Interest</label>
            <input
              type='text'
              id='interest'
              name='interest'
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className='border border-yellow-500 rounded-md p-2 text-black placeholder:text-neutral-400 bg-white'
              placeholder='e.g., Web Development'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='skills' className='text-base font-bold text-yellow-500'>Your Skills</label>
            <input
              type='text'
              id='skills'
              name='skills'
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className='border border-yellow-500 rounded-md p-2 text-black placeholder:text-neutral-400 bg-white'
              placeholder='e.g., HTML, CSS'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='difficulty' className='text-base font-bold text-yellow-500'>Difficulty Level</label>
            <input
              type='text'
              id='difficulty'
              name='difficulty'
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className='border border-yellow-500 rounded-md p-2 text-black placeholder:text-neutral-400 bg-white'
              placeholder='e.g., Beginner, Intermediate'
            />
          </div>
          <button
            type='submit'
            className='w-[150px] h-[40px] bg-yellow-500 text-black rounded-md'
          >
            Submit
          </button>
        </form>
      </div>

      {/* Recommendations */}
      {loading && <p className="text-yellow-700 mt-4">Loading...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {recommendations && (
  <ul className="mt-6 space-y-4 w-full max-w-2xl mx-auto">
    {recommendations.map((course: any, index: number) => (
      <li
        key={index}
        className="bg-yellow-200 shadow-lg rounded-lg p-4 border border-yellow-300 hover:bg-yellow-300 transition-colors"
      >
        <h3 className="text-lg font-bold text-yellow-800">{course['Course Name']}</h3>
        <p className="text-sm text-yellow-700">{course['University']}</p>
        <p className="text-sm text-yellow-700">Rating: {course['Course Rating']}</p>
        <a
          href={course['Course URL']}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-900 underline hover:text-yellow-600"
        >
          View Course
        </a>
        <button
          onClick={() =>
            dispatch(
              addCourseThunk({
                userId: userId||"",
                title: course['Course Name'],
                description: course['Course Description'],
                url: course['Course URL'],
              })
            )
          }
          className="block mt-2 bg-yellow-500 text-black rounded-md px-4 py-2 font-medium"
        >
          Add Course
        </button>
      </li>
    ))}
  </ul>
)}
    </div>
  );
};

export default RecommendationPage;
