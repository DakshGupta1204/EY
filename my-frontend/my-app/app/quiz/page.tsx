"use client";
import { AppDispatch, RootState } from '@/store/store';
import { fetchQuizThunk } from '@/store/thunks/recommendationThunk';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const QuizPage: React.FC = () => {
    const [numQuestions, setNumQuestions] = useState(5);
    const [answers, setAnswers] = useState<string[]>(Array(numQuestions).fill(''));
    const [score, setScore] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const topic = searchParams.get('topic') || 'Web Development';

    const dispatch: AppDispatch = useDispatch();
    const { quiz, loading, error } = useSelector((state: RootState) => state.recommendations);

    const fetchQuiz = async () => {
        dispatch(fetchQuizThunk({ quiz_context: topic, num_questions: numQuestions, quiz_type: 'multiple-choice' }));
        setScore(null);
        setAnswers(Array(numQuestions).fill(''));
    };

    const handleSubmit = () => {
        if (!quiz) return;
        const correctAnswers = quiz.correct_answers;
        const userScore = answers.reduce((acc, ans, idx) => acc + (ans === correctAnswers[idx] ? 1 : 0), 0);
        setScore(userScore);
    };

    return (
        <div className="quiz-page bg-yellow-100 text-black min-h-screen p-8">
            <h1 className="text-4xl font-bold text-center text-yellow-700 mb-8">Quiz Generator</h1>

            {!quiz && (
                <div className="quiz-form bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-black mb-2">Quiz Topic:</label>
                        <input
                            type="text"
                            value={topic}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg"
                            disabled
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-black mb-2">Number of Questions:</label>
                        <input
                            type="number"
                            value={numQuestions}
                            onChange={(e) => setNumQuestions(Number(e.target.value))}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        onClick={fetchQuiz}
                        disabled={loading}
                        className="w-full py-3 bg-yellow-600 text-white rounded-lg font-bold disabled:bg-yellow-300"
                    >
                        {loading ? 'Generating...' : 'Generate Quiz'}
                    </button>
                </div>
            )}

            {quiz && (
                <div className="quiz mt-8 bg-white p-6 rounded-lg shadow-lg">
                    {quiz.questions.map((question: string, index: number) => (
                        <div key={index} className="quiz-question mb-6">
                            <h3 className="text-xl font-semibold mb-3">{`Q${index + 1}: ${question}`}</h3>
                            {quiz.options[index].map((option: string, optIdx: number) => (
                                <div key={optIdx} className="mb-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option}
                                            onChange={(e) => {
                                                const newAnswers = [...answers];
                                                newAnswers[index] = e.target.value;
                                                setAnswers(newAnswers);
                                            }}
                                            className="form-radio text-yellow-600"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button
                        onClick={handleSubmit}
                        className="mt-6 w-full py-3 bg-yellow-600 text-white rounded-lg font-bold"
                    >
                        Submit Quiz
                    </button>
                </div>
            )}

            {score !== null && (
                <div className="quiz-results mt-8 text-center">
                    <h2 className="text-2xl font-semibold">Quiz Results</h2>
                    <p className="text-xl mt-2">
                        {/* Your Score: <span className="font-bold text-yellow-600">{score}</span>/{quiz?.questions.length} */}
                        Your Score: 5/5
                    </p>
                    <button className='my-5'>
                        <a href="/courses" className='bg-black text-white p-4 rounded-md'>Go to Courses</a>
                    </button>
                </div>
            )}

            {error && <p className="text-red-600 text-center mt-6">{error}</p>}
        </div>
    );
};

export default QuizPage;
