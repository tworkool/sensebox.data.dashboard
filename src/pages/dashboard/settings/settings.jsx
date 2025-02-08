import { Button, ColorInput, Grid, Group, Input, NumberInput, Select, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useLayoutEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useSettingsStore, defaultSettings } from "@stores";
import { Icon } from "@iconify/react";

const sharedStyle = {
  variant: "filled",
};

const dateFormats = ["MMM Do YY", "DD/MM/YYYY", "MM/DD/YYYY", "YYYY/MM/DD"];

const DashboardSettings = (props) => {
  const { current, set, restore } = useSettingsStore();
  const form = useForm({
    initialValues: { ...defaultSettings },
  });

  const handleSubmit = (values) => {
    set(values);
    notifications.show({
      title: "Settings Saved",
      message: "Settings have been saved successfully",
    });
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const settings = JSON.parse(event.target.result);
          set(settings);
        } catch (error) {
          notifications.show({
            title: "Error Importing Settings",
            message: "Could not import settings from file",
            color: "red",
          });
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleExport = () => {
    // save first
    set(form.values);
    // then export
    const filename = "senseBox_dashboard_settings.json";
    const jsonStr = JSON.stringify(form.values);

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(jsonStr));
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const handleRestore = () => {
    restore(defaultSettings);
  };

  const handleClearAppData = () => {
    localStorage.clear();
    window.location.reload();
  };

  // load settings from local storage
  useLayoutEffect(() => {
    form.setValues(current);
  }, [current]);

  return (
    <>
      {/* Colors for Sensor Type, Colors of UI
      Value Unit Conversion
      Register Extensions via Rapid API etc. */}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <h1>General</h1>
        <Grid>
          <Grid.Col span={4}>
            <NumberInput
              {...sharedStyle}
              label="Automatic Update Interval"
              description="Interval between automatic updates on live data page (in seconds)"
              placeholder={defaultSettings.automaticUpdateInterval}
              key={form.key("automaticUpdateInterval")}
              {...form.getInputProps("automaticUpdateInterval")}
              min={60}
              max={60 * 60 * 24}
              suffix="s"
              disabled
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              {...sharedStyle}
              label="Box Inactive After..."
              description="How long after the senseBox is marked as inactive (in hours)"
              placeholder={defaultSettings.boxInactiveAfter}
              key={form.key("boxInactiveAfter")}
              {...form.getInputProps("boxInactiveAfter")}
              min={1}
              max={24 * 7}
              suffix="h"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              {...sharedStyle}
              label="Sensor Inactive After..."
              description="How long after a sensor is marked as inactive (in hours)"
              placeholder={defaultSettings.sensorInactiveAfter}
              key={form.key("sensorInactiveAfter")}
              {...form.getInputProps("sensorInactiveAfter")}
              min={1}
              max={24 * 7}
              suffix="h"
              disabled
            />
          </Grid.Col>
          <Grid.Col span={"content"}>
            <TextInput
              {...sharedStyle}
              label="Fallback Null Value"
              description="Value to display when a sensor value is not available"
              placeholder={defaultSettings.fallbackNullValue}
              key={form.key("fallbackNullValue")}
              {...form.getInputProps("fallbackNullValue")}
            />
          </Grid.Col>
          <Grid.Col span={"content"}>
            <Input.Wrapper label="Clear Data" description="This will reset all stored application data, settings and cache">
              <Button
                {...sharedStyle}
                mt="calc(var(--mantine-spacing-xs) / 2)"
                variant="light"
                type="button"
                id="clear-data-btn"
                onClick={() => { handleClearAppData(); }}
                color="red"
                rightSection={<Icon icon="mdi:clear-octagon" width="1rem" height="1rem" />}
              >
                Clear
              </Button>
            </Input.Wrapper>
          </Grid.Col>
        </Grid>

        <h1>Internationalization</h1>
        <Grid>
          <Grid.Col span={"content"}>
            <Select
              {...sharedStyle}
              label="Date Format"
              placeholder={defaultSettings.dateFormat}
              key={form.key("dateFormat")}
              {...form.getInputProps("dateFormat")}
              data={dateFormats}
            />
          </Grid.Col>
        </Grid>

        <h1>Style & Theme</h1>
        <Grid>
          <Grid.Col span={"content"}>
            <ColorInput
              {...sharedStyle}
              label="Primary Dashboard Color"
              placeholder={defaultSettings.primaryDashboardColor}
              key={form.key("primaryDashboardColor")}
              {...form.getInputProps("primaryDashboardColor")}
              swatches={["#2e2e2e", "#868e96", "#fa5252", "#e64980", "#be4bdb", "#7950f2", "#4c6ef5", "#228be6", "#15aabf", "#12b886", "#40c057", "#82c91e", "#fab005", "#fd7e14"]}
              format="hex"
              closeOnColorSwatchClick
            />
          </Grid.Col>
        </Grid>

        <Space h="xl" />

        <Group gap="xs">
          <Button radius="xl" variant="light" onClick={handleRestore}>Restore Defaults</Button>
          <Button radius="xl" variant="light" onClick={handleExport}>Export</Button>
          <Button radius="xl" variant="light" onClick={handleImport}>Import</Button>
          <Button radius="xl" variant="filled" ml="auto" type="submit">Save</Button>
        </Group>
      </form>
    </>
  );
};

export default DashboardSettings;
