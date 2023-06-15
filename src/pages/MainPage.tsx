import Chat from '../components/Chat';

const Main = () => {
  return (
    <main className='main '>
      <div className='main__container'>
        <div className='quiz'>
          <h2>This is quiz block</h2>
        </div>
        <Chat />
      </div>
    </main>
  );
};
export default Main;
