import React from "react";

const Icon = props => (
    <div>
        { 	
            props.icon &&
            <img width = "80" height= "80" src={'http://openweathermap.org/img/w/'+`${props.icon}`+'.png'} alt="weater-icon"/>
        }
    </div>
);

export default Icon;