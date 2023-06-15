import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { isUserToStartQuizAction } from '../sagas/sagas';

const QuizRegistration = () => {
  const [readyForQuiz, setReadyForQuiz] = useState(false);
  const dispatch = useDispatch();

  const startQuiz = () => {
    dispatch(isUserToStartQuizAction(true));
  };

  return (
    <div className='quiz flex'>
      {readyForQuiz ? (
        <div className='quiz__wraper flex'>
          <button onClick={() => startQuiz()} className='btn quiz__btn quiz__btn-start'>
            Start
          </button>
          <button
            onClick={() => setReadyForQuiz(!readyForQuiz)}
            className='btn quiz__btn quiz__btn-cancel'
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className='quiz__wraper flex'>
          <h1 className='quiz__title'>Are you ready for quiz?</h1>
          <button onClick={() => setReadyForQuiz(!readyForQuiz)} className='btn'>
            Ready
          </button>
        </div>
      )}
    </div>
  );
};
export default QuizRegistration;
