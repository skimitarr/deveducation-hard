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
    <div
      className='quiz__card flex'
      style={{
        backgroundColor: quiz.status === 'pending' ? 'white' : 'rgba(199, 195, 195, 0.877)',
      }}
    >
      <p className='quiz__subtitle'>
        Quiz category: <span className='quiz__text quiz__category'>{quiz.category}</span>
      </p>
      <p className='quiz__subtitle'>
        Quiz difficulty: <span className='quiz__text'>{quiz.difficulty}</span>
      </p>
      <p className='quiz__subtitle'>
        Quiz status: <span className='quiz__text'>{quiz.status}</span>
      </p>

      {quiz.status === 'finished' ? (
        <p className='quiz__subtitle'>
          The winner is <span className='quiz__text'>{winner()?.displayName}</span>
        </p>
      ) : quiz.status === 'started' ? (
        <p className='quiz__subtitle'>Is gaming now</p>
      ) : isButtonClicked && quiz.users.length < 2 ? (
        <>
          <p className='quiz__subtitle'>
            Users ready for quiz: <span className='quiz__text'>{quiz.users.length}</span>
          </p>
          <div className='quiz__waiting-container flex'>
            <p className='quiz__subtitle quiz__waiting'>Waiting for members to start quiz...</p>
            <div className='lds-hourglass'></div>
          </div>
        </>
      ) : (
        <>
          <p className='quiz__subtitle'>
            Users ready for quiz: <span className='quiz__text'>{quiz.users.length}</span>
          </p>
          <button onClick={() => joinQuiz(quiz)} className='btn quiz__btn quiz__btn-start'>
            Join
          </button>
        </>
      )}
    </div>
  );
};
export default QuizCard;
