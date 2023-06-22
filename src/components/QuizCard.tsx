import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateUserDataThatJoinQuizAction, updateStatusQuizAction } from '../sagas/sagas';
import { IQuiz, IUser, QuizCardProps } from '../components/Interfaces';

const QuizCard = ({ quiz, getCurrentQuizId }: QuizCardProps) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (quiz.users.length >= 2 && quiz.status !== 'finished') {
      dispatch(updateStatusQuizAction(quiz.id, 'started'));
      if (isButtonClicked) {
        getCurrentQuizId(quiz.id); //переход на старт квиза
      }
    }
  }, [dispatch, getCurrentQuizId, quiz.id, quiz.users.length, isButtonClicked, quiz.status]);

  const joinQuiz = (i: IQuiz) => {
    setIsButtonClicked(true);
    const localUser = localStorage.getItem('user');
    if (localUser) {
      const userData = JSON.parse(localUser);
      dispatch(
        updateUserDataThatJoinQuizAction(
          {
            displayName: userData.displayName,
            score: 0,
            idParent: i.id,
            idUser: userData.idUser,
          },
          'addUser'
        )
      );
    }
    if (i.users.length >= 2) {
      dispatch(updateStatusQuizAction(i.id, 'started'));
      getCurrentQuizId(i.id); //переход на старт квиза
    }
  };

  const winner = () => {
    let winner: IUser = { score: 0, displayName: '', photoUrl: '', idUser: '' };
    let maxScore = -Infinity;
    quiz.users.forEach((user: IUser) => {
      if (user.score && user.score > maxScore) {
        maxScore = user.score;
        winner = user;
      }
    });
    return winner;
  };

  return (
    <div className='quiz__card flex'>
      <p>Quiz category: {quiz.category}</p>
      <p>Quiz difficulty: {quiz.difficulty}</p>
      <p>Quiz status: {quiz.status}</p>

      {quiz.status === 'finished' ? (
        <div>The winner is {winner()?.displayName}</div>
      ) : quiz.status === 'started' ? (
        <p>Is gaming now</p>
      ) : isButtonClicked && quiz.users.length < 2 ? (
        <>
          <p>Users ready for quiz: {quiz.users.length}</p>
          <div>Waiting for members to start quiz...</div>
        </>
      ) : (
        <>
          <p>Users ready for quiz: {quiz.users.length}</p>
          <button onClick={() => joinQuiz(quiz)} className='btn quiz__btn quiz__btn-start'>
            Join
          </button>
        </>
      )}
    </div>
  );
};
export default QuizCard;
