import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { removeUserAction } from '../sagas/sagas';
import logo from '../img/logo.png';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = () => {
    if (localStorage.user) {
      return true;
    }
  };

  const logout = () => {
    dispatch(removeUserAction());
    navigate('/');
  };
  return (
    <>
      <header>
        <div className='header__container flex'>
          <Link to='/' className='header__logo'>
            <img src={logo} alt='logo' className='header__img' />
          </Link>
          {currentUser() && (
            <button onClick={logout} className='header__btn btn'>
              Log out
            </button>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
}
export default Header;
