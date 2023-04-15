import * as React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { ActionIcon, Button, Group, Popover, Stack } from "@mantine/core";
import { BrandGithub, ChevronDown, Help, InfoCircle } from "tabler-icons-react";
import { useMemo } from "react";

type headerProps = {
  links: Array<{ to: string, label: string }>
}

const Header = (props: headerProps) => {
  const {
    links = [
      { to: "/", label: "Start" },
      { to: "/datenschutz", label: "Datenschutz" },
      { to: "/impressum", label: "Impressum" },
      { to: "/dashboard", label: "Dashboard", highlighted: true },
    ]
  } = props;

  const navLinkElements = useMemo(() =>
    links.map((link, index) => {
      return (
        <NavLink
          key={index}
          className={({ isActive }) => `wbs-header__nav__item ${isActive ? "wbs-header__nav__item--selected" : ""}`}
          to={link.to}
        >
          <span className={link?.highlighted === true ? "wbs-header__nav__item--highlighted" : ""}>{link.label}</span>
        </NavLink>
      );
    }), [links]);

  return (
    <div className="wbs-header">
      <Popover width={200} position="top" shadow="md" className={"sbd-hide--tablet-and-desktop"}>
        <Popover.Target>
          {/* <Button>        
            <span>Menu</span>
            <ChevronDown size={16} />
          </Button> */}
          <Group spacing="xs" className="wbs-header__nav__item wbs-header__nav__item--dropdown">
            <span>Menu</span>
            <ChevronDown size={18} />
          </Group>
        </Popover.Target>
        <Popover.Dropdown>
          <Stack spacing="xs">
            {navLinkElements}
          </Stack>
        </Popover.Dropdown>
      </Popover>
      <div className="wbs-header__nav sbd-hide--phone">
        {navLinkElements}
      </div>
      <Group>
        <ActionIcon
          variant="subtle"
          //variant="filled"
          size="md"
          component="a"
          href="https://github.com/tworkool/sensebox.data.dashboard"
          target="_blank"
        >
          <BrandGithub />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          //variant="filled"
          size="md"
          component="a"
          href="/info"
        >
          <InfoCircle />
        </ActionIcon></Group>
    </div>
  );
};

export default Header;
