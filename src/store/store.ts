import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { setUserSaga, removeUserSaga } from '../sagas/sagas';
import quizSlice from './QuizSlice';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    quiz: quizSlice,
  },
  middleware: [saga],
});

saga.run(setUserSaga);
saga.run(removeUserSaga);

export default store;
