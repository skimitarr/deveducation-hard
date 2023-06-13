import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/LoginPage';
import Main from './pages/MainPage';
import NotFound from './pages/NotFound';

function App() {
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
