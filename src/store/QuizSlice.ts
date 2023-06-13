import { createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    userState: [],
    chatState: [],
    quizState: [],
  } as any,
  reducers: {
    userReducer(state, action) {
      state.userState = action.payload;
    },
    chatReducer(state, action) {
      state.chatState = action.payload;
    },
    quizReducer(state, action) {
      state.quizState = action.payload;
    },
  },
});

export const { userReducer, chatReducer, quizReducer } = quizSlice.actions;
export default quizSlice.reducer;
