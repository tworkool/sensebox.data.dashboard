import { Link } from "react-router-dom";
import "./header.scss";

const Header = (props) => {
  return (
    <nav className="header">
      <div className="header__content">
        <ul>
          <li>
            <Link to="/#data">About the Data</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/info">Info</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
