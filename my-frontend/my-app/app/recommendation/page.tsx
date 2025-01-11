"use client";
// components/RecommendationPage.tsx
import { AppDispatch } from '@/store/store';
import { fetchRecommendationsThunk } from '@/store/thunks/recommendationThunk';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RecommendationPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [interest, setInterest] = useState('');
  const [skills, setSkills] = useState('');
  const [level, setLevel] = useState('');

  const { data: recommendations, loading, error } = useSelector((state: any) => state.recommendations);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchRecommendationsThunk({ interest, skills, level }));
    console.log('Hello');
  };

  return (
    <div className="min-h-screen bg-yellow-100 text-black flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-yellow-800 mb-8">Course Recommendations</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-200 shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <input
          type="text"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          placeholder="Your interest"
          className="w-full px-4 py-2 rounded-md border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Your skills"
          className="w-full px-4 py-2 rounded-md border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />
        <input
          type="text"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          placeholder="Difficulty level (Beginner, Intermediate, Advanced)"
          className="w-full px-4 py-2 rounded-md border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition-colors"
        >
          Get Recommendations
        </button>
      </form>

      {loading && <p className="text-yellow-700 mt-4">Loading...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {recommendations && (
        <ul className="mt-6 space-y-4 w-full max-w-2xl">
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendationPage;
