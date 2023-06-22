import { call, put, takeEvery } from 'redux-saga/effects';
import {
  collection,
  onSnapshot,
  query,
  DocumentData,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

import { getQuizes } from '../store/QuizSlice';
import { db } from '../firebase';
import { IMessages, IUser } from '../components/Interfaces';

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
const updateUserDataThatJoinQuiz = async (data: IUser, flag: string) => {
  const userData = doc(db, 'quizes', `${data.idParent}`);
  const docSnapshot = await getDoc(userData);
  if (docSnapshot.exists()) {
    const existingUsers = docSnapshot.data().users;
    let temp: any[] = [];
    let updatedUsers = existingUsers.filter((user: IUser) => user.idUser === data.idUser);

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
      temp = existingUsers.map((user: IUser) =>
        user.idUser === data.idUser ? updatedUsers[0] : user
      );
    }
    await updateDoc(userData, { users: temp });
  }
};
export function updateUserDataThatJoinQuizAction(readyForQuiz: IUser, flag: string) {
  return {
    type: 'saga/updateUserData',
    payload: { readyForQuiz, flag },
  };
}

export function* updateUserDataThatJoinQuizSaga() {
  yield takeEvery('saga/updateUserData', workUpdateUserDataThatJoinQuiz);
}

function* workUpdateUserDataThatJoinQuiz({
  payload,
}: {
  type: string;
  payload: { readyForQuiz: IUser; flag: string };
}) {
  const { readyForQuiz, flag } = payload;
  yield call(() => updateUserDataThatJoinQuiz(readyForQuiz, flag));
}

// ---------------------------------------------------
const updateStatusQuiz = async (id: string, status: string) => {
  const userData = doc(db, 'quizes', `${id}`);
  await updateDoc(userData, { status: status });
};

export function updateStatusQuizAction(id: string, status: string) {
  return {
    type: 'saga/updateStatusQuiz',
    payload: { id, status },
  };
}

export function* updateStatusQuizSaga() {
  yield takeEvery('saga/updateStatusQuiz', workUpdateStatusQuiz);
}

function* workUpdateStatusQuiz({
  payload,
}: {
  type: string;
  payload: { id: string; status: string };
}) {
  const { id, status } = payload;
  yield call(() => updateStatusQuiz(id, status));
}
