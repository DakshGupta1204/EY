import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = "http://localhost:3000";
interface ICourse {
  id: string;
  title: string;
  description: string;
  url: string;
  completed: boolean;
  completedAssessments: number;
}
// Async thunk for fetching courses of a user
export const fetchUserCourses = createAsyncThunk(
  'courses/fetchUserCourses',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/courses`);
      return response.data.courses;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch courses');
    }
  }
);

export const addCourseThunk = createAsyncThunk(
    'courses/addCourse',
    async (courseData: { userId: string; title: string; description: string; url: string }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/users/${courseData.userId}/courses/add`, {
          title: courseData.title,
          description: courseData.description,
          url: courseData.url,
        });
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const deleteCourseThunk = createAsyncThunk(
    'courses/deleteCourse',
    async ({ userId, courseId }: { userId: string, courseId: string }, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${API_BASE_URL}/users/${userId}/courses/${courseId}/delete`);
        return response.data; // Returning the courses data after deletion
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to delete course');
      }
    }
  );

  export const fetchCourseDetails = createAsyncThunk<
  ICourse, 
  { userId: string; courseId: string }, 
  { rejectValue: string }
>('courses/fetchCourseDetails', async ({ userId, courseId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/courses/${courseId}`);
    return response.data.course; 
  } catch (err: any) {
    return rejectWithValue('Failed to fetch course details');
  }
});
