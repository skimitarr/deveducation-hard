import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button';

import { auth, provider } from '../firebase';
import { setUserAction } from '../sagas/sagas';

import { User } from '../components/Interfaces';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserStore = useSelector((state: User) => state.quiz.userData);
  console.log(isUserStore);

  const login = () => {
    signInWithPopup(auth, provider)
      .then(({ user }: User) => {
        if (user) {
          console.log(user);
          dispatch(
            setUserAction({
              uid: user.uid,
              displayName: user.displayName,
              photoUrl: user.photoURL,
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
