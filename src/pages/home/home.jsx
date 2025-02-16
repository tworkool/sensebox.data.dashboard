import { Link } from "react-router-dom";
import "./home.scss";
import { Image } from "@mantine/core";
import DashboardPreviewImg from "@assets/content/dashboard-preview.png";

const Home = (props) => {
  return (
    <>
      <h1>Home</h1>
      <ul>
        <li><Link to="/dashboard">dashboard</Link></li>
        <li><Link to="/impressum">impressum</Link></li>
        <li><Link to="/datenschutz">datenschutz</Link></li>
        <li><Link to="/info">info</Link></li>
      </ul>
      <Image src={DashboardPreviewImg} alt="placeholder" />
    </>
  );
};

export default Home;
