import React from "react";
import "./style.scss";

const DashboardPage = () => {
  return (
    <div className="sbd-dashboard-main">
      <div className="sbd-dashboard-header"></div>
      <div className="sbd-dashboard-content">
        <div className="sbd-dashboard-content__box-info"></div>
        <div className="sbd-dashboard-content__analytics">
          <div className="sbd-dashboard-content__analytics__sections"></div>
          <div className="sbd-dashboard-content__analytics__data"></div>
        </div>
      </div>
      <div className="sbd-dashboard-page-footer">
        <div className="sbd-dashboard-page-footer__content">
            <div>Sensebox Data Dashboard</div>
            <div>Icons</div>
            <div>{`© Oliver Tworkowski ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
