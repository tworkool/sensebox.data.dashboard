import React from "react";
import Header from "../../components/header";
import "./style.scss";
import { Text, Title } from "@mantine/core";
import Footer from "../../components/footer";

const InfoPage = () => {
  return <div className="page__container">
    <Header/>    
    <div className="page__content">
      <Title order={1}>Info</Title>
      <Text>I hope the dashboard and all other content are easy to understand without explanation. However if you need help, this is the right place! Please read the quick guide for more info.</Text>
      
      <Title order={2}>Quick Guide</Title>
      <Text color="dimmed">{"Sry, but there is no content here yet 😞. I didn't have time to create this chapter."}</Text>
      
      <Title order={2}>API/Services Info</Title>
      <Text>{"This webapp uses a number of different service/API's. Here is a list with possible legal disclaimers"}</Text>
      
      <Title order={3}>SenseBox OSEM API</Title>
      <Text>{"The Open Sensemap API is of course the most important one, because it provides the interface for all data related to Senseboxes. The project is open-source and community based! Thanks OSEM team!"}</Text>
      <Text>More info under <a href="https://docs.opensensemap.org/">https://docs.opensensemap.org/</a></Text>
      <Text>License: <a href="https://github.com/sensebox/openSenseMap-API/blob/master/license.md">MIT License</a></Text>

      <Title order={3}>Sunrise and Sunset API</Title>
      <Text>{"The sunrise and sunset API is free of cost and provides important data for sunrise and sunset information."}</Text>
      <Text>More info under <a href="https://sunrise-sunset.org/api">https://sunrise-sunset.org/api</a></Text>

      <Title order={3}>Mapbox Reverse Geocoding API</Title>
      <Text>{"The reverse geocoding API by Mapbox provides information about a place based on world coordinates. With that API a specific name for a place can be received."}</Text>
      <Text>{"NOTICE: © 2022 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare."}</Text>
      <Text>More info under <a href="https://docs.mapbox.com/api/search/geocoding/">https://docs.mapbox.com/api/search/geocoding/</a></Text>

      <Title order={2}>Releases and Changelog</Title>
      <Text>For a detailed Release and Changelog, please visit <a href="https://github.com/tworkool/sensebox.data.dashboard/releases">https://github.com/tworkool/sensebox.data.dashboard/releases</a>.</Text>
    </div>
    <Footer/>
  </div>;
};

export default InfoPage;
