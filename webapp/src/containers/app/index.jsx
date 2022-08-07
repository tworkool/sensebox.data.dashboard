import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import PageManager from "../../components/page_manager";
import "./style.scss";

const App = () => {
  return (
    <div className="wsb-app-container">
      <Router>
        <div className="wsb-page-wrapper">
          <Header
            links={[
              { to: "/", label: "Startseite" },
              { to: "/datenschutz", label: "Datenschutz" },
            ]}
          />
          <PageManager />
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
