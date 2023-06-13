import { createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    userEmail: null,
    chatState: [],
    quizState: [],
  } as any,
  reducers: {
    setUser(state, action) {
      state.userEmail = action.payload;
    },
    removeUser(state) {
      state.userEmail = null;
    },
    chatReducer(state, action) {
      state.chatState = action.payload;
    },
    quizReducer(state, action) {
      state.quizState = action.payload;
    },
  },
});

export const { setUser, removeUser, chatReducer, quizReducer } = quizSlice.actions;
export default quizSlice.reducer;
