import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA7ESCKrJFek_zFPe9a_iJtoDtNFuwQd-Y',
  authDomain: 'auth-dev-hard.firebaseapp.com',
  projectId: 'auth-dev-hard',
  storageBucket: 'auth-dev-hard.appspot.com',
  messagingSenderId: '162357046625',
  appId: '1:162357046625:web:cf58866fe5ca5ddaaba920',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };

export const db = getFirestore(app);

// export default app;
