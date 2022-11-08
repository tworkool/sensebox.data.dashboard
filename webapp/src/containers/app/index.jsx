import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PageManager from "../../components/page_manager";
import "./style.scss";

const App = () => {
  return (
    <div className="wsb-app-container">
      <Router>
        <PageManager />
      </Router>
    </div>
  );
};

export default App;
