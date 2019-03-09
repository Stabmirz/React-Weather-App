import React from "react";

const WeatherData = props => (
	<div className="weather-data">
		<div className="icon-temperature">
			{ 	
				props.icon &&
				<img width = "150" height= "150" src={'http://openweathermap.org/img/w/'+`${props.icon}`+'.png'} alt="weater-icon"/>
			}
			{ 	
        		props.temperature &&
            	<span className="temperature">{ props.temperature }°C</span>
    		}
		</div>
		<div className="wind-humidity-pressure">
			{ 	
				props.wind && <p className="wind"> Wind : 
					<span>{ props.wind } km/s</span>
			</p>
			}
			{ 	
				props.humidity && <p className="humidity"> Humidity:  
					<span>{ props.humidity } %</span>
				</p> 
			}
			{ 	
				props.pressure && <p className="pressure"> Pressure : 
					<span>{ props.pressure } pa</span>
			</p> 
			}
			{ 
				props.error && <p className="weather-error">{ props.error }</p>  
			}
		</div>
	</div>
);

export default WeatherData;