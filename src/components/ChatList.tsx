import { IMessages } from '../components/Interfaces';
import { useEffect } from 'react';

const ChatList = ({ messages }: { messages: IMessages[] }) => {
  useEffect(() => {
    const chat = document.querySelector('.chat__list');
    if (chat) chat.scrollTo(0, chat.scrollHeight);
  }, []);

  const copiedMessages = [...messages];
  let filteredMessages = copiedMessages.sort(function (a, b) {
    let dateA = a.createdAt,
      dateB = b.createdAt;
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  });

  return (
    <ul className='chat__list'>
      {filteredMessages.map((element: IMessages) => (
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
