import React from "react";
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      location: "Miami",
      days: [],
      daysFull: [],
      temps: [],
      minTemps: [],
      maxTemps: [],
      c_humidity: [],
      c_pressure: [],
      c_wind: [],
      weather: [],
      icons: [],
      displayIndex: 0
    };
  }

  fetchData = () => {
    const url = this.buildUrlApi();
    //console.log("api", url);

    axios.get(url).then(response => {
      this.setState({
        data: response.data
      });

      const currentData = this.currentData();
      const dayOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
      const dayOfWeekFull = [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ];
      const currentDay = "Today";
      const currentDayFull =
        dayOfWeekFull[new Date(currentData.dt_txt).getDay()];
      const currentTemp = Math.round(currentData.main.temp);
      const currentMinTemp = Math.round(currentData.main.temp_min);
      const currentMaxTemp = Math.round(currentData.main.temp_max);
      const currentHumidity = Math.round(currentData.main.humidity);
      const currentPressure = Math.round(currentData.main.pressure);
      const currentWind = Math.round(currentData.wind.speed);
      const currentWeather = currentData.weather[0].description;
      const currentIcon = currentData.weather[0].icon;

      const days = [];
      const daysFull = [];
      const temps = [];
      const minTemps = [];
      const maxTemps = [];
      const c_humidity = [];
      const c_pressure = [];
      const c_wind = [];
      const weather = [];
      const icons = [];
      for (let i = 0; i < this.state.data.list.length; i = i + 1) {
        let date = new Date(this.state.data.list[i].dt_txt);
        let day = dayOfWeek[date.getDay()];
        let dayFull = dayOfWeekFull[date.getDay()];
        days.push(day);
        daysFull.push(dayFull);
        temps.push(Math.round(this.state.data.list[i].main.temp));
        minTemps.push(Math.round(this.state.data.list[i].main.temp_min));
        maxTemps.push(Math.round(this.state.data.list[i].main.temp_max));
        c_humidity.push(Math.round(this.state.data.list[i].main.humidity));
        c_pressure.push(Math.round(this.state.data.list[i].main.pressure));
        c_wind.push(Math.round(this.state.data.list[i].wind.speed));
        weather.push(this.state.data.list[i].weather[0].description);
        icons.push(this.state.data.list[i].weather[0].icon)
      }

      this.setState({
        days: [currentDay, ...days.slice(1)],
        daysFull: [currentDayFull, ...daysFull.slice(1)],
        temps: [currentTemp, ...temps.slice(1)],
        minTemps: [currentMinTemp, ...minTemps.slice(1)],
        maxTemps: [currentMaxTemp, ...maxTemps.slice(1)],
        c_humidity: [currentHumidity, ...c_humidity.slice(1)],
        c_pressure: [currentPressure, ...c_pressure.slice(1)],
        c_wind: [currentWind, ...c_wind.slice(1)],
        weather: [currentWeather, ...weather.slice(1)],
        icons: [currentIcon, ...icons.slice(1)]
      });
    });
  };

  buildUrlApi = () => {
    const location = encodeURIComponent(this.state.location);
    const urlPrefix = "https://api.openweathermap.org/data/2.5/forecast?q=";
    const urlSuffix = "&APPID=d94f810c218fa367514761ac7f7bc5bc&units=metric";

    return [urlPrefix, location, urlSuffix].join("");
  };

  currentData = () => {
    const list = this.state.data.list;
    const nearestHr = this.computeNearestHr();

    return list.find(e => new Date(e.dt_txt).getHours() === nearestHr);
  };

  computeNearestHr = () => {
    const currentTimeInHrs = new Date().getHours();
    const constHrs = [0, 3, 6, 9, 12, 15, 18, 21];
    const differences = constHrs.map(e => Math.abs(e - currentTimeInHrs));
    const indexofLowestDiff = differences.indexOf(Math.min(...differences));

    return constHrs[indexofLowestDiff];
  };


  componentDidMount() {
    this.fetchData();
  }

  changeLocation = e => {
    e.preventDefault();
    const inputLocation = this.locationInput.value;
    this.setState(
      {
        location: inputLocation
      },
      () => {
        this.fetchData();
      }
    );
  };

  setIndex = index => {
    this.setState({
      displayIndex: index
    });
  };

  render() {
    const {
      location,
      days,
      daysFull,
      temps,
      maxTemps,
      minTemps,
      c_humidity,
      c_pressure,
      c_wind,
      weather,
      icons,
      displayIndex
    } = this.state;

    return (
      <div>
        <form onSubmit={this.changeLocation}>
          <div className="inline-input">
            {/* <i className="mdi mdi-magnify"></i> */}
            <input
              className="location-input"
              defaultValue={location}
              type="text"
              ref={input => (this.locationInput = input)}
            />
          </div>
        </form><hr />

        <div className="main-display">
          <div className="main-info">
            <div className="temp-measurement">{temps[displayIndex]}</div>
            <div className="temp-unit">°C</div>
          </div>

          <div className="sub-info">
            <div className="sub-info-title">{daysFull[displayIndex]}</div><hr />

            <div className="sub-info-text"><b>Description : </b>{weather[displayIndex]}</div>
            <div className="sub-info-text"><b>Humidity : </b>{c_humidity[displayIndex]}%</div>
            <div className="sub-info-text"><b>Pressure : </b>{c_pressure[displayIndex]} Pa</div>
            <div className="sub-info-text"><b>Wind-Speed : </b>{c_wind[displayIndex]} km/s</div>

            <div className="sub-info-text">
              <span className="max-temp">
                <i className="mdi mdi-arrow-up" />
                Max.Temp. =
                {maxTemps[displayIndex]}
                °C
              </span>
              <span className="min-temp">
                <i className="mdi mdi-arrow-down" />
                Min.Temp. =
                {minTemps[displayIndex]}
                °C
              </span>
            </div>
          </div>
        </div><hr />

        <div className="selection-panel">
          <div className="selection-row">
            {icons.map((item, index) => {
              if (displayIndex === index) {
                return (
                  <div
                    className="selection-icons selected"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    <i className={"mdi mdi-".concat(item)} />
                  </div>
                );
              } else {
                return (
                  <div
                    className="selection-icons"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    <i className={"mdi mdi-".concat(item)} />
                  </div>
                );
              }
            })}
          </div>
          <div className="selection-row">
            {days.map((item, index) => {
              if (displayIndex === index) {
                return (
                  <div
                    className="selection-days selected"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    {item}
                  </div>
                );
              } else {
                return (
                  <div
                    className="selection-days"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    {item}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default App;

ReactDOM.render(<App />, document.getElementById("root"));