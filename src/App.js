import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';
import Form from "./components/Form";
import Location from "./components/Location";
import Description from "./components/Description";
import WeatherData from "./components/WeatherData";
import MaxMinTemp from "./components/MaxMinTemp";
import Icon from './components/Icon';


const Titles = () => (
	<div>
		<h1>5 days Weather Forecast</h1>
	</div>
);

function WeatherByDay(){
  return(
    <div className="weather-by-day">
      <i className='fa fa-cloud-sun'></i>
      <p className="temperature">
        <span className="high"> 86°C</span>
        <span className="low"> 66°C</span>
      </p>
    </div>
  );
}

function HourlyDetails(){
  return(
    <div className="table">
      <div className="place-hour">
        <p>Miami, FL Hourly Weather</p>
        <p className="time">8:30 pm EST</p>
      </div>
      <table>
        <thead>
          <tr>
            <td>
              Time
            </td>
            <td>
              Description
            </td>
            <td>
              Temperature
            </td>
            <td>
              Humidity
            </td>
            <td>
              Wind
            </td>
            <td>
              Pressure
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>9:00 PM Wed</td>
            <td>Clear</td>
            <td> 
              <span className="high"> 86°C</span>
              <span className="low"> 66°C</span>
            </td>
            <td> 
              <span className="high"> 0%</span>
              <span className="low"> 66%</span>
            </td>
            <td>2 mph</td>
            <td>95 kpa</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


const API_KEY = "b292bd2a578c27b2e97bbb03b7515a95";

class App extends Component {
  state = {
    temperature: undefined,
    max_temperature: undefined,
    min_temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    wind: undefined,
    pressure: undefined,
    icon: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}`);
    const data = await api_call.json();
    console.log(data);
    if (city && country) {
      this.setState({
        city: data.name,
        country: data.country,
        temperature: Math.round(data.list[0].main.temp),
        max_temperature: Math.round(data.list[0].main.temp_max),
        min_temperature: Math.round(data.list[0].main.temp_min),
        description: data.list[0].weather[0].description,
        wind: data.list[0].wind.speed,
        humidity: data.list[0].main.humidity,
        pressure: data.list[0].main.pressure,
        icon:data.list[0].weather[0].icon,
        error:''
      });
    } else {
      this.setState({
        error: "Please enter the values."
      });
    }
  }

  render() {
    const{city,country,description,icon,temperature,humidity,wind,pressure,error,max_temperature,min_temperature}=this.state;
    return (
      <div className="main">
        <div className="title">
          <Titles />
        </div>
        <div className="form">
          <Form getWeather={this.getWeather} />
        </div>
        <div className="location-description">
          <Location 
          city={city}
          country={country}
          />
          <Description
          description={description}
          />
        </div>
        <div className="temperature-details">
          <WeatherData 
            icon={icon} 
            temperature={temperature} 
            humidity={humidity}
            wind={wind}
            pressure={pressure}
            error={error}
          />
        </div>
        <div className="weather-hourly-details">
          <HourlyDetails/>
        </div>
        <div className="five-day-weather">
          <Link to="" style={{ textDecoration: 'none' }}>
            <div className="day-weather-div">
              <p className="day">Today</p>
              <div className="icon"><Icon icon={icon} /></div>
              <MaxMinTemp
                max_temperature={max_temperature}
                min_temperature={min_temperature}
                />
            </div>
          </Link>
          <Link to="/day1" style={{ textDecoration: 'none' }}>
            <div className="day-weather-div">
              <p className="day">Sat</p>
              <WeatherByDay/>
            </div>
          </Link>
          <Link to="/day2" style={{ textDecoration: 'none' }}>
            <div className="day-weather-div">
              <p className="day">Sun</p>
              <WeatherByDay/>
            </div>
          </Link>
          <Link to="/day3" style={{ textDecoration: 'none' }}>
            <div className="day-weather-div">
              <p className="day">Mon</p>
              <WeatherByDay/>
            </div>
          </Link>
          <Link to="/day4" style={{ textDecoration: 'none' }}>
            <div className="day-weather-div">
              <p className="day">Tue</p>
              <WeatherByDay/>
            </div>
          </Link>
        </div>
      </div>
    );
  }
};

export default App;
