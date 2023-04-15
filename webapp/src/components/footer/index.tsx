import * as React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { ActionIcon, Button, Container, Group, Popover, Stack, Text } from "@mantine/core";
import { BrandGithub, ChevronDown, Help } from "tabler-icons-react";
import { useMemo } from "react";

type headerProps = {
  links: Array<{ to: string, label: string }>
}

const Footer = (props: headerProps) => {
  const {
    links = [
      { to: "/", label: "Start" },
      { to: "/datenschutz", label: "Datenschutz" },
      { to: "/dashboard", label: "Dashboard" },
      { to: "/impressum", label: "Impressum" },
      { to: "/info", label: "Info" }
    ]
  } = props;

  const navLinkElements = useMemo(() =>
    links.map((link, index) => {
      return (
        <NavLink
          key={index}
          className={({ isActive }) => `wbs-footer__nav__item ${isActive ? "wbs-footer__nav__item--selected" : ""}`}
          to={link.to}
        >
          {link.label}
        </NavLink>
      );
    }), [links]);

  return (
    <div className="wbs-footer">
      <div className="wbs-footer__nav">
        {navLinkElements}
      </div>
      <Text className="wbs-footer__copyright" align="center">
        {`Sensebox Data Dashboard | Copyright © Oliver Tworkowski ${new Date().getFullYear()}`}
      </Text>
    </div>
  );
};

export default Footer;
