import Chat from '../components/Chat';
import QuizRegistration from '../components/QuizRegistration';

const Main = () => {
  return (
    <main className='main '>
      <div className='main__container'>
        <QuizRegistration />
        <Chat />
      </div>
    </main>
  );
};
export default Main;
