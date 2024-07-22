
import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    currentLesson: null,
    previousLessons: [],
    loading: false,
  },
  reducers: {
    addLesson: (state, action) => {
      if (state.currentLesson) {
        state.previousLessons.push(state.currentLesson);
      }
      state.currentLesson = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        equation: action.payload.equation,
      };
    },
    setCurrentLesson: (state, action) => {
      state.currentLesson = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateLesson: (state, action) => {
      // Update the equation in the current lesson without saving it to the sidebar
      if (state.currentLesson) {
        state.currentLesson = {
          ...state.currentLesson,
          equation: action.payload.equation,
        };
      }
    },
  },
});

export const { addLesson, setCurrentLesson, setLoading, updateLesson } = dataSlice.actions;
export default dataSlice.reducer;



