import { useState } from 'react';

import Chat from '../components/Chat';
import QuizRegistration from '../components/QuizRegistration';
import Quiz from '../components/Quiz';

const Main = () => {
  const [currentQuizId, setCurrentQuizId] = useState('');
  const [isQuiz, setIsQuiz] = useState(false);

  const getCurrentQuizId = (currentQuizId: string) => {
    setCurrentQuizId(currentQuizId);
    setIsQuiz(!isQuiz);
  };

  return (
    <main className='main '>
      <div className='main__container'>
        {isQuiz ? (
          <Quiz id={currentQuizId} setIsQuiz={setIsQuiz} />
        ) : (
          <QuizRegistration getCurrentQuizId={getCurrentQuizId} />
        )}
        <Chat />
      </div>
    </main>
  );
};
export default Main;
