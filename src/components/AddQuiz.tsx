import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { Answer, QuizQuestion, IQuiz } from '../components/Interfaces';

const AddQuiz = () => {
  const [url, setUrl] = useState('');
  const [datas, setDatas] = useState<IQuiz | {}>({});

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
    const response = await fetch(`${url}`);
    const data = await response.json();

    let arrAnswers: Answer[] = [];
    data.results.forEach((i: QuizQuestion) => {
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

    setDatas(obj);
  }

  const sendQuizToApi = (data: IQuiz) => {
    addDoc(collection(db, 'quizes'), data);
  };

  const inputUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  useEffect(() => {
    if (Object.keys(datas).length > 0) {
      sendQuizToApi(datas as IQuiz);
    }
  }, [datas]);

  const handleClick = () => {
    createQuiz();
    setUrl('');
  };

  return (
    <div className='quiz__add flex'>
      <p>To add a quiz, enter here</p>
      <input type='text' value={url} onChange={inputUrl} />
      <p>
        address from{' '}
        <a href='https://opentdb.com/api_config.php' target='_blank' rel='noreferrer'>
          https://opentdb.com/api_config.php
        </a>
      </p>
      <button onClick={handleClick} className='btn quiz__btn quiz__btn-start'>
        Add quiz
      </button>
    </div>
  );
};

export default AddQuiz;
