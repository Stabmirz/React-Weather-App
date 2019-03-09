import React from "react";

const MaxMinTemp= props => (
  <div className="weather-by-day">
    <p className="temperature">
      { 	
        props.max_temperature &&
        <span className="high">{ props.max_temperature }°C</span>
      }
      { 	
        props.max_temperature &&
        <span className="high">{ props.min_temperature }°C</span>
      }
    </p>
  </div>
  );
export default MaxMinTemp;
