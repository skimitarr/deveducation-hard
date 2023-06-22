import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button';

import { auth, provider } from '../firebase';
import { setUserAction } from '../sagas/sagas';
import { User } from '../components/Interfaces';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.user) {
      navigate('/main');
    }
  }, [navigate]);

  const login = () => {
    signInWithPopup(auth, provider)
      .then(({ user }: User) => {
        if (user) {
          console.log(user);
          dispatch(
            setUserAction({
              displayName: user.displayName,
              photoUrl: user.photoURL,
              idUser: user.uid,
            })
          );
          navigate('/main');
        }
      })
      .catch(console.error);
  };

  return (
    <main className='main login__container flex'>
      <GoogleButton onClick={() => login()} className='login__btn' />
    </main>
  );
};
export default Login;
