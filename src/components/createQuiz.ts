import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { Answer, QuizQuestion } from '../components/Interfaces';

function shuffle(arr: string[]) {
  var j, temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

async function createQuiz() {
  const url = 'https://opentdb.com/api.php?amount=10&type=multiple';
  const response = await fetch(`${url}`);
  const data = await response.json();

  let arrAnswers: Answer[] = [];
  data.results.forEach((i: QuizQuestion) => {
    console.log(i);
    let temp = {};
    let temparr: string[] = [];
    i.incorrect_answers.forEach((element) => {
      temparr.push(element);
    });
    temparr.push(i.correct_answer);
    shuffle(temparr);
    temp = { ...temparr, correct_answer: i.correct_answer };
    arrAnswers.push(temp);
  });

  const arrQuestions: string[] = [];
  data.results.forEach((i: QuizQuestion) => {
    console.log(i);
    arrQuestions.push(i.question);
  });

  const arrUsers: [] = [];

  const obj = {
    answers: arrAnswers,
    questions: arrQuestions,
    status: 'pending',
    category: data.results[0].category,
    difficulty: data.results[0].difficulty,
    users: arrUsers,
  };

  addDoc(collection(db, 'quizes'), obj);
}
export default createQuiz;
