//import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

import 'maplibre-gl/dist/maplibre-gl.css';

function App() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  return(
    <div className='App'>
      <ReactMapGL
      {...viewport}
      oneViewportChange={nextViewport => setViewport(nextViewport)}
      />
    </div>
  );
}

export default App;
