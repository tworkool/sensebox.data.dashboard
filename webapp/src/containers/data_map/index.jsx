import React from "react";
import DeckGLMap from "../../components/deck_gl_map";
import "./style.scss";

const DataMapContainer = () => {
  return (
    <div className="sbd-data-map-container sbd-dashboard-container">
      <DeckGLMap />
    </div>
  );
};

export default DataMapContainer;
