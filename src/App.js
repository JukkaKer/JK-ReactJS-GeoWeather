import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const ICON_URL = 'http://openweathermap.org/img/wn/';
const API_KEY = '';

export default function App() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, (error) => {
        alert(error);
      })
    } else {
      alert('Your browser does not support geolocation!')
    }
  }, [])

  return (
    <div>
      <Location lat={lat} long={lng} />
      <Weather lat={lat} lng={lng}/>
    </div>
  )
}

function Location(props) {

  return (
    <p>
      <b>Position</b><br/>
      Latitude: {props.lat.toFixed(3)}<br/>
      Longitude: {props.long.toFixed(3)}
    </p>
  );
}

function Weather({lat, lng}) {
  const [temp, setTemp] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [direction, setDir] = useState(0);
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const url = API_URL +
    'lat=' + lat +
    '&lon=' + lng +
    '&units=metric' +
    '&appid=' + API_KEY;

    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        if(result.main !== undefined) {
          setTemp(result.main.temp);
          setSpeed(result.wind.speed);
          setDir(result.wind.deg);
          setDesc(result.weather[0].description);
          setIcon(ICON_URL + result.weather[0].icon + '@2px.png');
        } else {
          alert('Could not read weather information!');
        }
      }, (error) => {
        alert(error);
      }
    )
  }, [])

  return (
    <div>
      <b>Weather:</b><br/>
      <p>Temperature: {temp} C&#176;</p>
      <p>Wind: {speed} m/s {direction} degrees</p>
      <p>Description: {desc}</p>
      <img src={icon} alt="" />
    </div>
  );
}