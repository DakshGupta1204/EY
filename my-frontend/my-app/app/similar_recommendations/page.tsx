"use client"
import { AppDispatch, RootState } from '@/store/store';
import { recommendSimThunk } from '@/store/thunks/recommendationThunk';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RecommendSim = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentCourse, setCurrentCourse] = useState('');
  const { loading, recommendation, error } = useSelector(
    (state: RootState) => state.recommendations
  );
  const array = recommendation?.recommendations || [];

  const handleRecommend = () => {
    dispatch(recommendSimThunk({ current_course: currentCourse }));
  };

  return (
    <div className="bg-black min-h-screen text-white p-8">
      {/* Navbar */}
      <div className="bg-[#1c1c1c] text-yellow-500 flex justify-between items-center p-4 rounded-md sticky top-2">
        <div className="text-2xl font-bold">EduConnect</div>
        <div>
          <button className="mr-4 text-xl hover:text-gray-300">Home</button>
          <button className="text-xl hover:text-gray-300">Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        <div>
          <input
            type="text"
            value={currentCourse}
            onChange={(e) => setCurrentCourse(e.target.value)}
            placeholder="Enter current course"
            className="p-2 w-full text-black rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <button
          onClick={handleRecommend}
          disabled={loading}
          className="w-full p-3 mt-4 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 disabled:opacity-50 font-bold"
        >
          {loading ? 'Loading...' : 'Recommend'}
        </button>

        {error && <p className="text-red-500">{error}</p>}

        {array.length > 0 && (
          <ul className="space-y-4">
            {array.map((rec, index) => (
              <li key={index} className="bg-white text-black p-4 rounded-md">
                <h3 className="text-2xl font-bold text-yellow-600">{rec['Course Name']}</h3>
                <p>{rec.Description}</p>
                <p className="text-yellow-500">{rec['Difficulty Level']}</p>
                <button className='bg-yellow-500 text-black rounded-md p-2 mt-2 font-bold'>
                    Add Course
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecommendSim;
