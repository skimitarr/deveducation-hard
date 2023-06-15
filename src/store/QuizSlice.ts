import { createSlice } from '@reduxjs/toolkit';

import { IQuizSliceState } from '../components/Interfaces';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    userData: null,
    messages: null,
  } as IQuizSliceState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
    },
    removeUser(state) {
      state.userData = null;
    },
    getMessages(state, action) {
      state.messages = action.payload;
    },
    // quizReducer(state, action) {
    //   state.quizState = action.payload;
    // },
  },
});

export const { setUser, removeUser, getMessages } = quizSlice.actions;
export default quizSlice.reducer;
