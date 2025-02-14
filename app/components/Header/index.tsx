import { useMatch } from 'react-router';

const Header = () => {
  return (
    <header className='header flex items-center w-full shadow-lg mb-4'>
      <a href='/'>
        <img src='/logo.jpg' className='logo w-[100px]' />
      </a>
      <nav>
        <ul className='flex'>
          <li className='ml-4'>
            <a href='/employees'>Employees</a>
          </li>
          <li className='ml-4'>
            <a href='/timesheets'>Timesheets</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
