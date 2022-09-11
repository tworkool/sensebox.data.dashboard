import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useMantineColorScheme } from "@mantine/core";
import PageManager from "../../components/page_manager";
import "./style.scss";

const CustomMantineProvider = (props) => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{ colorScheme }}
                withGlobalStyles
                withNormalizeCSS
            >
                <NotificationsProvider>{props.children}</NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

const App = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";
    return (
        <div className="wsb-app-container" onClick={() => toggleColorScheme()}>
            <Router>
                <PageManager />
            </Router>
        </div>
    );
};

export default App;
export { CustomMantineProvider };
