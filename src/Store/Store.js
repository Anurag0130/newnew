// store.js
import { configureStore } from '@reduxjs/toolkit';
import homeworkReducer from './Slices/homeworkSlices'

const store = configureStore({
  reducer: {
    homework: homeworkReducer,
  },
});

export default store;
