import { Link, useLocation } from "react-router-dom";
import "./dashboard_menu.scss";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import ThemeButton from "@components/static/theme_button/theme_button";
import { Icon } from "@iconify/react";

const menuPaths = [
  {
    link: "/dashboard/overview",
    icon: "line-md:gauge-twotone",
    text: "Dashboard",
  },
  {
    link: "/dashboard/settings",
    icon: "line-md:cog-filled",
    text: "Settings",
  },
];


const DashboardMenu = (props) => {
  const { paths } = props;
  const location = useLocation();

  return (
    <nav className="dashboard-menu">
      <ul>
        { menuPaths.map((path, index) => <li key={index}>
          <Link to={path.link} tabIndex={-1}>
            <Tooltip label={path.text} position="right" offset={10} withArrow openDelay={200}>
              <button className={`dashboard-menu-navitem ${location.pathname.startsWith(path.link) ? "dashboard-menu-navitem--selected" : ""}`}>
                <Icon icon={path.icon} width="1.3rem" height="1.3rem" />
                <span>{path.text}</span>
              </button>
            </Tooltip>
          </Link>
        </li> )}

        <li>
          <ThemeButton size="1.3rem" className="dashboard-menu-navitem">
            <span>Switch Theme</span>
          </ThemeButton>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardMenu;
