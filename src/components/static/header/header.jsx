import { Link } from "react-router-dom";
import "./header.scss";
import { useWindowScroll } from "@mantine/hooks";

const Header = (props) => {
  const [scroll, _] = useWindowScroll();

  return (
    <nav className={`header ${scroll.y > 100 ? "header--scroll" : ""}`}>
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
