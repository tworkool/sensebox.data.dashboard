import React, { useCallback, useContext, useMemo } from "react";
import "./style.scss";
import { Button, Checkbox, Group, JsonInput, NumberInput, Stack, Text, TextInput } from "@mantine/core";
import { DashboardContext } from "../../pages/dashboard";
import { getDefaultSettings } from "../../utils/settings";

const DashboardSettings = () => {
  const dashboardContext = useContext(DashboardContext);
  
  const defaultSettings = useMemo(() => {
    return getDefaultSettings();
  }, []);

  const settingsListView = useMemo(() => {
    const localStorageSettings = dashboardContext.dashboardSettings;
    return <Stack>
      {
        defaultSettings.settings.map((e, i) => {
          const value = localStorageSettings?.[e.key] ?? e.value;
          const sharedProps = {
            name: e.key,
            "data-issetting": "true",
          };
          return <div key={i}>
            <Text>
              {e.label}
            </Text>
            {e.description && <Text color="dimmed" size="sm">
              {e.description}
            </Text>}
            {e.type === 0 && 
              <NumberInput
                {...sharedProps}
                variant="filled"
                defaultValue={value}
              />
            }
            {e.type === 1 &&               
              <NumberInput
                {...sharedProps}
                variant="filled"
                defaultValue={value}
              />
            }
            {e.type === 2 && 
              <TextInput
                {...sharedProps}
                variant="filled"
                defaultValue={value}
              />
            }
            {e.type === 3 && <div>DATE</div>}
            {e.type === 4 &&
              <JsonInput
                {...sharedProps}
                label="Your package.json"
                placeholder="Textarea will autosize to fit the content"
                validationError="Invalid json"
                formatOnBlur
                autosize
                minRows={4}
              />
            }
            {e.type === 5 && 
                <Checkbox
                  {...sharedProps}
                  label="I agree to sell my privacy"
                />
            }
          </div>;
        })
      }
    </Stack>;
  }, [dashboardContext.dashboardSettings, defaultSettings]);

  const handleFormSubmit = useCallback(
    (e) => {
      //console.log(e.target[0]); 
      e.preventDefault();
      const elements = e.target.elements;
      const _settings = {...defaultSettings};
      _settings.settings.forEach(e => {
        const owElement = elements?.[e.key];
        if (owElement){
          e.value = owElement.value;
        }
      });
    },
    [defaultSettings],
  );
  

  return <div>
    <form onSubmit={handleFormSubmit}>
      {settingsListView}
      <Group mt="md" >
        <Button variant="outline">Restore Settings</Button>
        <Button type="submit">Save</Button>
      </Group>
    </form>
  </div>;
};

export default DashboardSettings;
