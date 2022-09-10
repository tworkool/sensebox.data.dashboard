import { ActionIcon, Alert, Tabs } from "@mantine/core";
import React, { createContext, useEffect, useState } from "react";
import { useMemo } from "react";
import {
  AccessPoint,
  AlertCircle,
  BrandGithub,
  DeviceDesktopAnalytics,
  MapSearch,
} from "tabler-icons-react";
import DashboardBoxInfo from "../../components/dashboard_box_info";
import DashboardHeader from "../../components/dashboard_header";
import DetailedDataContainer from "../../containers/detailed_data";
import LiveAnalyticsContainer from "../../containers/live_analytics";
import DataMapContainer from "../../containers/data_map";
import "./style.scss";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSenseboxInfoData } from "../../redux/selectors/appState";
import { requestSenseboxInfoDataFetch } from "../../redux/actions/app_state";

const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const senseboxInfoData = useSelector(getSenseboxInfoData);
  const [selectedSenseboxId, setSelectedSenseboxId] = useState();
  const [isLoadingSenseboxInfoData, setIsLoadingSenseboxInfoData] =
    useState(false);

  useEffect(() => {
    if (!params || Object.keys(params).length === 0) return;
    const param = params?.boxid;
    if (param === null || param === undefined) {
      setSelectedSenseboxId(undefined);
    } else {
      dispatch(requestSenseboxInfoDataFetch({ id: param }));
      setIsLoadingSenseboxInfoData(true);
    }
  }, [params, dispatch, setIsLoadingSenseboxInfoData]);

  useEffect(() => {
    if (senseboxInfoData.validBoxId) {
      setSelectedSenseboxId(senseboxInfoData.validBoxId);
    } else {
      setSelectedSenseboxId(undefined);
    }
    setIsLoadingSenseboxInfoData(false);
  }, [senseboxInfoData, setIsLoadingSenseboxInfoData]);

  return (
    <DashboardContext.Provider
      value={{ selectedSenseboxId, isLoadingSenseboxInfoData }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

const DashboardPage = () => {
  const isMobileDevice = useMemo(() => window.screen.width < 768, []);
  if (isMobileDevice)
    return (
      <div className="sbd-dashboard-not-supported">
        <Alert
          icon={<AlertCircle size={16} />}
          radius="xs"
          title="Oops!"
          color="orange"
        >
          {
            "This page does currently not support mobile devices :( But this feature is being worked on and will be supported in the future!"
          }
        </Alert>
      </div>
    );

  return (
    <div className="sbd-dashboard-main">
      <DashboardHeader />
      <div className="sbd-dashboard-content">
        <DashboardBoxInfo />
        <div className="sbd-dashboard-content__analytics">
          <Tabs
            color="dark"
            radius="xs"
            defaultValue="live-analytics"
            className="sbd-mantine-tabs-root"
          >
            <Tabs.List
              position="center"
              className="sbd-dashboard-content__analytics__tab-header"
            >
              <Tabs.Tab
                value="live-analytics"
                color="red"
                icon={
                  <AccessPoint size={26} strokeWidth={2} color={"#E20808"} />
                }
              >
                Live Data
              </Tabs.Tab>
              <Tabs.Tab
                value="detailed-data"
                icon={<DeviceDesktopAnalytics size={16} />}
              >
                Detailed Data
              </Tabs.Tab>
              <Tabs.Tab
                disabled={false}
                value="data-map"
                icon={<MapSearch size={16} />}
              >
                Data Map
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel
              value="live-analytics"
              pt="xs"
              className="sbd-mantine-tabs-panel"
            >
              <LiveAnalyticsContainer />
            </Tabs.Panel>
            <Tabs.Panel
              value="detailed-data"
              pt="xs"
              className="sbd-mantine-tabs-panel"
            >
              <DetailedDataContainer />
            </Tabs.Panel>
            <Tabs.Panel
              value="data-map"
              pt="xs"
              className="sbd-mantine-tabs-panel"
            >
              <DataMapContainer />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
      <div className="sbd-dashboard-page-footer">
        <div className="sbd-dashboard-page-footer__content">
          <div>Sensebox Data Dashboard</div>
          <div>
            <ActionIcon
              color="dark"
              variant="filled"
              size="sm"
              component="a"
              href="https://github.com/tworkool/sensebox.data.dashboard"
              target="_blank"
            >
              <BrandGithub />
            </ActionIcon>
          </div>
          <div>{`© Oliver Tworkowski 2022 - ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
export { DashboardContext, DashboardContextProvider };
