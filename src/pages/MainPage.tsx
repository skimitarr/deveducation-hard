import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { removeUserAction } from '../sagas/sagas';

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(removeUserAction());
    navigate('/');
  };

  return (
    <main className='main form__container'>
      <p>This is main page</p>
      <button onClick={logout}>Log out</button>
    </main>
  );
};
export default Main;
