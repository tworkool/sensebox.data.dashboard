import { ActionIcon, Badge, Button, Center, Chip, Container, Grid, Group, Popover, Skeleton, Space, Stack, Switch, Text, Title, Tooltip } from "@mantine/core";
import ValuePaper from "@components/shared/value_paper/value_paper";
import CustomCopyButton from "@components/shared/custom_copy_button/custom_copy_button";
import { Icon } from "@iconify/react";
import IdenticonAvatar from "@components/shared/identicon_avatar/identicon_avatar";
import { useQuery } from "@tanstack/react-query";
import { OSEMBoxesService } from "@api/services/boxes";
import { GeolocationService } from "@api/services/geolocation";
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
/* import { useOverviewBoxInfoStore } from "@stores"; */
import DashboardBoxSearch from "@components/static/dashboard_box_search/dashboard_box_search";
import { notifications } from "@mantine/notifications";
import { useOverviewBoxInfoStore } from "@stores";
import SunWidget from "@components/shared/sun_widget/sun_widget";

const sensorFilterProperty = "title";

const DashboardOverview = () => {
  const { boxId: urlBoxId } = useParams();
  const navigate = useNavigate();
  const overviewBoxInfoStore = useOverviewBoxInfoStore();
  const [selectedSenseBoxId, setSelectedSenseBoxId] = useState<string>();
  const [filter, setFilter] = useState<string>("None");
  const [selectedOverviewType, setSelectedOverviewType] = useState("none");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const isBoxPinned = useMemo(() => overviewBoxInfoStore.current?.pinnedBoxId === selectedSenseBoxId, [overviewBoxInfoStore, selectedSenseBoxId]);

  const { data, isPending, refetch } = useQuery({
    queryKey: ["OSEM_GET_ONE_BOX", { senseBoxId: selectedSenseBoxId }],
    queryFn: async (params) => OSEMBoxesService.getOneSenseBox(params),
    "refetchOnReconnect": false, // disable for now!
    "refetchOnMount": false,
    "refetchOnWindowFocus": false,
  });

  const { data: reverseGeolocationData, isPending: reverseGeolocationIsPending, refetch: refetchReverseGeolocation } = useQuery({
    queryKey: ["GET_REVERSE_GEOLOCATION", { lat: data?.currentLocation?.coordinates?.[1], lon: data?.currentLocation?.coordinates?.[0] }],
    queryFn: async (params) => GeolocationService.getReverseGeolocation(params),
    retry: false,
    /* "enabled": false, */
  });

  const handleSearch = useCallback((boxId: string) => {
    setSelectedSenseBoxId(boxId);
    setSelectedOverviewType("search");
  }, []);

  const handlePinnedSelect = useCallback(() => {
    if (overviewBoxInfoStore.current?.pinnedBoxId) {
      setSelectedSenseBoxId(overviewBoxInfoStore.current.pinnedBoxId);
      setSelectedOverviewType("pinned");
      return true;
    }
    return false;
  }, [overviewBoxInfoStore]);

  const handleClosestSelect = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setIsLoadingLocation(true);
        const queryKey = ["OSEM_PREVIEW_CLOSEST_BOX", {
          limit: 1,
          minimal: true,
          near: [position.coords.longitude, position.coords.latitude],
          maxDistance: 400,
        }];
        OSEMBoxesService.getAllSenseBoxes({ queryKey: queryKey }).then((data) => {
          if (data && data.length > 0) {
            setSelectedOverviewType("closest");
            setSelectedSenseBoxId(data[0]._id);
          } else {
            notifications.show({ message: "No nearby boxes found", color: "orange" });
          }
        }).catch(() => {
          notifications.show({ title: "Could not fetch nearby box", message: "Please try again later", color: "red" });
        }).finally(() => {
          setIsLoadingLocation(false);
        });
      });
      return true;
    }
    return false;
  }, []);

  useLayoutEffect(() => {
    if (!urlBoxId) {
      if (overviewBoxInfoStore.current?.lastActiveBoxId) {
        navigate(`/dashboard/overview/${overviewBoxInfoStore.current.lastActiveBoxId}`);
      } else if (overviewBoxInfoStore.current?.pinnedBoxId) {
        navigate("/dashboard/overview/pinned");
      } else {
        navigate("/dashboard/overview/closest");
      }
      return;
    }

    if (urlBoxId === "pinned") {
      handlePinnedSelect();
    } else if (urlBoxId === "closest") {
      handleClosestSelect();
    } else if (urlBoxId) {
      handleSearch(urlBoxId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlBoxId]);

  const togglePin = () => {
    if (isBoxPinned) {
      overviewBoxInfoStore.update({ pinnedBoxId: null });
    } else {
      overviewBoxInfoStore.update({ pinnedBoxId: selectedSenseBoxId });
    }
  };

  // handle data successfully coming in
  useEffect(() => {
    if (!data) return;
    overviewBoxInfoStore.update({ lastActiveBoxId: data._id });
    // remove filter when changing sensebox
    setFilter("None");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const sensorFilterGroups = useMemo<string[]>(() => {
    if (!data) return [];
    const units = data.sensors.map((sensor) => sensor[sensorFilterProperty]);
    return [...new Set(units)] as string[];
  }, [data]);

  return (
    <>
      <Stack gap="xl">
        <Group>
          <Chip.Group multiple={false} value={selectedOverviewType}>
            <Group gap="xs">
              <Chip value="none" display="none">none</Chip>
              {"geolocation" in navigator &&
                <Chip
                  disabled={isLoadingLocation}
                  value="closest"
                  variant="filled"
                  icon={<Icon icon="tabler:location-pin" width="1rem" height="1rem" />}
                  onClick={() => { navigate("/dashboard/overview/closest"); }}>
                  closest to you
                </Chip>}
              <Chip
                disabled={isLoadingLocation || !overviewBoxInfoStore.current?.pinnedBoxId}
                value="pinned"
                variant="filled"
                icon={<Icon icon="tabler:pin" width="1rem" height="1rem" />}
                onClick={() => { navigate("/dashboard/overview/pinned"); }}>
                pinned
              </Chip>
              <Chip disabled={isLoadingLocation} value="search" variant="filled" display="none">search</Chip>
            </Group>
          </Chip.Group>
          <DashboardBoxSearch loading={isLoadingLocation} onSelect={(boxId) => { navigate(`/dashboard/overview/${boxId}`); }} />
        </Group>

        {(data || isPending) ?
          <>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 12, md: 6, xl: 4 }}>
                {isPending ?
                  <Skeleton visible={isPending} mih={160}></Skeleton> :
                  <ValuePaper.Bare>
                    {data &&
                      <Group style={{ top: "1rem", right: "1rem", position: "absolute", zIndex: 3 }} gap="xs">
                        {(data?.weblink && new URL(data.weblink)?.origin) && <Tooltip label={`open website at ${new URL(data.weblink).origin}`} withArrow>
                          <ActionIcon component="a" href={data.weblink} target="_blank" variant="default" radius="xl" size="md">
                            <Icon icon="tabler:world-share" width="1rem" height="1rem" />
                          </ActionIcon>
                        </Tooltip>}
                        <Tooltip label="open in OSM" withArrow>
                          <ActionIcon component="a" href={`https://opensensemap.org/explore/${data._id}`} target="_blank" variant="default" radius="xl" size="md">
                            <Icon icon="tabler:map-share" width="1rem" height="1rem" />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label={isBoxPinned ? "unpin" : "pin"} withArrow>
                          <ActionIcon variant={isBoxPinned ? "filled" : "default"} radius="xl" size="md" onClick={() => { togglePin(); }}>
                            <Icon icon="tabler:pin" width="1rem" height="1rem" />
                          </ActionIcon>
                        </Tooltip>
                      </Group>}

                    <Group align="flex-start">
                      {data?._id && <IdenticonAvatar id={data._id} size="xl" radius="xs">MK</IdenticonAvatar>}
                      <Stack gap="0.2rem">
                        {data?._id && <Badge ff="monospace" size="sm" variant="light" color="gray" radius="xs">
                          {data._id}
                          {/* <CustomCopyButton value={data._id} size="xs" /> */}
                        </Badge>}
                        <Title order={2}>{data?.name ? data.name : "N/A"}</Title>
                        <Group gap="0.3rem">
                          {data && <Badge size="sm" radius="sm" variant="light">{data?.active ? "active" : "inactive"}</Badge>}
                          <Badge size="sm" radius="sm" variant="light">{data?.exposure}</Badge>
                          <Badge size="sm" radius="sm" variant="light">{`${data?.sensors?.length} Sensors`}</Badge>
                          {data?.createdAt && <Badge size="sm" radius="sm" variant="light">{dayjs(data.createdAt).fromNow()}</Badge>}
                        </Group>
                        {data?.description && <Text mt="xs">{data.description}</Text>}
                      </Stack>
                    </Group>
                  </ValuePaper.Bare>}
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 12, md: 6, xl: 8 }}>
                {isPending ?
                  <Skeleton visible={isPending} mih={200}></Skeleton> :
                  <ValuePaper.Bare>
                    <Stack>
                      {data &&
                        <>
                          {location.hostname.includes("localhost") ?
                            <Center h={300}>
                              <Text c="dimmed" size="xs" ta="center">Temporary placeholder on localhost. Real map will be displayed in production mode.</Text>
                            </Center> :
                            <iframe
                              style={{ height: 300 }}
                              src={`https://maps.google.com/maps?q=${data?.currentLocation?.coordinates?.[1]},${data?.currentLocation?.coordinates?.[0]}&hl=en&z=12&t=p&output=embed`}>
                            </iframe>
                          }
                        </>
                      }
                      {reverseGeolocationData && <Group gap="xs">
                        <Icon icon="line-md:map-marker-radius-twotone" width="1.2rem" height="1.2rem" />
                        <Text>{`${reverseGeolocationData?.address?.city}, ${reverseGeolocationData?.address?.country}`}</Text>
                      </Group>
                      }
                    </Stack>
                  </ValuePaper.Bare>
                }
              </Grid.Col>
            </Grid>

            <Stack gap="sm">
              <Group justify="flex-end" gap={"xs"}>
                {/* <div style={{ flex: 1 }}>
                  <Chip.Group>
                    <Group gap="xs">
                      {unitLabelGroups && unitLabelGroups.map((label, index) => <Chip key={index} value={index} variant="filled">{label}</Chip>)}
                    </Group>
                  </Chip.Group>
                </div>
                <Switch style={{ width: "max-content" }} defaultChecked onLabel="ON" offLabel="OFF" label="automatic updates" /> */}
                <Popover width={200} position="bottom-end" withArrow shadow="md">
                  <ActionIcon
                    display={filter !== "None" ? "block" : "none"}
                    title="remove filters"
                    onClick={() => { setFilter("None"); }}
                    size="md"
                    variant="light"
                    color="red"
                    radius="xl">
                    <Icon icon="line-md:filter-remove-twotone" width="1rem" height="1rem" />
                  </ActionIcon>
                  <Popover.Target>
                    <Button
                      disabled={isPending}
                      size="compact-sm"
                      variant="light"
                      color="gray"
                      radius="xl"
                      rightSection={<Icon icon="tabler:chevron-down" width="1rem" height="1rem" />}
                    >
                      filters
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Chip.Group multiple={false} value={filter} onChange={(value) => { setFilter(value as string); }}>
                      <Group gap="xs">
                        <Chip value="None" variant="outline">None</Chip>
                        {sensorFilterGroups && sensorFilterGroups.map((filterProperty, index) => <Chip key={index} value={filterProperty} variant="light">{filterProperty}</Chip>)}
                      </Group>
                    </Chip.Group>
                  </Popover.Dropdown>
                </Popover>
              </Group>
              <ValuePaper.Grid>
                {data && data?.sensors.filter(sensor => !filter || filter === "None" || sensor[sensorFilterProperty] == filter).map((sensor, index) => {
                  return <ValuePaper.Item key={index} sensor={sensor} />;
                })}
                {(!data && isPending) && [...new Array(7)].map((_, index) => <Skeleton key={index} visible><ValuePaper.ItemEmpty /></Skeleton>)}
              </ValuePaper.Grid>
            </Stack>
          </> : <>
            <Center>
              <Stack align="center" gap="sm" mt="md">
                <Icon icon="carbon:retry-failed" width="2rem" height="2rem" />
                <Group gap="xs" align="baseline">
                  <Text size="sm" ta="center" c="dimmed">Could not fetch data.</Text>
                  <Button display={selectedSenseBoxId ? "block" : "none"} size="compact-sm" variant="transparent" p={0} onClick={() => {
                    refetch();
                  }}>Retry</Button>
                </Group>
              </Stack>
            </Center>
          </>
        }

        <SunWidget senseBox={data} />
      </Stack>
    </>
  );
};

export default DashboardOverview;
