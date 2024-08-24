import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  academicYear: null,
  selectedClass: null,
  selectedSection: null,
  selectedSubject: null,
  selectedAssignment: null,
  title: '',
  dueDate: null, // Change to null or initial timestamp
  dueTime: null, // Change to null or initial timestamp
  description: '',
};

const homeworkSlice = createSlice({
  name: 'homework',
  initialState,
  reducers: {
    setAcademicYear(state, action) {
      state.academicYear = action.payload;
    },
    setSelectedClass(state, action) {
      state.selectedClass = action.payload;
    },
    setSelectedSection(state, action) {
      state.selectedSection = action.payload;
    },
    setSelectedSubject(state, action) {
      state.selectedSubject = action.payload;
    },
    setSelectedAssignment(state, action) {
      state.selectedAssignment = action.payload;
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setDueDate(state, action) {
      state.dueDate = action.payload.getTime(); // Store as timestamp
    },
    setDueTime(state, action) {
      state.dueTime = action.payload.getTime(); // Store as timestamp
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
  },
});

export const {
  setAcademicYear,
  setSelectedClass,
  setSelectedSection,
  setSelectedSubject,
  setSelectedAssignment,
  setTitle,
  setDueDate,
  setDueTime,
  setDescription,
} = homeworkSlice.actions;

export default homeworkSlice.reducer;
