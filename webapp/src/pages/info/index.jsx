import React from "react";
import Header from "../../components/header";
import "./style.scss";
import { Title } from "@mantine/core";
import Footer from "../../components/footer";

const InfoPage = () => {
  return <div className="page__container">
    <Header/>    
    <div className="page__content">
      <Title order={1}>Info</Title>
    </div>
    <Footer/>
  </div>;
};

export default InfoPage;
