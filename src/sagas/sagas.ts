import { call, put, takeEvery } from 'redux-saga/effects';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  DocumentData,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

import { setUser, removeUser, getMessages, getQuizes } from '../store/QuizSlice';
import { db } from '../firebase';
import { IUser, IMessages } from '../components/Interfaces';

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

// ---------------------------------------------------
const sendApiMessage = async (data: IMessages) => {
  // отправка объекта с установкой автоматического id
  await addDoc(collection(db, 'messages'), {
    idUser: data.idUser,
    displayName: data.displayName,
    photoUrl: data.photoUrl,
    text: data.text,
    createdAt: data.createdAt,
  });
};

export function sendMessageAction(data: IMessages) {
  return {
    type: 'saga/sendMessage',
    payload: data,
  };
}

export function* sendMessageSaga() {
  yield takeEvery('saga/sendMessage', workSendMessage);
}

function* workSendMessage({ payload }: { type: string; payload: IMessages }) {
  yield call(sendApiMessage, payload);
}

// ---------------------------------------------------
async function watchApiMessages() {
  const queryCollection = query(collection(db, 'messages'));
  type IArr = DocumentData[];

  const array = await new Promise((resolve) => {
    const unsubscribe = onSnapshot(queryCollection, (data) => {
      let tempArr: IArr = [];
      data.forEach((i) => {
        tempArr.push(i.data());
      });
      resolve(tempArr);
      return tempArr;
    });
    return () => unsubscribe();
  });
  return array;
}

export function getMessagesAction() {
  return {
    type: 'saga/getMessage',
  };
}

export function* getMessagesSaga() {
  yield takeEvery('saga/getMessage', workGetMessages);
}

function* workGetMessages(): Generator<any, void, IMessages[]> {
  const item: IMessages[] = yield call(() => watchApiMessages());
  yield put(getMessages(item));
}

// ---------------------------------------------------
export async function watchApiQuizes() {
  const queryCollection = query(collection(db, 'quizes'));
  type IArr = DocumentData[];

  const array = await new Promise((resolve) => {
    const unsubscribe = onSnapshot(queryCollection, (data) => {
      let tempArr: IArr = [];
      data.forEach((i) => {
        let addingId = i.data();
        addingId.id = i.id;
        tempArr.push(addingId);
      });
      resolve(tempArr);
      return tempArr;
    });
    return () => unsubscribe();
  });
  return array;
}

export function getQuizesAction() {
  return {
    type: 'saga/getQuizes',
  };
}

export function* getQuizesSaga() {
  yield takeEvery('saga/getQuizes', workGetQuizes);
}

function* workGetQuizes() {
  const item: IMessages[] = yield call(() => watchApiQuizes());
  yield put(getQuizes(item));
}

// ---------------------------------------------------
const updateUserDataThatJoinQuiz = async (data: any, flag: string) => {
  const userData = doc(db, 'quizes', `${data.idParent}`);
  const docSnapshot = await getDoc(userData);
  if (docSnapshot.exists()) {
    const existingUsers = docSnapshot.data().users;
    let temp: any[] = [];
    let updatedUsers = existingUsers.filter((user: any) => user.idUser === data.idUser);

    if (updatedUsers.length === 0 && flag === 'addUser') {
      const newUser = {
        score: data.score,
        displayName: data.displayName,
        idParent: data.idParent,
        idUser: data.idUser,
      };
      temp = [...existingUsers, newUser];
    }

    if (updatedUsers.length > 0) {
      updatedUsers[0].score = data.score;
      updatedUsers[0].displayName = data.displayName;
      updatedUsers[0].idParent = data.idParent;
      updatedUsers[0].idUser = data.idUser;
      temp = existingUsers.map((user: any) =>
        user.idUser === data.idUser ? updatedUsers[0] : user
      );
    }
    await updateDoc(userData, { users: temp });
  }
};
export function updateUserDataThatJoinQuizAction(readyForQuiz: any, flag: string) {
  return {
    type: 'saga/updateUserData',
    payload: { readyForQuiz, flag },
  };
}

export function* updateUserDataThatJoinQuizSaga() {
  yield takeEvery('saga/updateUserData', workUpdateUserDataThatJoinQuiz);
}

function* workUpdateUserDataThatJoinQuiz({ payload }: { type: string; payload: any }) {
  const { readyForQuiz, flag } = payload;
  yield call(() => updateUserDataThatJoinQuiz(readyForQuiz, flag));
}

// ---------------------------------------------------
const updateStatusQuiz = async (id: any, status: any) => {
  const userData = doc(db, 'quizes', `${id}`);
  await updateDoc(userData, { status: status });
};

export function updateStatusQuizAction(id: any, status: any) {
  return {
    type: 'saga/updateStatusQuiz',
    payload: { id, status },
  };
}

export function* updateStatusQuizSaga() {
  yield takeEvery('saga/updateStatusQuiz', workUpdateStatusQuiz);
}

function* workUpdateStatusQuiz({ payload }: { type: string; payload: any }) {
  const { id, status } = payload;
  yield call(() => updateStatusQuiz(id, status));
}
