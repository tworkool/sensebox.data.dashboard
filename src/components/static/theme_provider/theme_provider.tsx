import { create } from "zustand";
import { CONSTANTS } from "@utils/environment.js";
import { MantineProvider, MantineThemeOverride, createTheme, localStorageColorSchemeManager, mergeThemeOverrides } from "@mantine/core";
import { ReactNode } from "react";

interface IUseThemeStore {
  theme: MantineThemeOverride;
  updateTheme: (updatedProperties: MantineThemeOverride) => void;
}

const theme = createTheme({
  "colors": {
    "dynamicPrimary": [ // JUST A PLACEHOLDER
      "#000",
      "#000",
      "#000",
      "#000",
      "#000",
      "#000",
      "#000",
      "#000",
      "#000",
      "#000",
      "#000",
    ],
  },
  "primaryColor": "green", // TODO: change this in settings
  "defaultRadius": "sm",
  "fontFamily": "Satoshi-Regular, Inter, Arial, system-ui, sans-serif",
  "primaryShade": { light: 6, dark: 8 },
  "breakpoints": {
    "xs": "300px",
    "sm": "424px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1440px",
  }
});

const useThemeStore = create<IUseThemeStore>((set) => ({
  theme: theme,
  updateTheme: (updatedProperties: MantineThemeOverride) => {
    set(previousState => ({ 
      theme: mergeThemeOverrides(previousState.theme, updatedProperties) 
    }));
  },
}));

const colorSchemeManager = localStorageColorSchemeManager({
  key: CONSTANTS.THEME_LOCALSTORAGE_KEY,
});

const ThemeProvider = (props: {children: ReactNode}) => {
  const { theme } = useThemeStore();

  return (
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager} withCssVariables>
      {props.children}
    </MantineProvider>
  );
};


export default ThemeProvider;
export { useThemeStore };
