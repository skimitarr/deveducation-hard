import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setUserAction } from '../sagas/sagas';

interface User extends Record<string, any> {}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserStore = useSelector((state: User) => state.quiz.userEmail);

  const login = () => {
    signInWithPopup(auth, provider)
      .then(({ user }: any) => {
        if (user) {
          console.log(user);
          dispatch(setUserAction(user.email));
          navigate('/main');
        }
      })
      .catch(console.error);
  };
  useEffect(() => {
    if (isUserStore) {
      navigate('/main');
    }
  }, [isUserStore, navigate]);

  return (
    <main className='main form__container'>
      <button onClick={() => login()}>Log in with Google</button>
    </main>
  );
};
export default Login;
