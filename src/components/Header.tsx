import { Outlet, Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header>
        <div className='header__container'>
          <Link to='/' className='header__logo'>
            <p>some logo</p>
          </Link>
        </div>
      </header>
      <Outlet />
    </>
  );
}
export default Header;
