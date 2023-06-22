import { call, put, takeEvery } from 'redux-saga/effects';
import { collection, addDoc, onSnapshot, query, DocumentData } from 'firebase/firestore';

import { getMessages } from '../store/QuizSlice';
import { db } from '../firebase';
import { IMessages } from '../components/Interfaces';

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
