import React from "react";
import Header from "../../components/header";
import "./style.scss";
import Footer from "../../components/footer";
import { Alert, Text, Title } from "@mantine/core";
import { CookieOff } from "tabler-icons-react";

const DatenschutzPage = () => {
  return <div className="page__container">
    <Header/>
    <div className="page__content">
      <Title order={1}>Datenschutz</Title>
      <Alert icon={<CookieOff size={24} />} title="Your Information is Safe Here!" color="teal">
        On this webapp no personal information is used! This page uses <a href="https://posthog.com/">Posthog</a>, an open-source and GDPR compliant web monitoring and data tool.
      </Alert>
      <Text mt="sm">
        {"This page relies on multiple API's which are free to a certain extend. But after a certain number of requests usually those API's have to be paid for. I don't want to pay for them 😉. That's why I decided to use a monitoring tool."}
      </Text>
      <Text mt="sm">
        {"Other than that, no tracking cookies are used. Cookies and local storage may be used for storing general web app information."}
      </Text>
    </div>
    <Footer/>
  </div>;
};

export default DatenschutzPage;
