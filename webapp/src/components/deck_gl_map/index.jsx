import React from "react";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import { Map } from "react-map-gl";
import ENVIRONMENT from "../../utils/env";
import "./style.scss";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

// Data to be used by the LineLayer
const data = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781],
  },
];

// DeckGL react component
const DeckGLMap = () => {
  const layers = [new LineLayer({ id: "line-layer", data })];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      {/*       <Map
        mapboxAccessToken={ENVIRONMENT.MAPBOX_PUBLIC_KEY}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/tworkool/cl79px1g3001g14nut07xac6k"
      /> */}
    </DeckGL>
  );
};

export default DeckGLMap;
