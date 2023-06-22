import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot } from 'firebase/firestore';
import { Modal } from 'antd';

import { db } from '../firebase';
import {
  updateUserDataThatJoinQuizAction,
  getQuizesAction,
  updateStatusQuizAction,
} from '../sagas/sagas';
import createQuiz from '../components/createQuiz';
import { QuizProps, IState, IUser } from '../components/Interfaces';

const Quiz = ({ id, setIsQuiz }: QuizProps) => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const quizesApi = useSelector((state: IState) => state.quiz.quizes);
  const tempArr = quizesApi.filter((item) => item.id === id);
  const currentQuiz = tempArr[0];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'quizes'), () => {
      dispatch(getQuizesAction());
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    if (score) {
      const localUser = localStorage.getItem('user');
      if (localUser) {
        const userData = JSON.parse(localUser);
        dispatch(
          updateUserDataThatJoinQuizAction(
            {
              score: score,
              displayName: userData.displayName,
              idParent: id,
              idUser: userData.idUser,
            },
            'updateUser'
          )
        );
      }
    }
  }, [score, dispatch, id]);

  const handleClick = (currentAnswer: string): void => {
    if (counter < currentQuiz.questions.length - 1) {
      setCounter(counter + 1);
    } else {
      //тут то, что мы делаем после конца игры
      setIsModalOpen(true);
      dispatch(updateStatusQuizAction(currentQuiz.id, 'finished'));
      createQuiz();
    }

    if (currentAnswer === currentQuiz.answers[counter].correct_answer) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
  };

  const answers = () => {
    const renderedAnswers = [];
    for (let index = 0; index < 4; index++) {
      renderedAnswers.push(
        <div
          key={index}
          className='quiz__answer-card flex'
          onClick={() => handleClick(currentQuiz.answers[counter][index])}
        >
          <p>{currentQuiz.answers[counter][index]}</p>
        </div>
      );
    }
    return <div className='quiz__answer-wrapper flex'>{renderedAnswers}</div>;
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsQuiz(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsQuiz(false);
  };

  const winner = (): JSX.Element => {
    let winner: IUser = { score: 0, displayName: '', photoUrl: '', idUser: '' };
    let maxScore = -Infinity;
    currentQuiz.users.forEach((user: IUser) => {
      if (user.score && user.score > maxScore) {
        maxScore = user.score;
        winner = user;
      }
    });
    if (winner) {
      return (
        <p>
          Winner is {winner.displayName} with score {winner.score}
        </p>
      );
    } else {
      return <p></p>;
    }
  };

  const renderQuiz = () => {
    if (currentQuiz.status === 'started') {
      return (
        <>
          <div className='quiz__question'>
            <span>{currentQuiz.questions[counter]}</span>
          </div>
          {answers()}
          <div className='quiz__results flex'>
            {currentQuiz.users.map((user, index) => {
              return (
                <div key={index}>
                  <p>name: {user.displayName}</p>
                  <p>score: {user.score}</p>
                </div>
              );
            })}
          </div>
        </>
      );
    }
    if (currentQuiz.status === 'finished') {
      // setIsModalOpen(true);
      return (
        <>
          <div>Your opponent has finished the quiz first</div>
          {winner()}
          <button onClick={() => setIsQuiz(false)}>Come back to quizes</button>
        </>
      );
    }
  };

  return (
    <div className='quiz__quest-container flex'>
      {renderQuiz()}

      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
        {winner()}
      </Modal>
    </div>
  );
};
export default Quiz;
