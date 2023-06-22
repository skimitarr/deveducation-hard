import { put, takeEvery } from 'redux-saga/effects';

import { setUser, removeUser } from '../store/QuizSlice';
import { IUser } from '../components/Interfaces';

// ---------------------------------------------------
export function setUserAction(data: IUser) {
  return {
    type: 'saga/setUser',
    payload: data,
  };
}

export function* setUserSaga() {
  yield takeEvery('saga/setUser', workSetUser);
}

function* workSetUser({ payload }: { type: string; payload: string }) {
  yield put(setUser(payload));
  localStorage.setItem('user', JSON.stringify(payload));
}

// ---------------------------------------------------
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
  localStorage.removeItem('user');
}
