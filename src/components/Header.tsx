import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <ul className="navigation">
        <Link to="/">
          <li className="navigation_list"> Home </li>
        </Link>
        <Link to="/details/AFG">
          <li className="navigation_list"> Detail </li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
