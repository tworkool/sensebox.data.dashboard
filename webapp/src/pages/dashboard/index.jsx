import { Tabs } from "@mantine/core";
import React from "react";
import { Photo } from "tabler-icons-react";
import DashboardHeader from "../../components/dashboard_header";
import "./style.scss";

const DashboardPage = () => {
  return (
    <div className="sbd-dashboard-main">
      <DashboardHeader />
      <div className="sbd-dashboard-content">
        <div className="sbd-dashboard-content__box-info"></div>
        <div className="sbd-dashboard-content__analytics">
          <div className="sbd-dashboard-content__analytics__sections"></div>
          <div className="sbd-dashboard-content__analytics__data"></div>
          {/* <Tabs defaultValue="gallery">
            <Tabs.List>
              <Tabs.Tab value="gallery" icon={<Photo size={14} />}>
                Gallery
              </Tabs.Tab>
              <Tabs.Tab value="messages" icon={<Photo size={14} />}>
                Messages
              </Tabs.Tab>
              <Tabs.Tab value="settings" icon={<Photo size={14} />}>
                Settings
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery" pt="xs">
              Gallery tab content
            </Tabs.Panel>

            <Tabs.Panel value="messages" pt="xs">
              Messages tab content
            </Tabs.Panel>

            <Tabs.Panel value="settings" pt="xs">
              Settings tab content
            </Tabs.Panel>
          </Tabs> */}
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
