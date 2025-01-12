"use client";
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircle, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchCourseDetails } from '@/store/thunks/courseThunks';
import { useRouter } from 'next/router';

type Props = {
    params: Promise<{ courseId: string }>;
};

const CoursePage = ({ params }: Props) => {
    const { courseId } = use(params);
    const dispatch: AppDispatch = useDispatch();
    const userId = localStorage.getItem('userId') || '';
    const { course, loading, error } = useSelector((state: RootState) => state.courses);


    useEffect(() => {
        // Fetch course details when the component mounts
        if (userId && courseId) {
            dispatch(fetchCourseDetails({ userId, courseId }));
        }
    }, [dispatch, userId, courseId]);

    // State for completed assessments
    const [completedAssessments, setCompletedAssessments] = useState(0);

    // Handle assessment button click
    const navigateToQuiz = (topic: string) => {
        if (typeof window !== "undefined") {
            window.location.href = `/quiz?topic=${encodeURIComponent(topic)}`;
        }
    };

    const handleTakeAssessment = () => {
        if (course && completedAssessments < course.completedAssessments) {
            setCompletedAssessments(completedAssessments + 1);
        } 
        navigateToQuiz(course?.title || 'General Quiz');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            {/* Navbar */}
            <nav className="bg-yellow-400 text-neutral-950 py-4 px-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Course Details</h1>
                <div className="space-x-4">
                    <Link href="/">
                        <span className="py-2 px-4 bg-black text-white rounded-md">Home</span>
                    </Link>
                    <Link href="/profile">
                        <span className="py-2 px-4 bg-black text-white rounded-md">Profile</span>
                    </Link>
                </div>
            </nav>

            {/* Course Details Section */}
            <div className="max-w-4xl mx-auto py-10 px-6 bg-white shadow-md rounded-lg mt-6">
                <div className="my-6">
                    <h2 className="text-3xl font-bold mb-4">{course?.title || 'Loading Course...'}</h2>
                    <p className="text-lg text-gray-700 mb-4">{course?.description || 'No description available.'}</p>
                    {course?.url && (
                        <a
                            href={course.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-500 underline"
                        >
                            Visit Course Link
                        </a>
                    )}
                </div>

                <div>
                    <h3 className="text-2xl font-semibold mb-4 my-6">Assessments</h3>
                    <p className="text-lg mb-2">
                        Total Assessments: <span className="font-bold">10</span>
                    </p>
                    <p className="text-lg mb-4">
                        Completed Assessments: <span className="font-bold">{course?.completedAssessments || 0}</span>
                    </p>
                </div>

                <div className="flex gap-2 mb-4 mt-6">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div
                            key={index}
                            className={`w-8 h-8 rounded-full flex justify-center items-center ${
                                index < (course?.completedAssessments || 0)
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 text-gray-500'
                            }`}
                        >
                            {index < completedAssessments ? (
                                <FontAwesomeIcon icon={faCheck} /> // Green tick icon
                            ) : (
                                <FontAwesomeIcon icon={faQuestion} /> // Gray circle icon
                            )}
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleTakeAssessment}
                    className={`py-2 px-4 rounded-md text-black mt-8 ${
                        completedAssessments < 10
                            ? 'bg-yellow-400'
                            : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={completedAssessments >= 10}
                >
                    {completedAssessments < 10
                        ? `Take Assessment ${completedAssessments + 1}`
                        : 'All Assessments Completed'}
                </button>
            </div>
        </div>
    );
};

export default CoursePage;
