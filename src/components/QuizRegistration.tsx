import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot } from 'firebase/firestore';

// import AddQuiz from '../components/AddQuiz';
import { db } from '../firebase';
import { getQuizesAction } from '../sagas/sagas';
import QuizCard from '../components/QuizCard';
import { IState, IQuiz, QuizRegistrationProps } from '../components/Interfaces';

const QuizRegistration = ({ getCurrentQuizId }: QuizRegistrationProps) => {
  const dispatch = useDispatch();
  const quizesApi = useSelector((state: IState) => state.quiz.quizes);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'quizes'), () => {
      dispatch(getQuizesAction());
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className='quiz flex'>
      {/* <AddQuiz /> */}
      <div className='quiz__wraper flex'>
        {quizesApi &&
          quizesApi.map((quiz: IQuiz) => {
            return <QuizCard key={quiz.id} quiz={quiz} getCurrentQuizId={getCurrentQuizId} />;
          })}
      </div>
    </div>
  );
};
export default QuizRegistration;
