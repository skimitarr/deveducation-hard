import './css/App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Header from './components/Header';
import Login from './pages/LoginPage';
import Main from './pages/MainPage';
import NotFound from './pages/NotFound';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.user) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route path='/' element={<Login />} />
        <Route path='/main' element={<Main />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
