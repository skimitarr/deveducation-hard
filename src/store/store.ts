import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { setUserSaga, removeUserSaga } from '../sagas/userSaga';
import { sendMessageSaga, getMessagesSaga } from '../sagas/messageSaga';
import {
  getQuizesSaga,
  updateUserDataThatJoinQuizSaga,
  updateStatusQuizSaga,
} from '../sagas/sagas';

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
saga.run(sendMessageSaga);
saga.run(getMessagesSaga);
saga.run(getQuizesSaga);
saga.run(updateUserDataThatJoinQuizSaga);
saga.run(updateStatusQuizSaga);

export default store;
