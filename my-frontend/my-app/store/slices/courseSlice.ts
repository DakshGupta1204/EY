import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCourseThunk, fetchCourseDetails, fetchUserCourses } from "../thunks/courseThunks";

interface Course {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    completedAssessments: number;
    url:string
  }
  interface ICourse {
    id: string;
    title: string;
    description: string;
    url: string;
    completed: boolean;
    completedAssessments: number;
  }
  interface CoursesState {
    courses: Course[];
    loading: boolean;
    error: string | null;
    course: Course | null;
  }
  
  const initialState: CoursesState = {
    courses: [],
    loading: false,
    error: null,
    course: null,
  };
  
  const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserCourses.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserCourses.fulfilled, (state, action) => {
          state.loading = false;
          state.courses = action.payload;
        })
        .addCase(fetchUserCourses.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(deleteCourseThunk.pending, (state) => {
            state.loading = true;
          })
          .addCase(deleteCourseThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.courses = action.payload.courses; // Updated courses after deletion
          })
          .addCase(deleteCourseThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          })
          .addCase(fetchCourseDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchCourseDetails.fulfilled, (state, action: PayloadAction<ICourse>) => {
            state.loading = false;
            state.course = action.payload;
          })
          .addCase(fetchCourseDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });
    },
  });
  
  export default coursesSlice.reducer;