import './App.css';
import {useState,useEffect} from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import axios from 'axios';

function App() {
  //ActiveCity mantains the information about the city whose marker is clicked
  //weatherData contains the Data fetched from the api
  const [activeCity,setActiveCity] = useState(null);
  const [weatherData,setWeatherData] = useState(null);
  let url = "https://weatherapiintern.herokuapp.com/weather";
  //useEffect Hook has no dependency as I want it to run only once 
  useEffect(()=>{
    axios.get(url).then(res=>{
      setWeatherData(res.data);
    })
  },[])
  return (
    <div>
       <MapContainer center={[40.7143,-74.006]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Map function just displays the marker with the onClick function */}
        {weatherData &&weatherData.map(city=>{
          return <Marker key={city.id} 
          position={[city.coord.lat,city.coord.lon]}
          eventHandlers={{
            click:()=>{
              console.log("Button Clicked !!")
              setActiveCity(city)
            }
          }}
          />
        })}
        {/*  Runs only if there is a activeCity and activeCity is set to null
        once the Popup is closed */}
        {activeCity&&<Popup 
        position={[activeCity.coord.lat,activeCity.coord.lon]}
        onClose={()=>setActiveCity(null)}
        >
          <div>
            <h2>{activeCity.name}</h2>
            <p>Temp {activeCity.main.temp}</p>
            <p>Wind Speed {activeCity.wind.speed}</p>
            <p>{activeCity.weather[0].description}</p>
          </div>
        </Popup>} 
        </MapContainer>
    </div>
  );
}

export default App;
