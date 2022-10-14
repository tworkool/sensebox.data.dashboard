import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LiveAnalyticsValueIndicator from "../../components/live_analytics_value_indicator";
import PageManager from "../../components/page_manager";
import "./style.scss";

const App = () => {
  return (
    <div className="wsb-app-container">
      <LiveAnalyticsValueIndicator unmappedValue={{ PM10: 110 }} />
      <Router>
        <PageManager />
      </Router>
    </div>
  );
};

export default App;
