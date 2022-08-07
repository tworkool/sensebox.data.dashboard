import * as React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

type headerProps = {
  links: Array<{to: string, label: string}>
}

const Header = (props: headerProps) => {
  const { links } = props;
  return (
    <div className="wbs-header">
      <div className="wbs-header__nav">
        {links.map((link, index) => {
          return (
            <NavLink
              key={index}
              className={({isActive}) => `wbs-header__nav__item ${isActive ? "wbs-header__nav__item--selected" : ""}`}
              to={link.to}
            >
              {link.label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
