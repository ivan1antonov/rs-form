import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <ul className="navigation">
        <li className="navigation_list">
          <Link to="/"> Home </Link>
        </li>
        <li className="navigation_list">
          <Link to="/detail"> Detail </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
