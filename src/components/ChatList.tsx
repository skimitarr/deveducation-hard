import { IMessages } from '../components/Interfaces';

const ChatList = ({ messages }: { messages: IMessages[] }) => {
  return (
    <ul className='chat__list'>
      {messages.map((element: IMessages) => (
        <li key={element.createdAt} className='chat__item'>
          <img src={element.photoUrl} alt='user' className='chat__photo' />
          <div className='chat__name'>{element.displayName}</div>
          <div className='chat__text'>
            <span>{element.text}</span>
          </div>
          <div className='chat__time'>{element.createdAt}</div>
        </li>
      ))}
    </ul>
  );
};
export default ChatList;
