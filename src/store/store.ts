import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

// import { roomSaga } from '../sagas/sagas';
import quizSlice from './QuizSlice';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    accountsRooms: quizSlice,
  },
  middleware: [saga],
});

// saga.run(roomSaga);

export default store;
