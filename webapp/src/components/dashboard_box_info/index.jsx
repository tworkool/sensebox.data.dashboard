import React from "react";
import {
  ActionIcon,
  Alert,
  Badge,
  Divider,
  Group,
  LoadingOverlay,
  Skeleton,
  Space,
  Text,
  Tooltip,
} from "@mantine/core";
import { AlertCircle, Bookmark, MapPin, ScreenShare } from "tabler-icons-react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getGeocodingData,
  getSenseboxInfoData,
} from "../../redux/selectors/appState";
import { DashboardContext } from "../../pages/dashboard";
import moment from "moment";
import { useContext } from "react";
import { useMemo } from "react";
import { useState } from "react";
import CONSTANTS from "../../utils/constants";
import { useLocalStorage } from "@mantine/hooks";
import { useCallback } from "react";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { requestGeocodingDataFetch } from "../../redux/actions/app_state";

const DashboardBoxInfo = () => {
  const dispatch = useDispatch();
  const senseboxInfoData = useSelector(getSenseboxInfoData);
  const geocodingData = useSelector(getGeocodingData);
  const dashboardContext = useContext(DashboardContext);
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [isLoadingGeocodingData, setIsLoadingGeocodingData] = useState(false);
  const [bookmarkedBoxes, setBookmarkedBoxes] = useLocalStorage({
    key: "bookmarked-senseboxes",
    defaultValue: [],
  });

  const diffFromCreateDate = useMemo(() => {
    if (!senseboxInfoData?.data?.createdAt) return "";
    const createDate = moment(senseboxInfoData.data.createdAt);
    const yearsFromCreate = moment().diff(createDate, "years");
    return `Created ${
      yearsFromCreate === 0
        ? `${moment().diff(createDate, "days")} day(s)`
        : `${yearsFromCreate} year(s)`
    } ago`;
  }, [senseboxInfoData]);

  useEffect(() => {
    setIsLoadingGeocodingData(false);
  }, [geocodingData]);

  useEffect(() => {
    const coords = senseboxInfoData?.data?.currentLocation?.coordinates;
    if (coords) {
      setIsLoadingMap(true);
      setIsLoadingGeocodingData(true);
      dispatch(requestGeocodingDataFetch({ lat: coords[0], lon: coords[1] }));
    }
  }, [senseboxInfoData, dispatch]);

  const locationMapElement = useCallback(() => {
    const coords = senseboxInfoData.data.currentLocation.coordinates;
    return (
      <Skeleton height={150} visible={isLoadingMap}>
        <iframe
          style={{ border: "none" }}
          onLoad={() => {
            setIsLoadingMap(false);
          }}
          src={`https://maps.google.com/maps?q=${coords[1]},${coords[0]}&hl=en&z=14&output=embed`}
        ></iframe>
        <br />
        <small>
          <a
            href={`https://maps.google.com/maps?q=${coords[1]},${coords[0]}&hl=en;z=14&output=embed`}
            target="_blank"
            rel="noreferrer"
          >
            See map bigger
          </a>
        </small>
      </Skeleton>
    );
  }, [isLoadingMap, senseboxInfoData]);

  const locationGeocodingElement = useCallback(() => {
    const geoCodingLocation = geocodingData?.data?.locationCoarse
      ? geocodingData.data.locationCoarse
      : geocodingData?.data?.locationExact;
    //if (!geoCodingLocation || !geocodingData?.data?.attribution) return null;
    return (
      <Tooltip
        multiline
        width={300}
        label={geocodingData?.data?.attribution}
      >
        <Skeleton visible={isLoadingGeocodingData}>
          {!!geoCodingLocation && (
            <Group spacing="xs">
              <MapPin size={18} strokeWidth={1.5} color={"black"} />
              <Text size="sm">{geoCodingLocation}</Text>
            </Group>
          )}
        </Skeleton>
      </Tooltip>
    );
  }, [geocodingData, isLoadingGeocodingData]);

  const isBookmarked = useMemo(
    () =>
      senseboxInfoData?.data?._id &&
      bookmarkedBoxes.filter((x) => x._id === senseboxInfoData.data._id)
        .length > 0,
    [bookmarkedBoxes, senseboxInfoData]
  );

  const handleBookmarkSaveAction = useCallback(
    (e) => {
      const old = [...bookmarkedBoxes];
      if (old.filter((x) => x._id === e._id).length > 0) {
        // remove
        const indexOfRemovableElement = old.indexOf(e);
        old.splice(indexOfRemovableElement, 1);
        setBookmarkedBoxes(old);
      } else {
        if (old.length >= CONSTANTS.MAX_BOOKMARKED_BOXES) {
          showNotification({
            id: "max_sensebox_limit_notification",
            title: "MAX LIMIT",
            message: `Sensebox bookmark limit: ${CONSTANTS.MAX_BOOKMARKED_BOXES}`,
            color: "orange",
          });
          return;
        }
        // add
        setBookmarkedBoxes([...old, ...[e]]);
      }
    },
    [setBookmarkedBoxes, bookmarkedBoxes]
  );

  return (
    <div className="sbd-dashboard-content__box-info">
      <LoadingOverlay
        visible={dashboardContext.isLoadingSenseboxInfoData}
        overlayBlur={1}
      />
      {!senseboxInfoData.data && (
        <Alert
          icon={<AlertCircle size={16} />}
          title="No Sensebox Selected"
          color="orange"
        />
      )}
      {senseboxInfoData.data && (
        <>
          <div>
            <Text size="lg" weight={500}>
              {senseboxInfoData.data.name}
            </Text>
            <Text size="xs" color="dimmed">
              {senseboxInfoData.data._id}
            </Text>
            <Space h="xs" />
            <Group spacing="xs">
              {senseboxInfoData?.data?.exposure !== "unknown" && (
                <Badge color="green" size="sm" radius="sm" variant="dot">
                  {senseboxInfoData.data.exposure}
                </Badge>
              )}
              <Badge color="grape" size="sm" radius="sm" variant="dot">
                {`${senseboxInfoData.data.sensors.length} Sensor(s)`}
              </Badge>
              <Badge color="yellow" size="sm" radius="sm" variant="dot">
                {diffFromCreateDate}
              </Badge>
              {moment().diff(moment(senseboxInfoData.data.updatedAt), "days") >
              CONSTANTS.SENSEBOX_INACTIVITY_TIME_DAYS ? (
                <Badge color="red" size="sm" radius="sm" variant="filled">
                  INACTIVE
                </Badge>
              ) : (
                <Badge color="gray" size="sm" radius="sm" variant="filled">
                  ACTIVE
                </Badge>
              )}
            </Group>
          </div>
          <Space h="xs" />
          <Text size="xs">{senseboxInfoData.data.description}</Text>
          <Divider my="sm" label="Position" labelPosition="center" />
          {locationMapElement()}
          <Space h="xs" />
          {locationGeocodingElement()}
          {/* <Divider my="sm" label="Images" labelPosition="center" /> */}
          {/* <Skeleton visible={false}>
            <Image
              //className="sbd-home-page-preview-image"
              fit="contain"
              radius="md"
              src={`https://opensensemap.org/userimages/${senseboxInfoData.data.image}`}
              alt="Dashboard Preview"
              withPlaceholder
            />
          </Skeleton> */}
          <div style={{ marginTop: "auto" }}>
            <Divider
              my="sm"
              label="Actions"
              labelPosition="center"
              style={{ marginTop: "auto" }}
            />
            <Group spacing="xs">
              <Tooltip
                label={
                  isBookmarked ? "Remove from Bookmarks" : "Add to Bookmarks"
                }
              >
                <ActionIcon
                  size="lg"
                  variant={isBookmarked ? "light" : "transparent"}
                  color={isBookmarked ? "orange" : "gray"}
                  onClick={(_) => {
                    handleBookmarkSaveAction({
                      name: senseboxInfoData.data.name,
                      _id: senseboxInfoData.data._id,
                    });
                  }}
                >
                  <Bookmark size={26} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="View Box on Opensensemap">
                <ActionIcon
                  size="lg"
                  component="a"
                  href={`https://opensensemap.org/explore/${dashboardContext.selectedSenseboxId}`}
                  target="_blank"
                >
                  <ScreenShare size={26} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardBoxInfo;
