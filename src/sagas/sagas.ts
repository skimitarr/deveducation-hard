import { put, takeEvery } from 'redux-saga/effects';
import { setUser, removeUser } from '../store/QuizSlice';

export function setUserAction(email: string) {
  return {
    type: 'saga/setUser',
    payload: email,
  };
}

export function* setUserSaga() {
  yield takeEvery('saga/setUser', workSetUser);
}

function* workSetUser({ payload }: { type: string; payload: string }) {
  yield put(setUser(payload));
  localStorage.setItem('email', payload);
}

export function removeUserAction() {
  return {
    type: 'saga/removeUser',
  };
}

export function* removeUserSaga() {
  yield takeEvery('saga/removeUser', workRemoveUser);
}

function* workRemoveUser() {
  yield put(removeUser());
  localStorage.removeItem('email');
}
