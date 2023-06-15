import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { sendMessageAction, getMessagesAction } from '../sagas/sagas';
import { IState } from '../components/Interfaces';
import ChatList from './ChatList';

const Chat = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const dataUserStore = useSelector((state: IState) => state.quiz.userData);
  const dataMessagesStore = useSelector((state: IState) => state.quiz.messages);
  // console.log(dataMessagesStore);
  const now = moment().format('YYYY-MM-DD kk:mm:ss');

  useEffect(() => {
    if (!dataMessagesStore) {
      dispatch(getMessagesAction());
    }
  }, [dispatch, dataMessagesStore]);

  const getInputText = (message: string) => {
    setText(message);
  };

  const sendMessage = () => {
    console.log(dataUserStore);
    if (dataUserStore) {
      dispatch(
        sendMessageAction({
          uid: dataUserStore.uid,
          displayName: dataUserStore.displayName,
          photoUrl: dataUserStore.photoUrl,
          text: text,
          createdAt: now,
        })
      );
      dispatch(getMessagesAction());
    } else {
      const localUser = localStorage.getItem('user');
      if (localUser) {
        const userData = JSON.parse(localUser);
        dispatch(
          sendMessageAction({
            uid: userData.uid,
            displayName: userData.displayName,
            photoUrl: userData.photoUrl,
            text: text,
            createdAt: now,
          })
        );
        dispatch(getMessagesAction());
      }
    }
    setText('');
  };

  return (
    <div className='chat flex'>
      {dataMessagesStore && <ChatList messages={dataMessagesStore} />}
      <div className='chat__message'>
        <textarea
          name='textarea'
          value={text}
          rows={6}
          cols={26}
          placeholder='Enter the message'
          onChange={(e) => getInputText(e.target.value)}
          className='chat__textearea'
        />
        <button onClick={() => sendMessage()} className='btn'>
          Send message
        </button>
      </div>
    </div>
  );
};
export default Chat;
