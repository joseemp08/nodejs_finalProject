//import * as React from 'react';
import { useEffect, useState } from 'react';
import ReactMapGL, {Marker, Point, Popup} from 'react-map-gl';
//import { Room } from "@material-ui/icons";
import Room from '@mui/icons-material/Room';
import Star from '@mui/icons-material/Star';
import "./App.css";
import axios from "axios";
import { format } from 'timeago.js'

//import 'maplibre-gl/dist/maplibre-gl.css';

function App() {
  const currentUser = "Jane"
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 17,
    zoom: 4
  });

  useEffect(()=>{
    const getPins = async ()=>{
      try {
        const res = await axios.get("/pins")
        setPins(res.data)
      } catch (err) {
        console.log(err)
      };
      getPins()
    }
  }, []);

  const handleMarkerClick = (id)=> {
    setCurrentPlaceId(id)
  } 



  return(
    <div className='App'>
      <ReactMapGL
      {...viewport}
      mapboxAccessToken= {process.env.REACT_APP_MAPBOX}
      oneViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle={"mapbox://styles/mapbox/streets-v9"}
      >
        {pins.map(p=> (
<>
        <Marker
          latitude={p.lat}
          longitude={p.long}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <Room style = {{fontSize: viewport.zoom * 7, cursor: "pointer", 
          color: p.username === currentUser? "red" : "slateblue"}}
          onClick= {()=> handleMarkerClick(p._id)}
          />
        </Marker>

        {p._id === currentPlaceId && (

        <Popup 
        longitude={p.lat} 
        latitude={p.log }
        closeButton={true}
        closeOnClick={false}
        anchor="left"
        onClose={()=> setCurrentPlaceId(null)}
        >
        <div className='card'>
          <label>Place</label>
          <h4 className='place'>{p.title}</h4>
          <label>Review</label>
          <p className='desc'>{p.desc}</p>
          <label>Rating</label>
          <div className='stars'>
            <Star className='star' />
            <Star className='star' />
            <Star className='star' />
            <Star className='star' />
            <Star className='star' />
          </div>
          <label>Information</label>
          <span className='username'>Created by<b> {p.username} </b></span>
          <span className='date'><b> {format(p.createdAt)} </b></span>
        </div>
      </Popup> )}
</>
      ))}
      </ReactMapGL>
    </div>
  );
}


// import * as React from 'react';
// import Map from 'react-map-gl';

// function App() {
//   return <Map
//     initialViewState={{
//       longitude: -100,
//       latitude: 40,
//       zoom: 3.5
//     }}
//     style={{width: '100vw', height: '100vh'}}
//     mapStyle="mapbox://styles/mapbox/streets-v9"
//     mapboxAccessToken="MY_ACCESS_TOKEN"
//   />;
// }

export default App;
